    function TrendingWords({
    words,
    onSelect,
    }) {
    return (
        <div>
        <h3>Trending Words ⚡</h3>

        <ul>
            {words.map((word) => (
            <li
                key={word}
                className = "trending-word"
                onClick={() => onSelect(word)}
                style={{
                cursor: "pointer",
                }}
            >
                {word}
            </li>
            ))}
        </ul>
        </div>
    );
    }

    export default TrendingWords;