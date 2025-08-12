import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import axios from "axios";
import { motion } from "framer-motion";

export default function Chat() {
  const { user, token } = useAuthStore();
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input, emotion: null };
    addMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/chat`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
        emotion: res.data.emotion || "neutral"
      };
      addMessage(aiMessage);
    } catch (err) {
      console.error(err);
      addMessage({ role: "ai", text: "Sorry, something went wrong.", emotion: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-100 to-indigo-100">
      {/* Header */}
      <header className="bg-indigo-500 text-white p-4 font-bold text-lg">
        Chat with {user?.relationship || "Your Companion"}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.role === "user" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              <p>{msg.text}</p>
              {msg.emotion && msg.role === "ai" && (
                <span className="block text-xs mt-1 text-gray-500">
                  Emotion: {msg.emotion}
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-300 text-gray-700 p-3 rounded-lg max-w-xs">
              Typing...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t bg-white flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
