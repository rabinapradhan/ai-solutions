import axios from "axios";
import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="28" height="28" rx="8" fill="#00e5cc" fillOpacity="0.15" />
    <path
      d="M8 14.5C8 11.46 10.46 9 13.5 9H14.5C17.54 9 20 11.46 20 14.5C20 17.54 17.54 20 14.5 20H13.5C10.46 20 8 17.54 8 14.5Z"
      stroke="#00e5cc"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="14" r="1.2" fill="#00e5cc" />
    <circle cx="16" cy="14" r="1.2" fill="#00e5cc" />
    <path
      d="M12 17C12.6 17.6 15.4 17.6 16 17"
      stroke="#00e5cc"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const TypingIndicator = () => (
  <div style={styles.typingBubble}>
    <span style={{ ...styles.typingDot, animationDelay: "0ms" }} />
    <span style={{ ...styles.typingDot, animationDelay: "180ms" }} />
    <span style={{ ...styles.typingDot, animationDelay: "360ms" }} />
  </div>
);
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm the AI-Solutions assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);
    try {
      const res = await axios.post(`${API}/api/chatbot`, {
        query: userText,
      });
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.answer, link: res.data.link },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-send-btn:hover { background: #00e5cc !important; color: #0a0d0a !important; }
        .chat-send-btn:hover svg path { stroke: #0a0d0a !important; }
        .chat-toggle-btn:hover { background: #00c4ae !important; }
        .chat-input:focus { outline: none; border-color: #00e5cc !important; }
        .chat-close-btn:hover { background: rgba(255,255,255,0.08) !important; }
        .chat-msg-bubble-user { animation: fade-in 0.2s ease both; }
        .chat-msg-bubble-bot { animation: fade-in 0.2s ease both; }
      `}</style>

      <div style={styles.widgetRoot}>
        {/* Toggle Button */}
        {!isOpen && (
          <button
            className="chat-toggle-btn"
            style={styles.toggleBtn}
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M3 5.5C3 4.12 4.12 3 5.5 3H16.5C17.88 3 19 4.12 19 5.5V13.5C19 14.88 17.88 16 16.5 16H12L8 19V16H5.5C4.12 16 3 14.88 3 13.5V5.5Z"
                stroke="#0a0d0a"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="9.5" r="1" fill="#0a0d0a" />
              <circle cx="11" cy="9.5" r="1" fill="#0a0d0a" />
              <circle cx="14" cy="9.5" r="1" fill="#0a0d0a" />
            </svg>
            <span style={styles.toggleLabel}>Chat</span>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div style={styles.chatWindow}>
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <div style={styles.headerAvatar}>{BOT_AVATAR}</div>
                <div>
                  <p style={styles.headerTitle}>AI-Solutions</p>
                  <div style={styles.headerStatus}>
                    <span style={styles.statusDot} />
                    <span style={styles.statusText}>Online</span>
                  </div>
                </div>
              </div>
              <button
                className="chat-close-btn"
                style={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 3L13 13M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div style={styles.messagesArea}>
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div
                    key={i}
                    className="chat-msg-bubble-user"
                    style={styles.msgRowUser}
                  >
                    <div style={styles.userBubble}>{msg.text}</div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="chat-msg-bubble-bot"
                    style={styles.msgRowBot}
                  >
                    <div style={styles.botAvatarSmall}>{BOT_AVATAR}</div>
                    <div>
                      <div style={styles.botBubble}>{msg.text}</div>
                    </div>
                  </div>
                ),
              )}
              {isTyping && (
                <div style={styles.msgRowBot}>
                  <div style={styles.botAvatarSmall}>{BOT_AVATAR}</div>
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div style={styles.inputArea}>
              <input
                className="chat-input"
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me something…"
                aria-label="Chat message input"
              />
              <button
                className="chat-send-btn"
                style={{
                  ...styles.sendBtn,
                  opacity: input.trim() ? 1 : 0.45,
                  cursor: input.trim() ? "pointer" : "default",
                }}
                onClick={sendMessage}
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2 9H16M16 9L10 3M16 9L10 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              Powered by <span style={styles.footerBrand}>AI-Solutions</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  widgetRoot: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 9999,
    fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
  },
  toggleBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#00e5cc",
    color: "#0a0d0a",
    border: "none",
    borderRadius: "50px",
    padding: "12px 20px 12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.01em",
    boxShadow: "0 4px 24px rgba(0,229,204,0.35)",
    transition: "background 0.15s ease",
  },
  toggleLabel: {
    lineHeight: 1,
  },
  chatWindow: {
    width: "360px",
    background: "#0e1310",
    border: "1px solid rgba(0,229,204,0.18)",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,204,0.08)",
    animation: "slide-up 0.22s cubic-bezier(0.34,1.56,0.64,1) both",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "#111814",
    borderBottom: "1px solid rgba(0,229,204,0.12)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(0,229,204,0.1)",
    border: "1px solid rgba(0,229,204,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#f0faf8",
    letterSpacing: "0.01em",
  },
  headerStatus: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "2px",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00e5cc",
    display: "inline-block",
    boxShadow: "0 0 6px rgba(0,229,204,0.8)",
  },
  statusText: {
    fontSize: "11px",
    color: "#00e5cc",
    fontWeight: "500",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(240,250,248,0.5)",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s ease",
    lineHeight: 0,
  },
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "260px",
    maxHeight: "340px",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,229,204,0.2) transparent",
  },
  msgRowUser: {
    display: "flex",
    justifyContent: "flex-end",
  },
  msgRowBot: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  userBubble: {
    background: "#00e5cc",
    color: "#0a0d0a",
    borderRadius: "14px 14px 4px 14px",
    padding: "10px 14px",
    fontSize: "13.5px",
    fontWeight: "500",
    lineHeight: "1.5",
    maxWidth: "78%",
    wordBreak: "break-word",
  },
  botAvatarSmall: {
    width: "28px",
    height: "28px",
    flexShrink: 0,
    marginTop: "1px",
  },
  botBubble: {
    background: "#1a2420",
    border: "1px solid rgba(0,229,204,0.12)",
    color: "#c8ddd9",
    borderRadius: "4px 14px 14px 14px",
    padding: "10px 14px",
    fontSize: "13.5px",
    lineHeight: "1.55",
    maxWidth: "100%",
    wordBreak: "break-word",
  },
  typingBubble: {
    background: "#1a2420",
    border: "1px solid rgba(0,229,204,0.12)",
    borderRadius: "4px 14px 14px 14px",
    padding: "12px 16px",
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  typingDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00e5cc",
    display: "inline-block",
    animation: "bounce-dot 1.2s infinite ease-in-out",
  },
  linkChip: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: "6px",
    background: "rgba(0,229,204,0.08)",
    border: "1px solid rgba(0,229,204,0.22)",
    borderRadius: "20px",
    padding: "4px 10px 4px 8px",
    fontSize: "12px",
    color: "#00e5cc",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background 0.15s",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 14px",
    borderTop: "1px solid rgba(0,229,204,0.1)",
    background: "#0e1310",
  },
  input: {
    flex: 1,
    background: "#1a2420",
    border: "1px solid rgba(0,229,204,0.18)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13.5px",
    color: "#e8f5f2",
    outline: "none",
    transition: "border-color 0.15s ease",
    caretColor: "#00e5cc",
  },
  sendBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "rgba(0,229,204,0.12)",
    border: "1px solid rgba(0,229,204,0.3)",
    color: "#00e5cc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.15s, color 0.15s",
    lineHeight: 0,
  },
  footer: {
    textAlign: "center",
    fontSize: "11px",
    color: "rgba(200,221,217,0.35)",
    padding: "8px 0 10px",
    background: "#0e1310",
    letterSpacing: "0.01em",
  },
  footerBrand: {
    color: "rgba(0,229,204,0.5)",
    fontWeight: "600",
  },
};
