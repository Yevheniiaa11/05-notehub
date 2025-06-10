import { useState } from "react";
import { NoteList } from "../NoteList/NoteList";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import { NoteForm } from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoteModal from "../NoteModal/NoteModal";
import { useDebounce } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const trimmedSearch = debouncedSearch.trim();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["notes", trimmedSearch, currentPage],
    queryFn: () => fetchNotes(trimmedSearch, currentPage),
    placeholderData: (prevData) => prevData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox initialValue={searchQuery} onSearch={setSearchQuery} />
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
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && isFetching && <Loader />}
      {error && <ErrorMessage />}
      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </NoteModal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
