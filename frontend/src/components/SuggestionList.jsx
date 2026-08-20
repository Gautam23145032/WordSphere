    export default function SuggestionList({
    suggestions,
    onSelect,
    }) {
    if (suggestions.length === 0) {
        return null;
    }

    return (
        <ul className="suggestions">
        {suggestions.map((word) => (
            <li
            key={word}
            onClick={() => onSelect(word)}
            >
            {word}
            </li>
        ))}
        </ul>
    );
    }