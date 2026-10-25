// lib/api.ts

import type { OrderFormValues } from '../types/note'
import type { Note, Notes, FetchProps } from '../types/note'
import axios from 'axios'

// const dataURL = () => {
//   const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
//   return { token }
// }

// const baseURL = () => {
//   return 'https://notehub-public.goit.study/api/notes'
// };

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    }
  });
  return response.data;
}

export async function fetchNotes({ page, searchQuery }: FetchProps): Promise<Notes> {
  const response = await axios.get<Notes>(`/notes`, {
    params: {
      page,
      ...(searchQuery && { search: searchQuery }),
      perPage: 12
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    }
  });

  return response.data;
}

export async function createNote(note: OrderFormValues) {
  const response = await axios.post<Note>(`/notes`, note, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  );
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await axios.delete(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  return response.data;
}
