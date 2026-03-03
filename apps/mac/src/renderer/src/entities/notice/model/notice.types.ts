export type NoticeCategory =
  | "APPLY_RIVAL"
  | "ACCEPT_RIVAL"
  | "REJECT_RIVAL"
  | "APPLY_BATTLE"
  | "ACCEPT_BATTLE"
  | "REJECT_BATTLE"
  | "SHOW_ACCEPT_RIVAL"
  | "SHOW_REJECT_RIVAL"
  | "SHOW_ACCEPT_BATTLE"
  | "SHOW_REJECT_BATTLE"
  | "GLOBAL_NOTICE";

export interface NoticeItem {
  id: number;
  category: NoticeCategory;
  message: string;
  requiresAction: boolean;
  isRead: boolean;
  senderId: number;
  senderName: string | null;
  senderUsername: string | null;
  senderProfileImage: string | null;
  receiverId: number;
  receiverName: string | null;
  receiverUsername: string | null;
  receiverProfileImage: string | null;
  rivalId: number | null;
  battleId: number | null;
  createdAt: string | null;
}

export interface MyUserNoticesResponse {
  notices: NoticeItem[];
}
