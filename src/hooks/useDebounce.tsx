import { useEffect, useState } from 'react';

function useDebounce(value: any, delay = 300) {
  const [debounceValue, setValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(value);
    }, delay);

    return () => {
      return clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
