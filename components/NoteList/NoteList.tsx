// components/NoteList/NoteList.tsx

import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api'
import type { Note } from '@/types/note'
import css from './NoteList.module.css'

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const clickHandler = async (noteId: string) => {
    await deleteNote(noteId);

    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.footer}>
              <Link href={`/notes/${note.id}`} className={css.viewButton}>
                View details
              </Link>
              <button className={css.button} onClick={() => clickHandler(note.id)}>
                Delete
              </button>
            </div>
          </div>
        </li>
      ))
      }
    </ul>
  )
}
