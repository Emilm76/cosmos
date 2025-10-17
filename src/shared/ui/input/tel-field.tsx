'use client'
import { ChangeEvent, InputHTMLAttributes } from 'react'
import { TextField } from './text-field'

export function TelField({
  className,
  error,
  inputProps = {},
}: {
  className?: string
  error?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}) {
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.startsWith('7')) {
      value = value.slice(1)
    }
    value = value.substring(0, 10)

    let formatted = ''
    if (value.length > 0) {
      formatted += '+7' + ' (' + value.substring(0, 3)
    }
    if (value.length >= 4) formatted += ') ' + value.substring(3, 6)
    if (value.length >= 7) formatted += '-' + value.substring(6, 8)
    if (value.length >= 9) formatted += '-' + value.substring(8, 10)

    e.target.value = formatted
  }

  return (
    <TextField
      className={className}
      error={error}
      inputProps={{
        ...inputProps,
        onInput: handleInput,
      }}
    />
  )
}
