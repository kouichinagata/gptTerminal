import { useEffect, RefObject } from 'react';
import { Message } from '../types';

export function useChatScroll(
  ref: RefObject<HTMLDivElement>,
  messages: Message[]
) {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, ref]);
}