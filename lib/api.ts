// lib/api.ts

import type { OrderFormValues } from '../types/note'
import type { Note, Notes, FetchProps } from '../types/note'
import axios from 'axios'

const dataURL = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  return { token }
}

const baseURL = () => {
  return 'https://notehub-public.goit.study/api/notes'
};

export async function fetchNoteById(id: string): Promise<Note> {
  const { token } = dataURL();
  const response = await axios.get<Note>(`${baseURL()}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

export async function fetchNotes({ page, searchQuery }: FetchProps): Promise<Notes> {

  const { token } = dataURL();
  const response = await axios.get<Notes>(`${baseURL()}`, {
    params: {
      page,
      ...(searchQuery && { search: searchQuery }),
      perPage: 12
    },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}

export async function createNote(note: OrderFormValues) {
  const { token } = dataURL();
  const response = await axios.post<Note>(`${baseURL()}`, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  return response.data;
}

export async function deleteNote(id: string) {
  const { token } = dataURL();
  const response = await axios.delete(
    `${baseURL()}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
