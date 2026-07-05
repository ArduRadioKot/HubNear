import { Search, Settings, Send, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useIsMobile } from "../components/ui/use-mobile";
import { ACCENT, ACCENT_LIGHT } from "../theme";

type ChatItem = {
  id: string;
  name: string;
  avatar: string;
  last: string;
  time: string;
  unread: number;
  group: boolean;
};

type Message = {
  id: string;
  chatId: string;
  fromMe: boolean;
  text: string;
  time: string;
};

const CHATS: ChatItem[] = [
  {
    id: "devs",
    name: "Разработчики",
    avatar: "https://i.pravatar.cc/150?img=68",
    last: "Привет! Добро пожаловать!",
    time: "12:10",
    unread: 1,
    group: true,
  },
  {
    id: "rita",
    name: "Рита Смирнова",
    avatar: "https://i.pravatar.cc/150?img=9",
    last: "Увидимся завтра?",
    time: "11:30",
    unread: 0,
    group: false,
  },
  {
    id: "dima",
    name: "Дима Козлов",
    avatar: "https://i.pravatar.cc/150?img=11",
    last: "Отличная идея!",
    time: "Вчера",
    unread: 3,
    group: false,
  },
  {
    id: "hike",
    name: "Поход в горы",
    avatar: "https://i.pravatar.cc/150?img=44",
    last: "Кто берёт палатку?",
    time: "Вчера",
    unread: 7,
    group: true,
  },
];

const MESSAGES: Message[] = [
  { id: "m1", chatId: "devs", fromMe: false, text: "Привет! Добро пожаловать в чат", time: "12:01" },
  { id: "m2", chatId: "devs", fromMe: true, text: "Спасибо! Когда ближайший сбор?", time: "12:03" },
  { id: "m3", chatId: "devs", fromMe: false, text: "Сегодня в 19:00 волейбол, парк Горького", time: "12:04" },
  { id: "m4", chatId: "rita", fromMe: false, text: "Увидимся завтра?", time: "11:30" },
  { id: "m5", chatId: "dima", fromMe: false, text: "Отличная идея!", time: "Вчера" },
  { id: "m6", chatId: "hike", fromMe: false, text: "Кто берёт палатку?", time: "Вчера" },
];

export function ChatsScreen() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<"chats" | "calls">("chats");
  const [activeChatId, setActiveChatId] = useState(CHATS[0]?.id ?? "");
  const [draft, setDraft] = useState("");

  const activeChat = CHATS.find((chat) => chat.id === activeChatId) ?? CHATS[0];
  const messages = useMemo(
    () => MESSAGES.filter((message) => message.chatId === activeChat?.id),
    [activeChat?.id],
  );

  const showDialog = !isMobile || Boolean(activeChatId);
  const showList = !isMobile || !activeChatId;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          background: `linear-gradient(160deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
          padding: isMobile ? "48px 20px 24px" : "24px 24px 18px",
          borderBottomLeftRadius: isMobile ? 28 : 0,
          borderBottomRightRadius: isMobile ? 28 : 0,
          boxShadow: "0 4px 16px rgba(17,111,95,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Settings size={isMobile ? 22 : 24} color="#fff" />
          </button>
          <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200, fontSize: isMobile ? 24 : 28, color: "#fff", margin: 0, letterSpacing: -0.5 }}>Чаты</h1>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Search size={isMobile ? 22 : 24} color="#fff" />
          </button>
        </div>

        <div style={{ display: "flex", background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: 3, maxWidth: 280 }}>
          {(["chats", "calls"] as const).map((name) => (
            <button
              key={name}
              onClick={() => setTab(name)}
              style={{
                flex: 1,
                padding: isMobile ? "8px" : "9px",
                borderRadius: 10,
                background: tab === name ? "#fff" : "transparent",
                border: "none",
                color: tab === name ? ACCENT : "rgba(255,255,255,0.85)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {name === "chats" ? "Чаты" : "Звонки"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", background: "#f8fafc" }}>
        {showList && (
          <aside
            className="keep-nunito"
            style={{
              width: isMobile ? "100%" : 360,
              flexShrink: 0,
              overflowY: "auto",
              borderRight: isMobile ? "none" : "1px solid #e5e7eb",
              background: "#fff",
              padding: isMobile ? 0 : 12,
            }}
          >
            {CHATS.map((chat) => {
              const isActive = chat.id === activeChatId;

              return (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    padding: isMobile ? "12px 16px" : "12px 14px",
                    gap: 12,
                    border: "none",
                    borderRadius: isMobile ? 0 : 12,
                    marginBottom: isMobile ? 0 : 8,
                    background: isActive ? "#eef7f5" : isMobile ? "#fff" : "#f8fafc",
                    borderBottom: isMobile ? "1px solid #f3f4f6" : "none",
                    cursor: "pointer",
                  }}
                >
                  <img src={chat.avatar} style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }} alt={chat.name} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 15, margin: 0, color: "#111827" }}>{chat.name}</p>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#6b7280", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chat.last}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, color: "#9ca3af" }}>{chat.time}</span>
                    {chat.unread > 0 && (
                      <div style={{ minWidth: 20, height: 20, borderRadius: 10, padding: "0 6px", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, color: "#fff", fontWeight: 700 }}>{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </aside>
        )}

        {showDialog && activeChat && (
          <section style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
              {isMobile && (
                <button onClick={() => setActiveChatId("")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                  <ArrowLeft size={20} color="#374151" />
                </button>
              )}
              <img src={activeChat.avatar} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} alt={activeChat.name} />
              <div>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 15, margin: 0, color: "#111827" }}>{activeChat.name}</p>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, margin: 0, color: "#9ca3af" }}>{activeChat.group ? "Групповой чат" : "В сети"}</p>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "12px" : "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              {messages.map((message) => (
                <div key={message.id} style={{ display: "flex", justifyContent: message.fromMe ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      background: message.fromMe ? ACCENT : "#fff",
                      color: message.fromMe ? "#fff" : "#111827",
                      boxShadow: message.fromMe ? "none" : "0 1px 2px rgba(0,0,0,0.06)",
                    }}
                  >
                    <p style={{ margin: 0, fontFamily: "Montserrat, sans-serif", fontSize: 14 }}>{message.text}</p>
                    <p style={{ margin: "4px 0 0", fontFamily: "Montserrat, sans-serif", fontSize: 11, opacity: 0.75, textAlign: "right" }}>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 12, borderTop: "1px solid #e5e7eb", background: "#fff", display: "flex", gap: 8 }}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Написать сообщение..."
                style={{
                  flex: 1,
                  border: "1px solid #d1d5db",
                  borderRadius: 10,
                  padding: "10px 12px",
                  outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 16,
                }}
              />
              <button style={{ width: 40, borderRadius: 10, border: "none", background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Send size={16} />
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
