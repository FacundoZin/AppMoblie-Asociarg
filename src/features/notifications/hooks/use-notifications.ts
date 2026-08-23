import { useCallback, useEffect, useState } from 'react';
import { Notification } from '../types';
import { mockNotifications } from '../mocks/notifications.mock';

interface UseNotificationsReturn {
  data: Notification[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Data-access hook for member notifications. Mock-backed during the prototype
 * phase; the shape (data/loading/error/refresh) is ready for a real backend.
 */
export function useNotifications(): UseNotificationsReturn {
  const [data, setData] = useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Prototype phase: mock data resolves synchronously.
    setData(mockNotifications);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, isLoading, error, refresh };
}