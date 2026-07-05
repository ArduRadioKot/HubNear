import { useState } from "react";
import { useIsMobile } from "./components/ui/use-mobile";
import { BottomNav, SidebarNav } from "./components/navigation";
import { EVENTS } from "./data/events";
import { WelcomeScreen } from "./screens/welcome";
import { AuthScreen } from "./screens/auth-form";
import { ChatsScreen } from "./screens/chats";
import { CreateEventScreen, FeedScreen } from "./screens/feed";
import { ProfileScreen } from "./screens/profile";
import type { Event, Screen } from "./types";

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
    setEvents((prev) => [newEvent, ...prev]);
  };

  const mainContent = (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      {screen === "welcome" && <WelcomeScreen onNavigate={setScreen} />}
      {screen === "register" && (
        <AuthScreen mode="register" onNavigate={setScreen} />
      )}
      {screen === "login" && <AuthScreen mode="login" onNavigate={setScreen} />}
      {screen === "feed" && (
        <FeedScreen
          events={events}
          onEventsChange={setEvents}
          onCreateClick={() => setScreen("create")}
        />
      )}
      {screen === "profile" && <ProfileScreen />}
      {screen === "chats" && <ChatsScreen />}
      {screen === "create" && (
        <CreateEventScreen onNavigate={setScreen} onCreate={handleCreateEvent} />
      )}
    </div>
  );

  return (
    <div
      className="app-shell"
      style={{
        fontFamily: "Montserrat, sans-serif",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {showNav && !isMobile ? (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <SidebarNav active={getActiveTab()} onNavigate={setScreen} />
          {mainContent}
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
          {mainContent}
        </div>
      )}

      {showNav && isMobile && (
        <BottomNav active={getActiveTab()} onNavigate={setScreen} />
      )}
    </div>
  );
}
