import { createContext, useState } from "react";

export const EntriesContext = createContext({
  entries: [],
  setEntries: (entries) => {},
  addEntry: (entry) => {},
  updateEntry: (entry) => {},
  removeEntry: (id) => {},
});

function sortByDateDesc(entries) {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

function EntriesContextProvider({ children }) {
  const [entries, setEntriesState] = useState([]);

  function setEntries(newEntries) {
    setEntriesState(sortByDateDesc(newEntries));
  }

  function addEntry(entry) {
    setEntriesState((current) => sortByDateDesc([entry, ...current]));
  }

  function updateEntry(entry) {
    setEntriesState((current) =>
      sortByDateDesc(
        current.map((item) => (item.id === entry.id ? entry : item)),
      ),
    );
  }

  function removeEntry(id) {
    setEntriesState((current) => current.filter((item) => item.id !== id));
  }

  const value = {
    entries,
    setEntries,
    addEntry,
    updateEntry,
    removeEntry,
  };

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  );
}

export default EntriesContextProvider;
