import React, { useState, useEffect } from 'react';
import type { UserProfile, ChatMessage } from './types';
import { Onboarding } from './components/assistant/Onboarding';
import { ChatInterface } from './components/assistant/ChatInterface';
import { generateChatReportStream } from './services/geminiService';


export const BudgetAIAssistant: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userProfile) {
            setMessages([getPersonalizedGreeting(userProfile)]);
        }
    }, [userProfile]);

    const handleOnboardingComplete = (profile: UserProfile) => {
        setUserProfile(profile);
    };

    const getPersonalizedGreeting = (profile: UserProfile): ChatMessage => {
        return {
            id: Date.now(),
            sender: 'ai',
            text: `Hello! Based on your profile as a ${profile.role.toLowerCase()} in the ${profile.incomeBracket} income bracket, I've prepared a preliminary analysis of the new budget for you. What would you like to know? You can ask for the full report, or ask about taxes, investments, or specific schemes.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    };

    const handleSendMessage = async (userInput: string) => {
        if (!userInput.trim() || !userProfile || isTyping) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            text: userInput,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsTyping(true);
        setError(null);

        try {
            const stream = await generateChatReportStream(userProfile, updatedMessages);
            
            let aiResponseText = '';
            const aiMessageId = Date.now() + 1;
            
            setMessages(prev => [...prev, {
                id: aiMessageId,
                text: '',
                sender: 'ai',
                timestamp: ''
            }]);

            for await (const chunk of stream) {
                aiResponseText += chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
                ));
            }

            setMessages(prev => prev.map(msg =>
                msg.id === aiMessageId ? { ...msg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : msg
            ));

        } catch (e) {
            console.error("Error streaming AI response:", e);
            const errorMessage = "Sorry, I encountered an error while generating the report. Please check your connection or try again later.";
            setError(errorMessage);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: errorMessage,
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }]);
        } finally {
            setIsTyping(false);
        }
    };


    return (
        <div className="animate-fade-in">
            {!userProfile ? (
                <>
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">
                        Your Personal Budget AI
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Answer a few quick questions to get a personalized breakdown of how the budget affects you.
                    </p>
                </header>
                <Onboarding onComplete={handleOnboardingComplete} />
                </>
            ) : (
                <ChatInterface 
                    userProfile={userProfile}
                    messages={messages}
                    isTyping={isTyping}
                    onSendMessage={handleSendMessage}
                    error={error}
                />
            )}
        </div>
    );
};