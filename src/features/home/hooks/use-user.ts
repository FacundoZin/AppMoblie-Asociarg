import { useCallback, useEffect, useState } from 'react';
import { User } from '../types';
import { mockUser } from '../mocks/user.mock';

interface UseUserReturn {
  data: User;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Data-access hook for the current member. Mock-backed during the prototype
 * phase; the shape (data/loading/error/refresh) is ready for a real backend.
 */
export function useUser(): UseUserReturn {
  const [data, setData] = useState<User>(mockUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Prototype phase: mock data resolves synchronously.
    setData(mockUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, isLoading, error, refresh };
}