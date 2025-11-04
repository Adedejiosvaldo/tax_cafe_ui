"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Icon from "../components/Icon";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string | number;
  id?: string;
  typing?: boolean;
}

export default function TaxAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the TaxCafe Assistant. I can help with taxes, deductions, and filing. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  const submitMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // API endpoint - check environment variable or use default
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_API_URL ||
      "/api/chat";

    // Build payload with message history
    const payloadMessages = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: typeof m.content === "string" ? m.content : "",
    }));

    // Add typing placeholder
    const typingId = `t-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        role: "assistant",
        content: "",
        typing: true,
        timestamp: Date.now(),
      },
    ]);

    // Fallback function for simulated response
    const simulateReply = () => {
      setTimeout(() => {
        setMessages((current) => {
          const withoutTyping = current.filter((x) => x.id !== typingId);
          const reply = `I understand you're asking about: "${userInput}". This is a simulated response. In production, this would connect to a real AI service to provide accurate Nigerian tax guidance based on the Nigeria Tax Administration Act, 2025.`;
          return [
            ...withoutTyping,
            {
              role: "assistant",
              content: reply,
              timestamp: Date.now(),
            },
          ];
        });
        setIsLoading(false);
      }, 1000);
    };

    // Attempt to call API
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userInput,
          messages: payloadMessages,
        }),
      });

      if (!res.ok || !res.body) {
        simulateReply();
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulated = "";

      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      const isSSE = contentType.includes("text/event-stream");

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          if (isSSE) {
            // SSE parsing: extract lines starting with `data:`
            const lines = chunk.split(/\r?\n/);
            for (const line of lines) {
              if (!line) continue;
              if (line.startsWith("data:")) {
                const payload = line.replace(/^data:\s*/, "");
                if (payload === "[DONE]") {
                  done = true;
                } else {
                  accumulated += payload;
                }
              } else {
                accumulated += line;
              }
            }
          } else {
            accumulated += chunk;
          }

          // Update typing placeholder with accumulated text
          setMessages((current) =>
            current.map((m) =>
              m.id === typingId
                ? {
                    ...m,
                    content: accumulated,
                    typing: accumulated.length === 0,
                  }
                : m
            )
          );
        }

        done = done || readerDone;
      }

      // Replace typing placeholder with final message
      setMessages((current) => {
        const withoutTyping = current.filter((x) => x.id !== typingId);
        return [
          ...withoutTyping,
          {
            role: "assistant",
            content: accumulated || "(no response)",
            timestamp: Date.now(),
          },
        ];
      });
      setIsLoading(false);
    } catch {
      // Network or parsing error - fall back to simulated response
      simulateReply();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm the TaxCafe Assistant. I can help with taxes, deductions, and filing. How can I assist you today?",
      },
    ]);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const quickQuestions = [
    "How much tax for 800k income?",
    "Explain the new tax bill",
    "Estimate financial impact",
    "Penalty for late filing",
    "Airdrop and Crypto",
    "How to register for TIN",
    "Who do you file tax to?",
  ];

  return (
    <div className="flex h-screen w-full flex-row bg-background-light font-display text-text-light-body">
      {/* Sidebar */}
      <aside className="flex h-full w-64 flex-col border-r border-border-light bg-background-light p-4">
        <div className="flex flex-col gap-4">
          {/* Company Info */}
          <div className="flex items-center gap-3">
            <div className="relative size-10 rounded-full overflow-hidden">
              <Image
                src="/tclogo.png"
                alt="TaxCafe Nigeria company logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-text-light-body text-base font-semibold leading-normal">
                TaxCafe Nigeria
              </h1>
              <p className="text-gray-500 text-sm font-normal leading-normal">
                Financial Management
              </p>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="flex flex-col gap-2 pt-4">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Icon name="add_comment" size={24} />
              <p className="text-sm font-medium leading-normal">New Chat</p>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Icon name="history" size={24} />
              <p className="text-text-light-body text-sm font-medium leading-normal">
                History
              </p>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Icon name="settings" size={24} />
              <p className="text-text-light-body text-sm font-medium leading-normal">
                Settings
              </p>
            </button>
          </div>
        </div>

        {/* Bottom Help */}
        <div className="mt-auto flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Icon name="help_outline" size={24} />
            <p className="text-text-light-body text-sm font-medium leading-normal">
              Help
            </p>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex h-full flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-light px-6">
          <div className="flex items-center gap-2">
            <div className="relative size-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              <Icon name="smart_toy" size={20} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-text-light-body">
              TaxCafe Assistant
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-text-light-body rounded-full hover:bg-gray-100 transition-colors">
              <Icon name="delete_outline" size={24} />
            </button>
            <button className="p-2 text-text-light-body rounded-full hover:bg-gray-100 transition-colors">
              <Icon name="close" size={24} />
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            {/* Welcome Message */}
            {messages.length === 1 && (
              <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-text-light-body text-3xl font-bold tracking-tight">
                  TaxCafe Assistant
                </h1>
                <p className="text-sm text-gray-500">
                  Tax Cafe AI tax bot powered by the 🇳🇬 Nigeria Tax
                  Administration Act, 2025.
                </p>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "w-full justify-end"
                    : "items-start gap-3"
                }`}
              >
                {message.role === "assistant" && (
                  <>
                    <div className="relative size-8 shrink-0 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                      <Icon
                        name="smart_toy"
                        size={20}
                        className="text-primary"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 items-start">
                      <p className="text-sm font-medium text-gray-600">
                        TaxCafe Assistant
                      </p>
                      <p className="text-base font-normal leading-relaxed flex max-w-lg rounded-lg rounded-tl-none px-4 py-3 bg-gray-100 text-text-light-body">
                        {message.content}
                      </p>
                    </div>
                  </>
                )}

                {message.role === "user" && (
                  <div className="flex items-end gap-3 max-w-lg">
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm font-medium text-gray-600">You</p>
                      <p className="text-base font-normal leading-relaxed flex rounded-lg rounded-br-none px-4 py-3 bg-primary text-white">
                        {message.content}
                      </p>
                      {message.timestamp && (
                        <p className="text-xs text-gray-400">
                          {message.timestamp}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator - Show only if there's a typing message */}
            {messages.some((m) => m.typing) && (
              <div className="flex items-start gap-3">
                <div className="relative size-8 shrink-0 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  <Icon name="smart_toy" size={20} className="text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-2 items-start">
                  <p className="text-sm font-medium text-gray-600">
                    TaxCafe Assistant
                  </p>
                  <div className="flex items-center gap-2 rounded-lg rounded-tl-none px-4 py-3 bg-gray-100">
                    <span
                      className="size-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "-0.3s" }}
                    ></span>
                    <span
                      className="size-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "-0.15s" }}
                    ></span>
                    <span className="size-2 bg-gray-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-auto border-t border-border-light p-4">
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 hover:bg-primary/20 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about taxes, deductions, or how to file..."
              rows={1}
              className="w-full resize-none rounded-lg border border-border-light bg-background-light py-3 pl-4 pr-12 text-base text-text-light-body focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="send" size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
