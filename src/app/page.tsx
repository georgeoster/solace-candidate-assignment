"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocate";
import AdvocatesTable from "./components/AdvocatesTable";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
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
