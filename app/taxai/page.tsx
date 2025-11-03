'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function TaxAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m TaxAI, your personal Nigerian tax assistant. How can I help you today? I can answer questions about tax laws, deductions, compliance, and more.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: `I understand you're asking about: "${input}". This is a simulated response. In production, this would connect to a real AI service to provide accurate Nigerian tax guidance.`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    'What are the current personal income tax rates in Nigeria?',
    'How do I register for a TIN?',
    'What expenses can I deduct as a freelancer?',
    'When is the tax filing deadline?',
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-gray-900 font-display">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-4">
              <Icon name="smart_toy" size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              TaxAI Assistant
            </h1>
            <p className="text-lg text-text-light-body max-w-2xl mx-auto">
              Get instant answers to your Nigerian tax questions. Powered by AI and trained on current tax laws.
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-xl shadow-lg border border-border-light overflow-hidden">
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon name="smart_toy" size={20} />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 size-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="person" size={20} />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="smart_toy" size={20} />
                  </div>
                  <div className="max-w-[70%] rounded-xl px-4 py-3 bg-gray-100">
                    <div className="flex gap-1">
                      <div className="size-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="size-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="size-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-border-light">
                <p className="text-sm font-semibold text-gray-700 mb-3">Quick Questions:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="text-left text-sm px-3 py-2 rounded-lg bg-white border border-border-light hover:border-primary transition-colors text-text-light-body hover:text-primary"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-border-light">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Nigerian taxes..."
                  className="flex-1 px-4 py-3 rounded-lg border border-border-light bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Icon name="send" size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-border-light">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icon name="bolt" />
                </div>
                <h3 className="font-bold text-lg">Instant Answers</h3>
              </div>
              <p className="text-sm text-text-light-body">
                Get immediate responses to your tax questions, 24/7.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border-light">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icon name="verified" />
                </div>
                <h3 className="font-bold text-lg">Accurate Information</h3>
              </div>
              <p className="text-sm text-text-light-body">
                Trained on current Nigerian tax laws and regulations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border-light">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icon name="lock" />
                </div>
                <h3 className="font-bold text-lg">Private & Secure</h3>
              </div>
              <p className="text-sm text-text-light-body">
                Your conversations are encrypted and never shared.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
