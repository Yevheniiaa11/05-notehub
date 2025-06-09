import { useState } from "react";
import { NoteList } from "../NoteList/NoteList";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import type { NoteResponse } from "../../types/note";
import Modal from "../NoteModal/NoteModal";
import { NoteForm } from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const trimmedSearch = searchQuery.trim();

  const { data, isLoading, error } = useQuery<NoteResponse, Error>({
    queryKey: ["notes", trimmedSearch, currentPage],
    queryFn: () => {
      console.log(
        "Fetching notes with search:",
        trimmedSearch,
        "page:",
        currentPage
      );
      return fetchNotes(trimmedSearch, currentPage);
    },
  });
  console.log("Query data:", data);
  console.log("Query error:", error);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {!isLoading && data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
