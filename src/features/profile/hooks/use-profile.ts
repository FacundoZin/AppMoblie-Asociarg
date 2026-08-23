import { useCallback, useEffect, useState } from 'react';
import { Profile } from '../types';
import { mockProfile, mockStats } from '../mocks/profile.mock';

interface UseProfileReturn {
  data: Profile;
  stats: typeof mockStats;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Data-access hook for the member profile and its summary stats.
 * Mock-backed during the prototype phase; the shape (data/loading/error/refresh)
 * is ready for a real backend.
 */
export function useProfile(): UseProfileReturn {
  const [data, setData] = useState<Profile>(mockProfile);
  const [stats, setStats] = useState<typeof mockStats>(mockStats);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Prototype phase: mock data resolves synchronously.
    setData(mockProfile);
    setStats(mockStats);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, stats, isLoading, error, refresh };
}