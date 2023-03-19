import { useEffect, useState } from 'react'

export const useTypingTypeout = (
  value: string,
  time: number,
  handler: Function
) => {
  const [typingTimeout, setTypingTimeout] = useState<any>(null)

  const onChange = (value: string) => {
    /* When user typing clear timeout */
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    /* When stop typing add timeout */
    setTypingTimeout(
      setTimeout(() => {
        handler(value)
      }, time)
    )
  }

  /* If value is null clear timeout */
  useEffect(() => {
    if (!value && typingTimeout) {
      clearTimeout(typingTimeout)
    }
  }, [value])

  return onChange
}
