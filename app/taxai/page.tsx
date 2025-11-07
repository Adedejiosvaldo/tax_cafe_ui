"use client";
import Sidebar from "@/components/chat/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import Header from "../components/Header";
import { Suspense } from "react";

export default function TaxAI() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header className="relative" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <ChatArea />
        </div>
      </Suspense>
    </div>
  );
}
