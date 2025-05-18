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
    <section className="space-y-2">
      <label htmlFor="search" className="block text-sm font-medium text-neutral-700">
        Search
      </label>

      <div className="flex items-center gap-4">
        <input
          id="search"
          type="text"
          className="w-full max-w-md rounded-md border border-neutral-300 px-4 py-2 text-sm shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none"
          value={inputValue}
          onChange={onInputChange}
        />
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Reset Search
        </button>
      </div>

      {searchTerm && (
        <p className="text-sm text-neutral-500">
          Searching for: <span className="font-medium text-neutral-700">{searchTerm}</span>
        </p>
      )}
    </section>

  );
}
