"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";


export default function LegalChatBot() {
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your legal assistant. How can I help you today?",
            timestamp: new Date(),
            isBot: true,
        },
    ]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            text: input,
            timestamp: new Date(),
            isBot: false,
        };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();

            const botMessage = {
                text: data.reply || "Sorry, I couldn't understand that.",
                timestamp: new Date(),
                isBot: true,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const botMessage = {
                text: "Something went wrong. Please try again.",
                timestamp: new Date(),
                isBot: true,
            };
            setMessages((prev) => [...prev, botMessage]);
        }

        setInput("");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 mt-16">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 p-4 flex items-center gap-2">
                    <MessageSquare className="text-white" />
                    <h1 className="text-xl text-white font-semibold">LegalBot</h1>
                </div>

                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`flex items-start gap-2 max-w-[80%] ${msg.isBot ? "" : "flex-row-reverse"
                                    }`}
                            >
                                <div
                                    className={`p-1 rounded-full ${msg.isBot ? "bg-blue-100" : "bg-gray-100"
                                        }`}
                                >
                                    {msg.isBot ? (
                                        <Bot size={20} className="text-blue-500" />
                                    ) : (
                                        <User size={20} className="text-gray-500" />
                                    )}
                                </div>
                                <div
                                    className={`flex flex-col ${msg.isBot ? "items-start" : "items-end"
                                        }`}
                                >
                                    <div
                                        className={`p-3 rounded-lg ${msg.isBot
                                                ? "bg-blue-100 text-gray-800"
                                                : "bg-blue-500 text-white"
                                            }`}
                                    >
                                        {msg.isBot ? (
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">
                                        {msg.timestamp.toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t p-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask a legal question..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
