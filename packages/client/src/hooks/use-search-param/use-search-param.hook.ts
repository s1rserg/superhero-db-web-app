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

      setSearchParams(newParams);
    },
    [paramName, searchParams, setSearchParams]
  );

  return [value, setValue] as const;
}
