export interface AnnouncementItem {
  id: number;
  title: string;
  author: string;
  userId: number | null;
  content: string;
  startedAt: string | null;
  endedAt: string | null;
}

export interface ActiveAnnouncementsResponse {
  announcements: AnnouncementItem[];
}
