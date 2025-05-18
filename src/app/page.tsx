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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar
        inputValue={inputValue}
        searchTerm={searchTerm}
        onInputChange={handleSearchInputChange}
        onReset={handleSearchReset}
      />
      <br />
      <br />
      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
