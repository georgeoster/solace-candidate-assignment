interface SearchBarProps {
  inputValue: string;
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<any>) => void;
  onReset: () => void;
}

export default function SearchBar({
  inputValue,
  searchTerm,
  onInputChange,
  onReset,
}: SearchBarProps) {
  return (
    <div>
      <p>Search</p>
      <p>Searching for: {searchTerm}</p>
      <input
        style={{ border: "1px solid black" }}
        value={inputValue}
        onChange={onInputChange}
      />
      <button onClick={onReset}>Reset Search</button>
    </div>
  );
}
