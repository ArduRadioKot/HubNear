import { useState, useEffect } from "react";
import {
  Home,
  MessageCircle,
  Map,
  ScanLine,
  User,
  Settings,
  Search,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronRight,
  Camera,
  Plus,
  Minus,
  Navigation,
  ArrowLeft,
  Eye,
  EyeOff,
  Bell,
} from "lucide-react";
import { useIsMobile } from "./components/ui/use-mobile";

type Screen =
  | "welcome"
  | "register"
  | "login"
  | "feed"
  | "profile"
  | "chats"
  | "map";

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
    { id: "feed", Icon: Home, label: "Лента" },
    { id: "chats", Icon: MessageCircle, label: "Чаты" },
    { id: "map", Icon: Map, label: "Карта" },
    { id: "feed", Icon: ScanLine, label: "Скан" },
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
      {tabs.map(({ id, Icon, label }, i) => {
        const isActive = active === id && !(id === "feed" && i === 3);
        const isScan = i === 3;
        return (
          <button
            key={i}
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
            <div
              style={{
                width: isScan ? 40 : 24,
                height: isScan ? 40 : 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: isScan ? "50%" : 0,
                background: isScan ? ACCENT : "transparent",
                marginBottom: isScan ? -2 : 0,
              }}
            >
              <Icon
                size={isScan ? 18 : 22}
                color={isScan ? "#fff" : isActive ? ACCENT : "#9ca3af"}
              />
            </div>
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
    { id: "feed", Icon: Home, label: "Лента" },
    { id: "chats", Icon: MessageCircle, label: "Чаты" },
    { id: "map", Icon: Map, label: "Карта" },
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
        СНАПУС
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
          ПРИВЕТ!
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
          фраза крутая пафосная тут
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

const POSTS = [
  {
    user: "София Д.",
    handle: "@sofia_dostoyevskaya",
    avatar: "https://i.pravatar.cc/150?img=47",
    image: "https://picsum.photos/seed/forest1/600/400",
    caption: "Была сегодня в заповеднике «Лесной остров» с семьёй. Очень понравилось!",
    likes: 24,
    comments: 5,
    time: "2 ч",
  },
  {
    user: "Анна Л.",
    handle: "@anna_loves_travel",
    avatar: "https://i.pravatar.cc/150?img=5",
    image: "https://picsum.photos/seed/mountain88/600/400",
    caption: "Горы — это моя любовь навсегда. Ничего прекраснее не видела!",
    likes: 61,
    comments: 12,
    time: "4 ч",
  },
  {
    user: "Максим К.",
    handle: "@maxim_photo",
    avatar: "https://i.pravatar.cc/150?img=15",
    image: "https://picsum.photos/seed/lake22/600/400",
    caption: "Тихое утро у озера. Именно такие моменты делают жизнь прекрасной.",
    likes: 38,
    comments: 7,
    time: "6 ч",
  },
];

function FeedScreen() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f0f2f5" }}>
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
        {!isMobile && (
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200, fontSize: 28, color: ACCENT, letterSpacing: -0.5 }}>
            СНАПУС
          </h2>
        )}
        <div style={{ display: "flex", gap: 16, marginLeft: isMobile ? 0 : "auto" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Bell size={isMobile ? 22 : 24} color="#374151" />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Camera size={isMobile ? 22 : 24} color="#374151" />
          </button>
        </div>
      </div>

      {/* stories row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: isMobile ? "12px 16px" : "16px 32px",
          overflowX: "auto",
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        {[
          { avatar: "https://i.pravatar.cc/150?img=3", name: "Ты" },
          { avatar: "https://i.pravatar.cc/150?img=9", name: "Рита" },
          { avatar: "https://i.pravatar.cc/150?img=12", name: "Дима" },
          { avatar: "https://i.pravatar.cc/150?img=22", name: "Катя" },
          { avatar: "https://i.pravatar.cc/150?img=31", name: "Илья" },
          { avatar: "https://i.pravatar.cc/150?img=45", name: "Оля" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <div
              style={{
                padding: 2,
                borderRadius: "50%",
                background: i === 0 ? "#e5e7eb" : `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
              }}
            >
              {i === 0 ? (
                <div
                  style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: ACCENT_MUTED, display: "flex",
                    alignItems: "center", justifyContent: "center", border: "2px solid #fff",
                  }}
                >
                  <Plus size={20} color={ACCENT} />
                </div>
              ) : (
                <img src={s.avatar} style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid #fff", objectFit: "cover" }} alt={s.name} />
              )}
            </div>
            <span style={{ fontSize: 11, fontFamily: "Nunito Sans, sans-serif", color: "#374151" }}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* posts — card format for mobile, tile grid for desktop */}
      <div
        className="keep-nunito"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? "12px 14px" : "24px 32px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
          gap: isMobile ? 14 : 20,
          alignContent: "start",
        }}
      >
        {POSTS.map((post, i) => (
          <div
            key={i}
            style={{
              borderRadius: 18,
              overflow: "hidden",
              position: "relative",
              aspectRatio: isMobile ? "1 / 1.15" : "1 / 1.1",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              cursor: "pointer",
            }}
          >
            {/* full-bleed image */}
            <img
              src={post.image}
              alt="post"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* top gradient + author */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                padding: isMobile ? "12px 14px 40px" : "14px 16px 44px",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <img
                src={post.avatar}
                style={{ width: isMobile ? 34 : 38, height: isMobile ? 34 : 38, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
                alt={post.user}
              />
              <div>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: isMobile ? 13 : 14, color: "#fff", margin: 0 }}>
                  {post.user}
                </p>
                <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 11 : 12, color: "rgba(255,255,255,0.75)", margin: 0 }}>
                  {post.handle}
                </p>
              </div>
            </div>

            {/* bottom gradient + caption + actions */}
            <div
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: isMobile ? "40px 14px 14px" : "44px 16px 16px",
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: "#fff",
                  margin: "0 0 10px",
                  lineHeight: 1.45,
                }}
              >
                {post.caption}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button
                  onClick={() => {
                    const next = new Set(liked);
                    next.has(i) ? next.delete(i) : next.add(i);
                    setLiked(next);
                  }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    color: liked.has(i) ? "#f87171" : "rgba(255,255,255,0.85)",
                    fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 13 : 14,
                  }}
                >
                  <Heart size={isMobile ? 17 : 18} fill={liked.has(i) ? "#f87171" : "none"} color={liked.has(i) ? "#f87171" : "rgba(255,255,255,0.85)"} />
                  {post.likes + (liked.has(i) ? 1 : 0)}
                </button>
                <button
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    color: "rgba(255,255,255,0.85)", fontFamily: "Nunito Sans, sans-serif", fontSize: isMobile ? 13 : 14,
                  }}
                >
                  <MessageSquare size={isMobile ? 17 : 18} color="rgba(255,255,255,0.85)" />
                  {post.comments}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Share2 size={isMobile ? 17 : 18} color="rgba(255,255,255,0.85)" />
                </button>
                <div style={{ flex: 1 }} />
                <button
                  onClick={() => {
                    const next = new Set(saved);
                    next.has(i) ? next.delete(i) : next.add(i);
                    setSaved(next);
                  }}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <Bookmark size={isMobile ? 17 : 18} fill={saved.has(i) ? "#fff" : "none"} color="rgba(255,255,255,0.85)" />
                </button>
              </div>
            </div>
          </div>
        ))}
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
              СНАПУС
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

// ── Map screen ────────────────────────────────────────────────────────────────

function MapScreen() {
  const isMobile = useIsMobile();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 44.4500, lng: 34.1600 });
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt" | null>(null);

  useEffect(() => {
    // Request geolocation permission
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          setLocationPermission("granted");
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationPermission("denied");
          // Use default Crimea location if permission denied
          setMapCenter({ lat: 44.4500, lng: 34.1600 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationPermission("denied");
    }
  }, []);

  // Calculate map bounds based on center
  const bounds = {
    minLat: mapCenter.lat - 0.04,
    maxLat: mapCenter.lat + 0.04,
    minLng: mapCenter.lng - 0.04,
    maxLng: mapCenter.lng + 0.04,
  };

  // Convert lat/lng to percentage positions for pins
  const latToPercent = (lat: number) => ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
  const lngToPercent = (lng: number) => ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Permission status indicator */}
      {locationPermission === "denied" && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            background: "rgba(239, 68, 68, 0.9)",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 12,
            zIndex: 1000,
            fontSize: 14,
            fontFamily: "Nunito Sans, sans-serif",
            backdropFilter: "blur(8px)",
          }}
        >
          Геолокация отключена. Показана стандартная локация.
        </div>
      )}

      {/* map */}
      <div style={{ flex: 1, position: "relative", width: "100%", height: "100%" }}>
        <iframe
          title="map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bounds.minLng}%2C${bounds.minLat}%2C${bounds.maxLng}%2C${bounds.maxLat}&layer=mapnik`}
          style={{
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {/* teal overlay tint */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(17, 111, 95, 0.08)",
            }}
          />

          {/* pins */}
          {/* {MAP_PINS.map((pin, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${latToPercent(pin.lat)}%`,
                left: `${lngToPercent(pin.lng)}%`,
                transform: "translate(-50%, -100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: isMobile ? "3px 7px" : "4px 10px",
                  fontSize: isMobile ? 10 : 12,
                  fontFamily: "Nunito Sans, sans-serif",
                  fontWeight: 600,
                  color: "#111827",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                  marginBottom: 2,
                }}
              >
                {pin.label}
              </div>
              <MapPin size={isMobile ? 22 : 26} color={pin.color} fill={pin.color} style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
            </div>
          ))} */}

          {/* user pin */}
          {userLocation && (
            <div
              style={{
                position: "absolute",
                top: `${latToPercent(userLocation.lat)}%`,
                left: `${lngToPercent(userLocation.lng)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  width: isMobile ? 18 : 22,
                  height: isMobile ? 18 : 22,
                  borderRadius: "50%",
                  background: "#3b82f6",
                  border: "3px solid #fff",
                  boxShadow: "0 0 0 6px rgba(59,130,246,0.2)",
                }}
              />
            </div>
          )}
        </div>

        {/* top controls */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? 16 : 24,
            right: isMobile ? 12 : 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            { Icon: Navigation, label: "nav" },
            { Icon: User, label: "user" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              style={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                borderRadius: 10,
                background: "#fff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              <Icon size={isMobile ? 18 : 20} color={ACCENT} />
            </button>
          ))}
        </div>

        {/* zoom controls */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 80 : 100,
            right: isMobile ? 12 : 24,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <button
            style={{
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              background: "#fff",
              border: "none",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Plus size={isMobile ? 18 : 20} color="#374151" />
          </button>
          <button
            style={{
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              background: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Minus size={isMobile ? 18 : 20} color="#374151" />
          </button>
        </div>

        {/* search bar */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 16 : 24,
            left: isMobile ? 16 : 24,
            right: isMobile ? 64 : 80,
            background: "#fff",
            borderRadius: 12,
            padding: isMobile ? "10px 14px" : "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          }}
        >
          <Search size={isMobile ? 16 : 18} color="#9ca3af" />
          <span
            style={{
              fontFamily: "Nunito Sans, sans-serif",
              fontSize: isMobile ? 14 : 15,
              color: "#9ca3af",
            }}
          >
            Искать место...
          </span>
        </div>
      </div>
    </div>
  );
}


// ── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const isMobile = useIsMobile();

  const showNav = ["feed", "chats", "map", "profile"].includes(screen);

  const getActiveTab = (): Screen => {
    if (screen === "feed") return "feed";
    if (screen === "chats") return "chats";
    if (screen === "map") return "map";
    if (screen === "profile") return "profile";
    return "feed";
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
          {screen === "feed" && <FeedScreen />}
          {screen === "profile" && <ProfileScreen />}
          {screen === "chats" && <ChatsScreen />}
          {screen === "map" && <MapScreen />}
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
