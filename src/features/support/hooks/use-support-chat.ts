import { useCallback, useEffect, useRef, useState } from 'react';
import { MOCK_CLUB_CONTACT, MOCK_SEED_MESSAGES } from '../mocks/support-chat.mock';
import type { ChatMessage, ClubContact } from '../types';

/** How long the club "types" before the canned reply lands. */
const CLUB_REPLY_DELAY_MS = 1400;

// Prototype phase: canned replies rotate in order so repeated sends feel
// varied without any backend involvement.
const CANNED_CLUB_REPLIES = [
  'Gracias por tu mensaje. Un asesor va a revisar tu consulta y te responde a la brevedad.',
  'Quedó registrada tu consulta. Si podés, contanos un poco más para agilizar la respuesta.',
  'Estamos revisando tu caso. Te vamos a avisar apenas tengamos novedades.',
];

// Module-level counter guarantees unique IDs across remounts without
// pulling in a uuid dependency.
let messageIdCounter = 0;

function createMessage(text: string, author: ChatMessage['author']): ChatMessage {
  messageIdCounter += 1;
  return {
    id: `support-message-${messageIdCounter}`,
    text,
    sentAt: new Date().toISOString(),
    author,
  };
}

interface UseSupportChatReturn {
  messages: ChatMessage[];
  contact: ClubContact;
  sendMessage: (text: string) => void;
  isClubTyping: boolean;
}

/**
 * Local-state chat store for the support prototype. Sending a message appends
 * it immediately, shows the typing indicator, and lands a canned club reply
 * after a short delay. The pending timeout is cleared on unmount.
 */
export function useSupportChat(): UseSupportChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_SEED_MESSAGES);
  const [isClubTyping, setIsClubTyping] = useState(false);
  const replyIndexRef = useRef(0);

  useEffect(() => {
    if (!isClubTyping) {
      return;
    }
    const timer = setTimeout(() => {
      const reply = CANNED_CLUB_REPLIES[replyIndexRef.current % CANNED_CLUB_REPLIES.length];
      replyIndexRef.current += 1;
      setMessages((previous) => [...previous, createMessage(reply, 'club')]);
      setIsClubTyping(false);
    }, CLUB_REPLY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isClubTyping]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    setMessages((previous) => [...previous, createMessage(trimmed, 'user')]);
    setIsClubTyping(true);
  }, []);

  return { messages, contact: MOCK_CLUB_CONTACT, sendMessage, isClubTyping };
}
