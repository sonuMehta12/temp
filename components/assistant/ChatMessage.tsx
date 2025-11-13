import React from 'react';
// FIX: Renamed imported 'ChatMessage' type to 'ChatMessageType' to resolve name collision with the 'ChatMessage' component.
import type { ChatMessage as ChatMessageType } from '../../types';
import { BrainCircuit } from '../icons';

interface ChatMessageProps {
    message: ChatMessageType;
    isTyping?: boolean;
}

const renderText = (text: string) => {
    // A simple markdown renderer for bold text and headings
    const html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/## (.*?)(?:\n|$)/g, '<h2 class="text-md font-bold mt-2 mb-1">$1</h2>')
        .replace(/\* (.*?)(?:\n|$)/g, '<li class="ml-4 list-disc">$1</li>');

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}


export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
    const isUser = message.sender === 'user';

    if (isTyping && message.text === '') {
        return (
            <div className="flex items-end space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600">
                    <BrainCircuit className="w-5 h-5"/>
                </div>
                <div className="p-3 bg-gray-200 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-end space-x-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 self-start mt-1">
                    <BrainCircuit className="w-5 h-5"/>
                </div>
            )}
            
            <div 
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    isUser 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
                <div className="text-sm whitespace-pre-wrap">{renderText(message.text)}</div>
                {message.timestamp && (
                    <p className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-gray-400'} text-right`}>
                        {message.timestamp}
                    </p>
                )}
            </div>
        </div>
    );
};