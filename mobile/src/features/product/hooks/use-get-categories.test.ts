import { renderHook } from '@testing-library/react-native';
import { useGetCategories } from './use-get-categories';

describe('useGetCategories', () => {
  it('should return an array of categories', () => {
    const { result } = renderHook(() => useGetCategories());

    expect(result.current.categories).toEqual(['Electronics', 'Home', 'Sport', 'Food & Beverage']);
  });

  it('should return exactly 4 categories', () => {
    const { result } = renderHook(() => useGetCategories());

    expect(result.current.categories).toHaveLength(4);
  });

  it('should return stable reference on re-render', () => {
    const { result, rerender } = renderHook(() => useGetCategories());

    const firstResult = result.current.categories;
    rerender({});

    expect(result.current.categories).toBe(firstResult);
  });
});
