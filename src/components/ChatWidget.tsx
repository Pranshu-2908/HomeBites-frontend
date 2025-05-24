import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/utils/axiosInstance";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message immediately
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axiosInstance.post("agent/query", {
        message: input,
      });
      console.log(res.data);
      const botReply = {
        from: "bot",
        text: res.data.response || "Sorry, no response from bot.",
      };
      setMessages((prev) => [...prev, botReply]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // In case of error, show fallback message
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full p-3 shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
        >
          <MessageCircle className="w-16 h-16" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-100 h-116 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white flex items-center justify-between px-4 py-3">
            <h4 className="font-semibold">Chat with us</h4>
            <button onClick={toggleChat}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.from === "user"
                    ? "bg-purple-100 self-end ml-auto text-right"
                    : "bg-white border self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none"
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
