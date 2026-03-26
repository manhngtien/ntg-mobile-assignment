import { useMemo } from 'react';

export const useGetCategories = () => {
  const categories = useMemo(() => ['Electronics', 'Home', 'Sport', 'Food & Beverage'], []);

  return { categories };
};
