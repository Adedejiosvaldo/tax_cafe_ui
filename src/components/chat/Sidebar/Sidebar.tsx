"use client";
import { Button } from "@/components/ui/button";
import useChatActions from "@/hooks/useChatActions";
import { useStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Sessions from "./Sessions";
import Image from "next/image";
const SidebarHeader = () => (
  <div className="flex items-center gap-2">
    <Image src="/tclogo.png" alt="Tax Cafe Logo" width={32} height={32} />
    <span className="text-xs font-medium uppercase text-primary">Tax Cafe</span>
  </div>
);

const NewChatButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="lg"
    className="bg-primary text-white hover:bg-primary/90 h-9 w-full rounded-xl text-xs font-medium"
  >
    <Icon type="plus-icon" size="xs" className="text-white" />
    <span className="uppercase">New Chat</span>
  </Button>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed on mobile
  const { clearChat, focusChatInput, initialize } = useChatActions();
  const { messages, selectedEndpoint, isEndpointActive, hydrated, mode } =
    useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (hydrated) initialize();
  }, [selectedEndpoint, initialize, hydrated, mode]);

  const handleNewChat = () => {
    clearChat();
    focusChatInput();
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCollapsed(true)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="font-dmmono bg-white border-r border-border-light flex h-full shrink-0 grow-0 flex-col overflow-hidden px-2 py-3"
        initial={{ width: "16rem" }}
        animate={{ width: isCollapsed ? "2.5rem" : "16rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-2 top-2 z-10 p-1"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          type="button"
          whileTap={{ scale: 0.95 }}
        >
          <Icon
            type="sheet"
            size="xs"
            className={`transform ${isCollapsed ? "rotate-180" : "rotate-0"}`}
          />
        </motion.button>
        <motion.div
          className="w-60 space-y-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            pointerEvents: isCollapsed ? "none" : "auto",
          }}
        >
          <SidebarHeader />
          <NewChatButton
            disabled={messages.length === 0}
            onClick={handleNewChat}
          />
          {isMounted && hydrated && (
            <>
              {/* <Endpoint /> */}
              {isEndpointActive && (
                <>
                  <motion.div
                    className="flex w-full flex-col items-start gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {/* <div className="text-primary text-xs font-medium uppercase">
                    Mode
                  </div> */}
                    {/* {isEndpointLoading ? (
                    <div className="flex w-full flex-col gap-2">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="h-9 w-full rounded-xl"
                        />
                      ))}
                    </div>
                  ) : ( */}
                    <>
                      {/* <ModeSelector />
                      <EntitySelector />
                      {selectedModel && (agentId || teamId) && (
                        <ModelDisplay model={selectedModel} />
                      )} */}
                    </>
                    {/* )} */}
                  </motion.div>
                  <Sessions />
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
