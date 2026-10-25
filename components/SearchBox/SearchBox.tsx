// src/components/SearchBox/SearchBox.tsx

import css from './SearchBox.module.css'

type SearchProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange }: SearchProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onChange}
    />
  )
}
