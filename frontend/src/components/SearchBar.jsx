    export default function SearchBar({
    query,
    setQuery,
    searchWord
    }) {

    return (
        <input
        type="text"
        value={query}
        placeholder="Search a word..."
        onChange={(e) =>
            setQuery(e.target.value)
        }
        onKeyDown={(e) => {
            if (e.key === "Enter") {
            searchWord(query);
            }
        }}
        />
        
    );
    }