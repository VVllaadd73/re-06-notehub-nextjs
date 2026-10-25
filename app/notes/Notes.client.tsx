// app/notes/Notes.client.tsx

"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './Notes.module.css';

import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from '@/components/NoteForm/NoteForm';

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearchQuery = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    300
  );

  const { data, isLoading, isError, } = useQuery({
    queryKey: ['notes', searchQuery, currentPage],
    queryFn: async () => fetchNotes({ page: currentPage, searchQuery: searchQuery }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? data.totalPages : 1;
  const notes = data ? data.notes : [];

if (isLoading) {
  return (
    <div style={{ background: "blue", color: "white", padding: 30 }}>
      <h1>СПРАЦЮВАВ isLoading</h1>
    </div>
  );
}

  if (isError) {
    return <p>Помилка при завантаженні нотаток</p>;
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <div className={css.listHeader}>

        <SearchBox onChange={updateSearchQuery} />

        {totalPages > 1 && (<Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />)}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {data && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}

    </div>
  )
}

