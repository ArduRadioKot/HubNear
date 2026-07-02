import { useState } from "react";
import {
  Home,
  MessageCircle,
  User,
  Settings,
  Search,
  Plus,
  ArrowLeft,
  Eye,
  EyeOff,
  Bell,
  Camera,
  ChevronRight,
  Clock,
  MapPin,
  Zap,
  Timer,
} from "lucide-react";
import { useIsMobile } from "./components/ui/use-mobile";

type Screen =
  | "welcome"
  | "register"
  | "login"
  | "feed"
  | "profile"
  | "chats"
  | "create";

const ACCENT = "#116F5F";
const ACCENT_LIGHT = "#1a9e84";
const ACCENT_MUTED = "#e6f4f1";

// ── helpers ──────────────────────────────────────────────────────────────────

function BottomNav({
  active,
  onNavigate,
}: {
  active: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const tabs: { id: Screen; Icon: typeof Home; label: string }[] = [
    { id: "feed", Icon: Home, label: "Сборы" },
    { id: "chats", Icon: MessageCircle, label: "Чаты" },
    { id: "profile", Icon: User, label: "Профиль" },
  ];
  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid #e5e7eb",
        background: "#fff",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      {tabs.map(({ id, Icon, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 0 4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              gap: 2,
            }}
          >
            <Icon
              size={22}
              color={isActive ? ACCENT : "#9ca3af"}
            />
            <span
              style={{
                fontSize: 10,
                color: isActive ? ACCENT : "#9ca3af",
                fontFamily: "Nunito Sans, sans-serif",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SidebarNav({
  active,
  onNavigate,
}: {
  active: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const tabs: { id: Screen; Icon: typeof Home; label: string }[] = [
    { id: "feed", Icon: Home, label: "Сборы" },
    { id: "chats", Icon: MessageCircle, label: "Чаты" },
    { id: "profile", Icon: User, label: "Профиль" },
  ];

  return (
    <div
      style={{
        width: 240,
        height: "100vh",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 200,
          fontSize: 28,
          color: ACCENT,
          letterSpacing: -0.5,
          marginBottom: 32,
          paddingLeft: 12,
        }}
      >
        dViz
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {tabs.map(({ id, Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 12,
                background: isActive ? ACCENT_MUTED : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Icon
                size={20}
                color={isActive ? ACCENT : "#6b7280"}
              />
              <span
                style={{
                  fontSize: 15,
                  color: isActive ? ACCENT : "#374151",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          borderRadius: 12,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Settings size={20} color="#6b7280" />
        <span
          style={{
            fontSize: 15,
            color: "#374151",
            fontFamily: "Nunito Sans, sans-serif",
          }}
        >
          Настройки
        </span>
      </button>
    </div>
  );
}

// ── Welcome screen ────────────────────────────────────────────────────────────

function WelcomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "space-between" : "center",
        alignItems: isMobile ? "stretch" : "center",
        background: `linear-gradient(160deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 55%, #a8e4d8 100%)`,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        padding: isMobile ? "60px 28px 48px" : "0",
        maxWidth: isMobile ? "100%" : "100%",
        margin: isMobile ? "0" : "0",
        zIndex: 1000,
      }}
    >
      {/* decorative circles */}
      {[
        { w: 280, h: 280, top: "25%", left: "30%", op: 0.15 },
        { w: 220, h: 220, top: "35%", left: "15%", op: 0.12 },
        { w: 170, h: 170, top: "48%", left: "45%", op: 0.1 },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: c.w,
            height: c.h,
            borderRadius: "50%",
            border: `2px solid rgba(255,255,255,${c.op * 3})`,
            background: `rgba(255,255,255,${c.op})`,
            top: c.top,
            left: c.left,
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}

      {/* Left side - text */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        flex: isMobile ? "none" : 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: isMobile ? 0 : "80px",
        paddingRight: isMobile ? 0 : "40px",
      }}>
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 200,
            fontSize: isMobile ? 52 : 72,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: -1,
            marginBottom: 12,
          }}
        >
          dViz
        </h1>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: isMobile ? 16 : 20,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 200,
            maxWidth: isMobile ? "100%" : "500px",
          }}
        >
          Находи компанию для спорта и активностей рядом
        </p>
      </div>

      {/* Right side - buttons */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        flex: isMobile ? "none" : 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: isMobile ? "stretch" : "flex-start",
        paddingLeft: isMobile ? 0 : "40px",
        paddingRight: isMobile ? 0 : "80px",
        maxWidth: isMobile ? "100%" : "400px",
      }}>
        <button
          onClick={() => onNavigate("register")}
          style={{
            width: isMobile ? "100%" : "280px",
            padding: "15px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.25)",
            border: "1.5px solid rgba(255,255,255,0.5)",
            color: "#fff",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 200,
            fontSize: 16,
            marginBottom: 12,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          Регистрация
        </button>
        <button
          onClick={() => onNavigate("login")}
          style={{
            width: isMobile ? "100%" : "280px",
            padding: "15px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            color: "#fff",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 200,
            fontSize: 16,
            marginBottom: 24,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          Вход
        </button>
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "Nunito Sans, sans-serif",
              fontSize: 13,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            🌐 выбрать язык
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Auth forms ────────────────────────────────────────────────────────────────

function AuthScreen({
  mode,
  onNavigate,
}: {
  mode: "login" | "register";
  onNavigate: (s: Screen) => void;
}) {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "0" : "40px",
        zIndex: 1000,
      }}
    >
      {/* blob */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT_LIGHT}55 0%, ${ACCENT}33 60%, transparent 80%)`,
        }}
      />

      <div style={{ padding: isMobile ? "70px 28px 40px" : "40px", flex: 1, position: "relative", zIndex: 1, width: "100%", maxWidth: isMobile ? "100%" : "450px" }}>
        <button
          onClick={() => onNavigate("welcome")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#6b7280",
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 200,
            fontSize: 36,
            color: "#1a1a1a",
            marginBottom: 32,
          }}
        >
          {mode === "login" ? "Вход" : "Регистрация"}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                color: "#374151",
                display: "block",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Введите Email..."
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                color: "#374151",
                display: "block",
                marginBottom: 6,
              }}
            >
              Пароль
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Введите пароль..."
                style={{
                  width: "100%",
                  padding: "12px 42px 12px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: 14,
                  outline: "none",
                  color: "#374151",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: 14,
                  color: "#374151",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Повторите пароль
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass2 ? "text" : "password"}
                  placeholder="Повторите пароль..."
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    fontFamily: "Nunito Sans, sans-serif",
                    fontSize: 14,
                    outline: "none",
                    color: "#374151",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={() => setShowPass2(!showPass2)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    display: "flex",
                  }}
                >
                  {showPass2 ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => onNavigate("feed")}
            style={{
              marginTop: 8,
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: ACCENT,
              border: "none",
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 200,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Войти" : "Регистрация"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontFamily: "Nunito Sans, sans-serif",
              fontSize: 14,
              color: "#6b7280",
              marginTop: 8,
            }}
          >
            {mode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
            <button
              onClick={() => onNavigate(mode === "login" ? "register" : "login")}
              style={{
                background: "none",
                border: "none",
                color: ACCENT,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {mode === "login" ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Feed screen ───────────────────────────────────────────────────────────────

type Event = {
  id: string;
  activity: string;
  category: string;
  time: string;
  location: string;
  needed: number;
  current: number;
  level: string;
  deadline: string;
  organizer: string;
  avatar: string;
  confirmed: boolean;
  image?: string;
};

const CATEGORIES = [
  "Все",
  "Спорт",
  "Игры",
  "Культура",
  "Прогулки",
  "Еда",
  "Обучение",
  "Другое",
];

const EVENTS: Event[] = [
  {
    id: "1",
    activity: "Волейбол",
    category: "Спорт",
    time: "Сегодня 19:00",
    location: "Парк Горького",
    needed: 12,
    current: 8,
    level: "Любительский",
    deadline: "17:30",
    organizer: "Алексей",
    avatar: "https://i.pravatar.cc/150?img=11",
    confirmed: false,
    image: "https://picsum.photos/seed/volleyball1/600/400",
  },
  {
    id: "2",
    activity: "Настольные игры",
    category: "Игры",
    time: "Сегодня 20:00",
    location: "Кафе У Друзей",
    needed: 6,
    current: 4,
    level: "Любой",
    deadline: "18:00",
    organizer: "Дмитрий",
    avatar: "https://i.pravatar.cc/150?img=15",
    confirmed: false,
    image: "https://picsum.photos/seed/boardgames/600/400",
  },
  {
    id: "3",
    activity: "Прогулка в парке",
    category: "Прогулки",
    time: "Завтра 10:00",
    location: "Парк Сокольники",
    needed: 5,
    current: 5,
    level: "Любой",
    deadline: "09:00",
    organizer: "Мария",
    avatar: "https://i.pravatar.cc/150?img=5",
    confirmed: true,
    image: "https://picsum.photos/seed/walkpark/600/400",
  },
  {
    id: "4",
    activity: "Кино",
    category: "Культура",
    time: "Сегодня 18:00",
    location: "Киноцентр Октябрь",
    needed: 4,
    current: 2,
    level: "Любой",
    deadline: "16:00",
    organizer: "Игорь",
    avatar: "https://i.pravatar.cc/150?img=33",
    confirmed: false,
    image: "https://picsum.photos/seed/cinema/600/400",
  },
  {
    id: "5",
    activity: "Кофе и разговоры",
    category: "Еда",
    time: "Сегодня 15:00",
    location: "Кофейня на Тверской",
    needed: 3,
    current: 1,
    level: "Любой",
    deadline: "14:00",
    organizer: "Анна",
    avatar: "https://i.pravatar.cc/150?img=9",
    confirmed: false,
  },
  {
    id: "6",
    activity: "Английский клуб",
    category: "Обучение",
    time: "Завтра 19:00",
    location: "Библиотека",
    needed: 8,
    current: 6,
    level: "Средний",
    deadline: "17:00",
    organizer: "Елена",
    avatar: "https://i.pravatar.cc/150?img=22",
    confirmed: false,
    image: "https://picsum.photos/seed/english/600/400",
  },
];

function FeedScreen({ onCreateClick }: { onCreateClick: () => void }) {
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const isMobile = useIsMobile();

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoin = (eventId: string) => {
    const nextJoined = new Set(joined);
    if (nextJoined.has(eventId)) {
      nextJoined.delete(eventId);
      setEvents(events.map(e => 
        e.id === eventId ? { ...e, current: e.current - 1, confirmed: e.current - 1 >= e.needed } : e
      ));
    } else {
      nextJoined.add(eventId);
      setEvents(events.map(e => 
        e.id === eventId ? { ...e, current: e.current + 1, confirmed: e.current + 1 >= e.needed } : e
      ));
    }
    setJoined(nextJoined);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "f0f2f5" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 20px 12px" : "20px 32px 16px",
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200, fontSize: isMobile ? 22 : 28, color: ACCENT, letterSpacing: -0.5 }}>
          dViz
        </h2>
        <div style={{ display: "flex", gap: 16, marginLeft: isMobile ? 0 : "auto" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Bell size={isMobile ? 22 : 24} color="#374151" />
          </button>
          <button 
            onClick={onCreateClick}
            style={{
              background: ACCENT,
              border: "none",
              borderRadius: "50%",
              width: isMobile ? 40 : 44,
              height: isMobile ? 40 : 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Plus size={isMobile ? 20 : 22} color="#fff" />
          </button>
        </div>
      </div>

      {/* search bar */}
      <div
        style={{
          padding: isMobile ? "12px 16px" : "16px 32px",
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#f3f4f6",
            padding: "10px 14px",
            borderRadius: 10,
          }}
        >
          <Search size={isMobile ? 18 : 20} color="#9ca3af" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск мероприятий..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "Nunito Sans, sans-serif",
              fontSize: 14,
              color: "#374151",
            }}
          />
        </div>
      </div>

      {/* category filters */}
      <div
        style={{
          padding: isMobile ? "8px 16px" : "12px 32px",
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
          overflowX: "auto",
          display: "flex",
          gap: 8,
        }}
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: isMobile ? "6px 14px" : "8px 16px",
              borderRadius: 20,
              background: selectedCategory === category ? ACCENT : "#f3f4f6",
              border: "none",
              color: selectedCategory === category ? "#fff" : "#374151",
              fontFamily: "Nunito Sans, sans-serif",
              fontSize: isMobile ? 13 : 14,
              fontWeight: selectedCategory === category ? 600 : 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* events list */}
      <div
        className="keep-nunito"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? "12px 14px" : "24px 32px",
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : "row",
          gridTemplateColumns: isMobile ? undefined : "repeat(auto-fill, minmax(280px, 1fr))",
          gap: isMobile ? 16 : 20,
          alignContent: isMobile ? undefined : "start",
          paddingBottom: isMobile ? 80 : 32,
        }}
      >
        {filteredEvents.map((event) => {
          const isJoined = joined.has(event.id);
          const spotsLeft = event.needed - event.current;
          const progress = (event.current / event.needed) * 100;
          
          return (
            <div
              key={event.id}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
                aspectRatio: isMobile ? "1 / 1.15" : "1 / 1.1",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                cursor: "pointer",
                width: isMobile ? "100%" : "auto",
                flexShrink: 0,
              }}
            >
              {/* full-bleed image or fallback */}
              {event.image ? (
                <img
                  src={event.image}
                  alt="event"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 48, opacity: 0.3 }}>📅</span>
                </div>
              )}

              {/* top gradient + activity + status */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  padding: isMobile ? "12px 14px 40px" : "14px 16px 44px",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 18, color: "#fff", margin: "0 0 4px" }}>
                    {event.activity}
                  </h3>
                  {event.confirmed && (
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: "rgba(17, 111, 95, 0.9)",
                      padding: "3px 8px",
                      borderRadius: 12,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                      <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 11, color: "#fff", fontWeight: 600 }}>
                        Подтверждено
                      </span>
                    </div>
                  )}
                </div>
                <img
                  src={event.avatar}
                  style={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
                  alt={event.organizer}
                />
              </div>

              {/* bottom gradient + details + actions */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding: isMobile ? "40px 14px 14px" : "44px 16px 16px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                }}
              >
                {/* time & location */}
                <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={isMobile ? 14 : 16} color="#fff" />
                    <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 12 : 13, color: "#fff" }}>{event.time}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <MapPin size={isMobile ? 14 : 16} color="#fff" />
                    <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 12 : 13, color: "#fff" }}>{event.location}</span>
                  </div>
                </div>

                {/* level & deadline */}
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Zap size={isMobile ? 14 : 16} color="#fff" />
                    <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.9)" }}>{event.level}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Timer size={isMobile ? 14 : 16} color="#fff" />
                    <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.9)" }}>до {event.deadline}</span>
                  </div>
                </div>

                {/* participants progress */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "rgba(255,255,255,0.85)" }}>
                      {event.current}/{event.needed} участников
                    </span>
                    <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: isMobile ? 11 : 12, color: spotsLeft <= 0 ? "#86efac" : "#fbbf24" }}>
                      {spotsLeft <= 0 ? "Набор завершён" : `${spotsLeft} мест`}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(progress, 100)}%`,
                        background: event.confirmed ? "#86efac" : progress >= 100 ? "#22c55e" : ACCENT_LIGHT,
                        borderRadius: 3,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {/* join button */}
                <button
                  onClick={() => handleJoin(event.id)}
                  disabled={spotsLeft <= 0 && !isJoined}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    background: isJoined ? "rgba(255,255,255,0.2)" : spotsLeft <= 0 ? "rgba(255,255,255,0.15)" : ACCENT,
                    border: isJoined ? "1px solid rgba(255,255,255,0.4)" : "none",
                    color: "#fff",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 13 : 14,
                    cursor: spotsLeft <= 0 && !isJoined ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {isJoined ? "Отменить" : spotsLeft <= 0 ? "Мест нет" : "Присоединиться"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Create Event screen ─────────────────────────────────────────────────────────

function CreateEventScreen({ onNavigate, onCreate }: { onNavigate: (s: Screen) => void; onCreate: (event: Event) => void }) {
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("Спорт");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [needed, setNeeded] = useState("");
  const [level, setLevel] = useState("Любой");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");
  const isMobile = useIsMobile();

  const handleSubmit = () => {
    if (!activity || !time || !location || !needed || !deadline) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      activity,
      category,
      time,
      location,
      needed: parseInt(needed),
      current: 1,
      level,
      deadline,
      organizer: "Вы",
      avatar: "https://i.pravatar.cc/150?img=5",
      confirmed: false,
      image: image || undefined,
    };

    onCreate(newEvent);
    onNavigate("feed");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f9fafb" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 20px 12px" : "20px 32px 16px",
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <button
          onClick={() => onNavigate("feed")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={isMobile ? 22 : 24} color="#374151" />
        </button>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200, fontSize: isMobile ? 22 : 28, color: ACCENT, letterSpacing: -0.5 }}>
          Создать сбор
        </h2>
        <div style={{ width: isMobile ? 24 : 32 }} />
      </div>

      {/* form */}
      <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "16px 20px" : "32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 600, margin: "0 auto" }}>
          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Активность *
            </label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Например: Волейбол"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Категория *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              {CATEGORIES.filter(c => c !== "Все").map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Время *
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Например: Сегодня 19:00"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Место *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Например: Парк Горького"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Нужно участников *
            </label>
            <input
              type="number"
              value={needed}
              onChange={(e) => setNeeded(e.target.value)}
              placeholder="Например: 12"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Уровень
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              <option value="Любой">Любой</option>
              <option value="Любительский">Любительский</option>
              <option value="Средний">Средний</option>
              <option value="Продвинутый">Продвинутый</option>
            </select>
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Набор до *
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Например: 17:30"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
              Ссылка на изображение (необязательно)
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: 14,
                outline: "none",
                color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!activity || !time || !location || !needed || !deadline}
            style={{
              marginTop: 8,
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: !activity || !time || !location || !needed || !deadline ? "#e5e7eb" : ACCENT,
              border: "none",
              color: !activity || !time || !location || !needed || !deadline ? "#9ca3af" : "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 200,
              fontSize: 16,
              cursor: !activity || !time || !location || !needed || !deadline ? "not-allowed" : "pointer",
            }}
          >
            Создать сбор
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Profile screen ────────────────────────────────────────────────────────────

const FRIENDS = [
  { name: "Дима", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Рита", avatar: "https://i.pravatar.cc/150?img=9" },
  { name: "Катя", avatar: "https://i.pravatar.cc/150?img=22" },
  { name: "Иван", avatar: "https://i.pravatar.cc/150?img=30" },
];

const PLACES = [
  { name: "Красный камень", img: "https://picsum.photos/seed/place1/200/150" },
  { name: "Гурзуф", img: "https://picsum.photos/seed/place2/200/150" },
  { name: "Краснокаменка", img: "https://picsum.photos/seed/place3/200/150" },
];

function ProfileScreen() {
  const isMobile = useIsMobile();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* header gradient */}
      <div
        style={{
          background: `linear-gradient(160deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
          padding: isMobile ? "44px 20px 20px" : "60px 32px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          position: "relative",
        }}
      >
        {/* star / asterisk decoration top-left */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? 46 : 60,
            left: isMobile ? 20 : 32,
            color: "rgba(255,255,255,0.55)",
            fontSize: 28,
            lineHeight: 1,
            userSelect: "none",
            fontWeight: 300,
          }}
        >
          ✳
        </div>
        {/* settings top-right */}
        <div style={{ position: "absolute", top: isMobile ? 46 : 60, right: isMobile ? 20 : 32 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Settings size={isMobile ? 22 : 24} color="rgba(255,255,255,0.8)" />
          </button>
        </div>

        <div style={{ position: "relative", marginTop: 8 }}>
          <img
            src="https://i.pravatar.cc/150?img=5"
            style={{ width: isMobile ? 80 : 100, height: isMobile ? 80 : 100, borderRadius: "50%", border: "3px solid #fff", objectFit: "cover" }}
            alt="profile"
          />
          <div
            style={{
              position: "absolute",
              bottom: 2, right: 2,
              width: 22, height: 22,
              borderRadius: "50%",
              background: ACCENT,
              border: "2px solid #fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Camera size={11} color="#fff" />
          </div>
        </div>
        <h2 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: "#fff", margin: 0 }}>
          София Достоевская
        </h2>
        <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.75)", margin: 0 }}>
          @annahanova
        </p>
        <div style={{ display: "flex", gap: isMobile ? 24 : 32, marginTop: 8 }}>
          {[
            { label: "Друзья", val: "124" },
            { label: "Публикации", val: "38" },
            { label: "Места", val: "17" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 20, color: "#fff", margin: 0 }}>
                {s.val}
              </p>
              <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: isMobile ? 0 : "24px 32px" }}>
        {/* Friends */}
        <div style={{ background: "#fff", margin: isMobile ? "8px 0" : "0 0 16px 0", padding: isMobile ? "14px 16px" : "20px 24px", borderRadius: isMobile ? 0 : 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isMobile ? 12 : 16 }}>
            <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, margin: 0 }}>
              Друзья
            </h3>
            <button
              style={{
                background: "none",
                border: "none",
                color: ACCENT,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: isMobile ? 13 : 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              Все <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: "flex", gap: isMobile ? 16 : 20 }}>
            {FRIENDS.map((f) => (
              <div key={f.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <img
                  src={f.avatar}
                  style={{ width: isMobile ? 52 : 60, height: isMobile ? 52 : 60, borderRadius: "50%", objectFit: "cover", border: `2px solid ${ACCENT}` }}
                  alt={f.name}
                />
                <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "#374151" }}>
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Favourite places */}
        <div style={{ background: "#fff", margin: isMobile ? "8px 0" : "0 0 16px 0", padding: isMobile ? "14px 16px" : "20px 24px", borderRadius: isMobile ? 0 : 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isMobile ? 12 : 16 }}>
            <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, margin: 0 }}>
              Любимые места
            </h3>
            <button
              style={{
                background: "none",
                border: "none",
                color: ACCENT,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: isMobile ? 13 : 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              Все <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: "flex", gap: isMobile ? 10 : 16, overflowX: "auto" }}>
            {PLACES.map((p) => (
              <div key={p.name} style={{ flexShrink: 0, width: isMobile ? 110 : 130 }}>
                <img
                  src={p.img}
                  style={{ width: isMobile ? 110 : 130, height: isMobile ? 80 : 95, borderRadius: 10, objectFit: "cover" }}
                  alt={p.name}
                />
                <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "#374151", margin: "4px 0 0", textAlign: "center" }}>
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div style={{ background: "#fff", margin: isMobile ? "8px 0" : "0 0 16px 0", padding: isMobile ? "14px 16px" : "20px 24px", borderRadius: isMobile ? 0 : 16 }}>
          <h3 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, margin: "0 0 12px" }}>
            Аналитика
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                label: "Шаги и калории",
                val: "6 482",
                sub: "шагов сегодня · 310 ккал",
                color: ACCENT,
                bg: ACCENT_MUTED,
                icon: "🦶",
              },
              {
                label: "Карта любимых мест",
                val: "4 места",
                sub: "посещено за неделю",
                color: ACCENT_LIGHT,
                bg: "#e6f7f4",
                icon: "📍",
              },
              {
                label: "Достижения",
                val: "12 / 30",
                sub: "разблокировано",
                color: "#6366f1",
                bg: "#eef2ff",
                icon: "🏆",
              },
            ].map((a) => (
              <div
                key={a.label}
                style={{
                  background: a.bg,
                  borderRadius: 14,
                  padding: isMobile ? "14px 16px" : "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: isMobile ? 46 : 52,
                    height: isMobile ? 46 : 52,
                    borderRadius: 12,
                    background: a.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? 22 : 24,
                    flexShrink: 0,
                  }}
                >
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 12 : 13, color: "#6b7280", margin: 0 }}>
                    {a.label}
                  </p>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 22, margin: "1px 0 0", color: "#111827" }}>
                    {a.val}
                  </p>
                  <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "#9ca3af", margin: "1px 0 0" }}>
                    {a.sub}
                  </p>
                </div>
                <ChevronRight size={16} color="#9ca3af" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Chats screen ──────────────────────────────────────────────────────────────

const CHATS = [
  {
    name: "Разработчики",
    avatar: "https://i.pravatar.cc/150?img=68",
    last: "Привет! Добро пожаловать!..",
    time: "12:10",
    unread: 1,
    group: true,
  },
  {
    name: "Рита Смирнова",
    avatar: "https://i.pravatar.cc/150?img=9",
    last: "Увидимся завтра?",
    time: "11:30",
    unread: 0,
    group: false,
  },
  {
    name: "Дима Козлов",
    avatar: "https://i.pravatar.cc/150?img=11",
    last: "Отличная идея!",
    time: "Вчера",
    unread: 3,
    group: false,
  },
  {
    name: "Поход в горы 🏔",
    avatar: "https://i.pravatar.cc/150?img=44",
    last: "Кто берёт палатку?",
    time: "Вчера",
    unread: 7,
    group: true,
  },
];

function ChatsScreen() {
  const [tab, setTab] = useState<"chats" | "calls">("chats");
  const isMobile = useIsMobile();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* gradient header */}
      <div
        style={{
          background: `linear-gradient(160deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
          padding: isMobile ? "48px 20px 24px" : "32px",
          borderBottomLeftRadius: isMobile ? 28 : 0,
          borderBottomRightRadius: isMobile ? 28 : 0,
          zIndex: 1,
          boxShadow: "0 4px 16px rgba(17,111,95,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isMobile ? 16 : 20 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Settings size={isMobile ? 22 : 24} color="#fff" />
          </button>
          {!isMobile && (
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 200,
                fontSize: 28,
                color: "#fff",
                margin: 0,
                letterSpacing: -0.5,
              }}
            >
              dViz
            </h1>
          )}
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Search size={isMobile ? 22 : 24} color="#fff" />
          </button>
        </div>
        {/* tabs */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 12,
            padding: 3,
            maxWidth: isMobile ? "100%" : 300,
          }}
        >
          {(["chats", "calls"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: isMobile ? "8px" : "10px",
                borderRadius: 10,
                background: tab === t ? "#fff" : "transparent",
                border: "none",
                color: tab === t ? ACCENT : "rgba(255,255,255,0.8)",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: isMobile ? 14 : 15,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t === "chats" ? "Чаты" : "Звонки"}
            </button>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="keep-nunito" style={{ flex: 1, overflowY: "auto", background: "#fff", padding: isMobile ? 0 : "24px 32px" }}>
        {CHATS.map((chat, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              padding: isMobile ? "12px 16px" : "16px 20px",
              gap: isMobile ? 12 : 16,
              borderBottom: isMobile ? "1px solid #f3f4f6" : "none",
              cursor: "pointer",
              borderRadius: isMobile ? 0 : 12,
              marginBottom: isMobile ? 0 : 8,
              background: isMobile ? "transparent" : "#f9fafb",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={chat.avatar}
                style={{ width: isMobile ? 50 : 56, height: isMobile ? 50 : 56, borderRadius: "50%", objectFit: "cover" }}
                alt={chat.name}
              />
              {!chat.group && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#22c55e",
                    border: "2px solid #fff",
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 16, margin: 0, color: "#111827" }}>
                {chat.name}
              </p>
              <p
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: "#9ca3af",
                  margin: "2px 0 0",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {chat.last}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "#9ca3af" }}>
                {chat.time}
              </span>
              {chat.unread > 0 && (
                <div
                  style={{
                    width: isMobile ? 20 : 24,
                    height: isMobile ? 20 : 24,
                    borderRadius: "50%",
                    background: ACCENT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: "Nunito, sans-serif", fontSize: isMobile ? 11 : 12, color: "#fff", fontWeight: 700 }}>
                    {chat.unread}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const isMobile = useIsMobile();

  const showNav = ["feed", "chats", "profile"].includes(screen);

  const getActiveTab = (): Screen => {
    if (screen === "feed") return "feed";
    if (screen === "chats") return "chats";
    if (screen === "profile") return "profile";
    return "feed";
  };

  const handleCreateEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="app-shell" style={{ fontFamily: "Nunito Sans, sans-serif", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="app-surface" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginLeft: !isMobile && showNav ? 240 : 0,
            height: "100%",
          }}
        >
          {screen === "welcome" && <WelcomeScreen onNavigate={setScreen} />}
          {screen === "register" && <AuthScreen mode="register" onNavigate={setScreen} />}
          {screen === "login" && <AuthScreen mode="login" onNavigate={setScreen} />}
          {screen === "feed" && <FeedScreen onCreateClick={() => setScreen("create")} />}
          {screen === "profile" && <ProfileScreen />}
          {screen === "chats" && <ChatsScreen />}
          {screen === "create" && <CreateEventScreen onNavigate={setScreen} onCreate={handleCreateEvent} />}
        </div>

        {showNav && (
          isMobile ? (
            <BottomNav active={getActiveTab()} onNavigate={setScreen} />
          ) : (
            <SidebarNav active={getActiveTab()} onNavigate={setScreen} />
          )
        )}
      </div>
    </div>
  );
}
