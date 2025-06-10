import { useEffect, useState } from "react";
import css from "./SearchBox.module.css";
import { useDebounce } from "use-debounce";

interface SearchBoxProps {
  initialValue?: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({
  initialValue = "",
  onSearch,
}: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
      value={inputValue}
    />
  );
}
