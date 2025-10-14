export type Section = "map" | "cameras" | "friends" | "routes" | "assistant" | "profile";

export interface Friend {
  id: string;
  name: string;
  phone: string;
  status: "онлайн" | "офлайн";
  location: string;
}

export interface Profile {
  name: string;
  email: string;
  initials: string;
  friends: Friend[];
}
