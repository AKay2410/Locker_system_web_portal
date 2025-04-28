
export type AccessLogType = {
  id: string;
  compartmentId: string;
  compartmentName: string;
  action: "locked" | "unlocked";
  timestamp: Date;
  username: string;
};
