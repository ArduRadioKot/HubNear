export type Screen =
  | "welcome"
  | "register"
  | "login"
  | "feed"
  | "profile"
  | "chats"
  | "create"
  | "settings";

export type Event = {
  id: string;
  activity: string;
  category: string;
  time: string;
  location: string;
  needed: number;
  current: number;
  level: string;
  deadline: string;
  deadlineTime?: number;
  organizer: string;
  avatar: string;
  confirmed: boolean;
  image?: string;
  distance?: number;
};

export type ChatItem = {
  id: string;
  name: string;
  avatar: string;
  last: string;
  time: string;
  unread: number;
  group: boolean;
  eventId?: string;
};

export type Message = {
  id: string;
  chatId: string;
  fromMe: boolean;
  text: string;
  time: string;
};
