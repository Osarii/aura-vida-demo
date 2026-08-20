import { useEffect, useState } from 'react'

export function useLocalStorageState<T>(
  loader: () => T,
  saver: (value: T) => void,
) {
  const [value, setValue] = useState<T>(() => loader())

  useEffect(() => {
    saver(value)
  }, [value, saver])

  return [value, setValue] as const
}
