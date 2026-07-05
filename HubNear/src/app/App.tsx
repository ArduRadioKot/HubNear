import { useCallback, useMemo, useState } from "react";
import { useIsMobile } from "./components/ui/use-mobile";
import { BottomNav, SidebarNav } from "./components/navigation";
import { EVENTS } from "./data/events";
import { INITIAL_CHATS, INITIAL_MESSAGES, createEventChat, createEventWelcomeMessage } from "./data/chats";
import { INITIAL_NOTIFICATIONS, createDeadlineNotification, createQuorumNotification } from "./data/notifications";
import { WelcomeScreen } from "./screens/welcome";
import { AuthScreen } from "./screens/auth-form";
import { ChatsScreen } from "./screens/chats";
import { CreateEventScreen, FeedScreen } from "./screens/feed";
import { NotificationsScreen } from "./screens/notifications";
import { ProfileScreen } from "./screens/profile";
import { SettingsScreen } from "./screens/settings";
import { EditProfileScreen } from "./screens/edit-profile";
import { ChangePasswordScreen } from "./screens/change-password";
import { VisitedEventsScreen } from "./screens/visited";
import type { ChatItem, Event, Message, NotificationItem, Place, Screen, UserProfile } from "./types";

const INITIAL_PLACES: Place[] = [
  { id: "p1", name: "Красный камень", img: "https://picsum.photos/seed/place1/200/150" },
  { id: "p2", name: "Гурзуф", img: "https://picsum.photos/seed/place2/200/150" },
  { id: "p3", name: "Краснокаменка", img: "https://picsum.photos/seed/place3/200/150" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [chats, setChats] = useState<ChatItem[]>(INITIAL_CHATS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [myPlaces, setMyPlaces] = useState<Place[]>(INITIAL_PLACES);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "София Достоевская",
    username: "annahanova",
    avatar: "https://i.pravatar.cc/150?img=5",
  });
  const [joinedEventIds, setJoinedEventIds] = useState<Set<string>>(new Set());
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

  const handleJoinEvent = useCallback((event: Event) => {
    const chatId = `event-${event.id}`;
    setChats((prev) => {
      if (prev.some((c) => c.id === chatId)) return prev;
      return [...prev, createEventChat(event)];
    });
    setMessages((prev) => [...prev, createEventWelcomeMessage(event)]);

    setJoinedEventIds((prev) => new Set(prev).add(event.id));

    const newCurrent = event.current + 1;
    if (newCurrent >= event.needed) {
      setNotifications((prev) => [...prev, createQuorumNotification(event.activity)]);
    }
  }, []);

  const handleLeaveEvent = useCallback((eventId: string) => {
    setJoinedEventIds((prev) => {
      const next = new Set(prev);
      next.delete(eventId);
      return next;
    });
  }, []);

  const handleSendMessage = useCallback((chatId: string, text: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      fromMe: true,
      text,
      time,
    };
    setMessages((prev) => [...prev, newMsg]);
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, last: text, time, unread: 0 } : c,
      ),
    );
  }, []);

  const handleMarkNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const handleMarkAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const handleAddPlace = useCallback((place: Place) => {
    setMyPlaces((prev) => [...prev, place]);
  }, []);

  const handleRemovePlace = useCallback((id: string) => {
    setMyPlaces((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleUpdateProfile = useCallback((p: UserProfile) => {
    setUserProfile(p);
  }, []);

  const unreadNotifications = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

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
          onJoinEvent={handleJoinEvent}
          onLeaveEvent={handleLeaveEvent}
          unreadNotifications={unreadNotifications}
          onNotificationsClick={() => setScreen("notifications")}
          userName={userProfile.name}
        />
      )}
      {screen === "profile" && (
        <ProfileScreen
          onNavigate={setScreen}
          myPlaces={myPlaces}
          onAddPlace={handleAddPlace}
          onRemovePlace={handleRemovePlace}
          profile={userProfile}
          events={events}
          joinedEventIds={joinedEventIds}
        />
      )}
      {screen === "visited" && (
        <VisitedEventsScreen
          events={events}
          joinedEventIds={joinedEventIds}
          onNavigate={setScreen}
        />
      )}
      {screen === "chats" && (
        <ChatsScreen
          chats={chats}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      )}
      {screen === "create" && (
        <CreateEventScreen onNavigate={setScreen} onCreate={handleCreateEvent} />
      )}
      {screen === "settings" && <SettingsScreen onNavigate={setScreen} />}
      {screen === "notifications" && (
        <NotificationsScreen
          notifications={notifications}
          onMarkRead={handleMarkNotificationRead}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onNavigate={setScreen}
        />
      )}
      {screen === "edit-profile" && (
        <EditProfileScreen
          profile={userProfile}
          onSave={handleUpdateProfile}
          onNavigate={setScreen}
        />
      )}
      {screen === "change-password" && (
        <ChangePasswordScreen onNavigate={setScreen} />
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
