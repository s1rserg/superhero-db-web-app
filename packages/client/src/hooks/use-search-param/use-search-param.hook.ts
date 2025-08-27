import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useSearchParam(paramName: string, defaultValue = '') {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(paramName) || defaultValue;

  const setValue = useCallback(
    (newValue: string) => {
      const newParams = new URLSearchParams(searchParams);
      if (newValue) {
        newParams.set(paramName, newValue);
      } else {
        newParams.delete(paramName);
      }
      if (newParams.has('page')) newParams.set('page', '1');
      setSearchParams(newParams);
    },
    [paramName, searchParams, setSearchParams]
  );

  return [value, setValue] as const;
}
