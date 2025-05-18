"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocate";
import AdvocatesTable from "./components/AdvocatesTable";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const res = await fetch("/api/advocates");

        if (!res.ok) {
          throw new Error(`Error fetching advocates: ${res.status}`);
        }

        const json = await res.json();
        setAdvocates(json.data);
        setFilteredAdvocates(json.data);
        setError(null);
      } catch (err: any) {
        setError("Failed to load advocate data. Please try again later.");
      }
    };

    fetchAdvocates();
  }, []);



  const handleSearchInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const term = inputValue.toLowerCase();
      setSearchTerm(term);

      if (term === '') {
        setFilteredAdvocates(advocates);
        return;
      }

      const filtered = advocates.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(term) ||
          advocate.lastName.toLowerCase().includes(term) ||
          advocate.city.toLowerCase().includes(term) ||
          advocate.degree.toLowerCase().includes(term) ||
          advocate.specialties.some((s) => s.toLowerCase().includes(term)) ||
          advocate.yearsOfExperience.toString().includes(term)
        );
      });

      setFilteredAdvocates(filtered);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, advocates]);

  const handleSearchReset = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm('');
    setInputValue('');
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-neutral-800">Solace Advocates</h1>
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-md">
          {error}
        </div>
      )}
      <SearchBar
        inputValue={inputValue}
        searchTerm={searchTerm}
        onInputChange={handleSearchInputChange}
        onReset={handleSearchReset}
      />
      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
