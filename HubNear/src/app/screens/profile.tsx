import { Activity, Camera, ChevronRight, MapPin, Settings, Trophy, type LucideIcon } from "lucide-react";
import { useIsMobile } from "../components/ui/use-mobile";
import { ACCENT, ACCENT_LIGHT, ACCENT_MUTED } from "../theme";

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

const analyticsItems: { label: string; val: string; sub: string; color: string; bg: string; Icon: LucideIcon }[] = [
  { label: "Проведённые сборы", val: "12", sub: "за всё время", color: ACCENT, bg: ACCENT_MUTED, Icon: Activity },
  { label: "Собрано участников", val: "84", sub: "в сумме", color: ACCENT_LIGHT, bg: "#e6f7f4", Icon: MapPin },
  { label: "Любимая активность", val: "Волейбол", sub: "7 сборов", color: "#6366f1", bg: "#eef2ff", Icon: Trophy },
];

export function ProfileScreen() {
  const isMobile = useIsMobile();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(160deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`, padding: isMobile ? "44px 20px 20px" : "60px 32px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative" }}>
        <div style={{ position: "absolute", top: isMobile ? 46 : 60, left: isMobile ? 20 : 32, color: "rgba(255,255,255,0.55)", fontSize: 28, lineHeight: 1, userSelect: "none", fontWeight: 300 }}>*</div>
        <div style={{ position: "absolute", top: isMobile ? 46 : 60, right: isMobile ? 20 : 32 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Settings size={isMobile ? 22 : 24} color="rgba(255,255,255,0.8)" />
          </button>
        </div>

        <div style={{ position: "relative", marginTop: 8 }}>
          <img src="https://i.pravatar.cc/150?img=5" style={{ width: isMobile ? 80 : 100, height: isMobile ? 80 : 100, borderRadius: "50%", border: "3px solid #fff", objectFit: "cover" }} alt="profile" />
          <div style={{ position: "absolute", bottom: 2, right: 2, width: 22, height: 22, borderRadius: "50%", background: ACCENT, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Camera size={11} color="#fff" />
          </div>
        </div>

        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: "#fff", margin: 0 }}>София Достоевская</h2>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.75)", margin: 0 }}>@annahanova</p>

        <div style={{ display: "flex", gap: isMobile ? 24 : 32, marginTop: 8 }}>
          {[{ label: "Друзья", val: "124" }, { label: "Публикации", val: "38" }, { label: "Места", val: "17" }].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 20, color: "#fff", margin: 0 }}>{s.val}</p>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 11 : 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: isMobile ? 0 : "24px 32px" }}>
        <Section title="Друзья" isMobile={isMobile}>
          <div style={{ display: "flex", gap: isMobile ? 16 : 20 }}>
            {FRIENDS.map((f) => (
              <div key={f.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <img src={f.avatar} style={{ width: isMobile ? 52 : 60, height: isMobile ? 52 : 60, borderRadius: "50%", objectFit: "cover", border: `2px solid ${ACCENT}` }} alt={f.name} />
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 11 : 12, color: "#374151" }}>{f.name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Любимые места" isMobile={isMobile}>
          <div style={{ display: "flex", gap: isMobile ? 10 : 16, overflowX: "auto" }}>
            {PLACES.map((p) => (
              <div key={p.name} style={{ flexShrink: 0, width: isMobile ? 110 : 130 }}>
                <img src={p.img} style={{ width: isMobile ? 110 : 130, height: isMobile ? 80 : 95, borderRadius: 10, objectFit: "cover" }} alt={p.name} />
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 11 : 12, color: "#374151", margin: "4px 0 0", textAlign: "center" }}>{p.name}</p>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ background: "#fff", margin: isMobile ? "8px 0" : "0 0 16px 0", padding: isMobile ? "14px 16px" : "20px 24px", borderRadius: isMobile ? 0 : 16 }}>
          <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, margin: "0 0 12px" }}>Аналитика</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
             {analyticsItems.map(({ label, val, sub, color, bg, Icon }) => (
              <div key={label} style={{ background: bg, borderRadius: 14, padding: isMobile ? "14px 16px" : "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: isMobile ? 46 : 52, height: isMobile ? 46 : 52, borderRadius: 12, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={isMobile ? 22 : 24} color="#fff" /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 12 : 13, color: "#6b7280", margin: 0 }}>{label}</p>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 22, margin: "1px 0 0", color: "#111827" }}>{val}</p>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 11 : 12, color: "#9ca3af", margin: "1px 0 0" }}>{sub}</p>
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

function Section({ title, isMobile, children }: { title: string; isMobile: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", margin: isMobile ? "8px 0" : "0 0 16px 0", padding: isMobile ? "14px 16px" : "20px 24px", borderRadius: isMobile ? 0 : 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isMobile ? 12 : 16 }}>
        <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, margin: 0 }}>{title}</h3>
        <button style={{ background: "none", border: "none", color: ACCENT, fontFamily: "Montserrat, sans-serif", fontSize: isMobile ? 13 : 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}>Все <ChevronRight size={14} /></button>
      </div>
      {children}
    </div>
  );
}
