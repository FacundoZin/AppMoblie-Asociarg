import { useCallback, useEffect, useState } from 'react';
import { Payment } from '../types';
import { mockPayments } from '../mocks/payments.mock';

interface UsePaymentsReturn {
  data: Payment[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Data-access hook for member payments. Mock-backed during the prototype phase;
 * the shape (data/loading/error/refresh) is ready for a real backend.
 */
export function usePayments(): UsePaymentsReturn {
  const [data, setData] = useState<Payment[]>(mockPayments);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Prototype phase: mock data resolves synchronously.
    setData(mockPayments);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, isLoading, error, refresh };
}