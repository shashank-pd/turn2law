import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Test Groq connection before processing chat
const testGroqConnection = async () => {
    try {
        const res = await fetch('https://api.groq.com/v1/some-endpoint', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
        });
        const data = await res.json();
        console.log('Groq API response:', data); // You can log this in the Vercel logs
    } catch (err) {
        console.error('Groq API connection error:', err);
    }
};

export async function POST(req) {
    // Test connection before proceeding with the chat completion logic
    await testGroqConnection();

    try {
        const { message } = await req.json();

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a legal assistant specialized in Indian law only. First suggest what kind of lawyer the user should consult (dont give specific name of lawyers) and bold it. Give clear, accurate answers in simple language. Be calm, respectful, and brief. Avoid legal jargon unless needed both."
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.1-8b-instant", // Or "mixtral-8x7b-32768"
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't reply.";
        return NextResponse.json({ reply });

    } catch (err) {
        console.error("Groq API Error:", err);
        return NextResponse.json({ reply: "Server error. Please try again." }, { status: 500 });
    }
}
