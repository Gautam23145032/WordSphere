    export default function WordCard({
    wordData,
    onWordClick,
    }) {
    const word = wordData.data[0];

    const audio =
        word.phonetics?.find(
        (p) => p.audio
        )?.audio;

    return (
        <div className="word-card">

        <div className="word-header">

            <div className="word-top-row">
            <h2 className="word-title">
                {word.word}
            </h2>

            {audio && (
                <button
                className="speaker-btn"
                onClick={() => {
                    new Audio(audio).play();
                }}
                title="Play pronunciation"
                >
                🔊
                </button>
            )}
            </div>

            <p className="word-phonetic">
            {word.phonetic}
            </p>

        </div>

        {word.meanings.map(
            (meaning, index) => (
            <div
                key={index}
                className="meaning-section"
            >
                <h3 className="part-of-speech">
                {meaning.partOfSpeech}
                </h3>

                {meaning.definitions
                .slice(0, 3)
                .map((def, i) => (
                    <div
                    key={i}
                    className="definition-card"
                    >
                    <p>
                        <strong>
                        Definition:
                        </strong>{" "}
                        {def.definition}
                    </p>

                    {def.example && (
                        <p className="example">
                        <strong>
                            Example:
                        </strong>{" "}
                        {def.example}
                        </p>
                    )}
                    </div>
                ))}

                {meaning.synonyms?.length > 0 && (
                    <div className="tag-section">
                        <strong>Synonyms</strong>

                        <div className="tag-list">
                            {[...new Set(meaning.synonyms)]
                                .slice(0, 10)
                                .map((syn, index) => (
                                    <span
                                        key={`${syn}-${index}`}
                                        className="tag synonym clickable"
                                        onClick={() => onWordClick(syn)}
                                    >
                                        {syn}
                                    </span>
                                ))}
                        </div>
                    </div>
                )}

                {meaning.antonyms?.length > 0 && (
                    <div className="tag-section">
                        <strong>Antonyms</strong>

                        <div className="tag-list">
                            {[...new Set(meaning.antonyms)]
                                .slice(0, 10)
                                .map((ant, index) => (
                                    <span
                                        key={`${ant}-${index}`}
                                        className="tag antonym clickable"
                                        onClick={() => onWordClick(ant)}
                                    >
                                        {ant}
                                    </span>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            )
        )}
        </div>
    );
    }