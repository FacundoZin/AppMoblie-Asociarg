export interface ChatMessage {
  id: string;
  text: string;
  /** ISO timestamp (YYYY-MM-DDTHH:mm:ss.sssZ); formatted at render time. */
  sentAt: string;
  author: 'user' | 'club';
}

export interface ClubContact {
  name: string;
  role: string;
}
