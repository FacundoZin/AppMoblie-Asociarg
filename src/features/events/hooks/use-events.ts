import { useCallback, useEffect, useState } from 'react';
import { Event } from '../types';
import { mockEvents } from '../mocks/events.mock';

interface UseEventsReturn {
  data: Event[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Data-access hook for club events. Mock-backed during the prototype phase;
 * the shape (data/loading/error/refresh) is ready for a real backend.
 */
export function useEvents(): UseEventsReturn {
  const [data, setData] = useState<Event[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Prototype phase: mock data resolves synchronously.
    setData(mockEvents);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, isLoading, error, refresh };
}