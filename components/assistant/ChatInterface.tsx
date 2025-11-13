import React, { useState, useRef, useEffect } from 'react';
import type { UserProfile, ChatMessage } from '../../types';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
// FIX: Correct typo from SendHorizonal to SendHorizontal
import { SendHorizontal, AlertTriangle } from '../icons';

interface ChatInterfaceProps {
    userProfile: UserProfile;
    messages: ChatMessage[];
    isTyping: boolean;
    onSendMessage: (input: string) => void;
    error: string | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userProfile, messages, isTyping, onSendMessage, error }) => {
    const [userInput, setUserInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        onSendMessage(userInput);
        setUserInput('');
    };
    
    return (
        <div className="flex flex-col h-[calc(100vh-200px)] max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 shadow-lg">
            <header className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">AI Budget Assistant</h2>
                <p className="text-sm text-gray-500">Profile: {userProfile.role} | {userProfile.incomeBracket}</p>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => <ChatMessageComponent key={msg.id} message={msg} />)}
                {isTyping && messages[messages.length -1]?.sender !== 'ai' && (
                    <ChatMessageComponent message={{ id: 0, sender: 'ai', text: '...', timestamp: '' }} isTyping />
                )}
                <div ref={chatEndRef} />
            </div>

            <footer className="p-4 border-t border-gray-200">
                {error && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Ask for your report, or a specific question..."
                        className="flex-grow bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full disabled:bg-gray-300 transition-colors"
                        disabled={!userInput.trim() || isTyping}
                    >
                        <SendHorizontal className="w-5 h-5" />
                    </button>
                </form>
            </footer>
        </div>
    );
};