"use client"
import React, { useEffect } from "react";

// Extend the Window interface to include `chatbase`
declare global {
  interface Window {
    chatbase?: ChatbaseFunction & { q?: any[]; getState?: () => string | undefined };
  }
}

// Define the type for the `chatbase` function
type ChatbaseFunction = (...args: any[]) => void;

const ChatbotIntegration: React.FC = () => {
  useEffect(() => {
    const initializeChatbase = () => {
      // Safely cast the return value of `getState` to `unknown`, then to `string`
      const getStateValue = window.chatbase && typeof window.chatbase === "function"
        ? (window.chatbase("getState") as unknown) // Cast to unknown first
        : undefined;

      // Check if `chatbase` exists and is initialized
      const isChatbaseInitialized = getStateValue === "initialized";

      if (!isChatbaseInitialized) {
        // Create the chatbase callable function
        const chatbaseFunction: ChatbaseFunction = (...args) => {
          if (!window.chatbase!.q) {
            window.chatbase!.q = [];
          }
          window.chatbase!.q.push(args);
        };

        // Create the chatbase object
        const chatbaseObject = {
          q: [],
          getState: () => "uninitialized", // Default state for `getState`
        };

        // Assign the function and object to `window.chatbase`
        window.chatbase = Object.assign(chatbaseFunction, chatbaseObject);
      }

      // Inject the Chatbase script
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "ZUX4QEy9qq36K2g8UEAWz";
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);

      // Log for debugging
      console.log("Chatbase script injected successfully");
    };

    // Ensure the script loads after the page is ready
    if (document.readyState === "complete") {
      initializeChatbase();
    } else {
      window.addEventListener("load", initializeChatbase);
      return () => window.removeEventListener("load", initializeChatbase);
    }
  }, []);

  return (
    <div>
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/ZUX4QEy9qq36K2g8UEAWz"
        width="100%"
        style={{ height: "100%", minHeight: "700px" }}
        frameBorder="0"
        title="Chatbot"
      ></iframe>
    </div>
  );
};

export default ChatbotIntegration;
