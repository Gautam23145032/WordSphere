    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import "../styles/app.css";

    import SearchBar from "../components/SearchBar";
    import SuggestionList from "../components/SuggestionList";
    import TrendingWords from "../components/TrendingWords";
    import WordCard from "../components/WordCard";

    import useDebounce from "../hooks/useDebounce";

    import { getVapidPublicKey, saveSubscription } from "../services/notificationApi";
    import urlBase64ToUint8Array from "../utils/urlBase64ToUint8Array";

    import {
        fetchSuggestions,
        fetchWord,
        fetchTrendingWords,
    } from "../services/dictionaryApi";

    import { useSearchParams } from "react-router-dom";

function Home() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [wordData, setWordData] = useState(null);
    const [trendingWords, setTrendingWords] = useState([]);
    const [error, setError] = useState("");
    const debouncedQuery = useDebounce(query, 300);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        async function loadSuggestions() {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const data = await fetchSuggestions(
            debouncedQuery
            );

            setSuggestions(data);
        } catch (error) {
            console.log(error);
        }
        }

        loadSuggestions();
    }, [debouncedQuery]);

    useEffect(() => {
        async function loadTrending() {
        try {
            const data =
            await fetchTrendingWords();

            setTrendingWords(data);
        } catch (error) {
            console.log(error);
        }
        }

        loadTrending();
    }, []);

    async function subscribeToNotifications() {

        const permission =
            await Notification.requestPermission();

        console.log(permission);
        const registration =
            await navigator.serviceWorker.ready;

        
        const publicKey =
            await getVapidPublicKey();

        const convertedKey =
            urlBase64ToUint8Array(publicKey);

        const subscription =
            await registration.pushManager.subscribe({

                userVisibleOnly: true,

                applicationServerKey:
                    convertedKey

            });

        await saveSubscription(
            subscription.toJSON()
        );

        console.log(
            "Subscription Saved"
        );
    }

    async function searchWord(word) {
        if (!word.trim()) return;

        try {
        setError("");
        const data = await fetchWord(word);

        setWordData(data);
        setSuggestions([]);

        const trending =
            await fetchTrendingWords();

        setTrendingWords(trending);
        } catch (error) {
        setWordData(null);
        setSuggestions([]);
        console.log(error);
        setError(
            error.response?.data?.message ||
            "something went wrong"
        );
        }
    }
    useEffect(() => {

        const word = searchParams.get("word");

        if (!word) return;

        async function loadWord() {

            setQuery(word);

            await searchWord(word);

            navigate("/", {
                replace: true
            });

        }

        loadWord();

    }, [searchParams, navigate]);

    return (
        <div className="app">
            <button
            className="logout-btn"
            onClick={() => {

                localStorage.removeItem("token");

                navigate("/login");

            }}
        >
            Logout
        </button>
        <div className="notifyMe">
            
            <button
                className="notifyButton"
                onClick={subscribeToNotifications}
            >
                Notify Me
            </button>
            <h5>wants to get daily notification?</h5>
        </div>
        


        <h1 className="title">WordSphere</h1>
        
        <div className="main-card">
            <div className="search-wrapper">
            <SearchBar
                query={query}
                setQuery={setQuery}
                searchWord={searchWord}
            />

            <button
                className="search-button"
                onClick={() => {
                searchWord(query);
                setSuggestions([]);
                }}
            >
                Search
            </button>
            </div>

            {suggestions.length > 0 && (
            <SuggestionList
                suggestions={suggestions}
                onSelect={(word) => {
                setQuery(word);
                searchWord(word);
                setSuggestions([]);
                }}
            />
            )}
            {error && (
            <div className="error-box">
                {error}
            </div>
            )}
            {wordData && (
            <WordCard
                wordData={wordData}
                onWordClick={(word) => {
                setQuery(word);
                searchWord(word);
                setSuggestions([]);
                }}
            />
            )}
        </div>

        <div className="trending-card">

            <TrendingWords
            words={trendingWords.slice(0, 5)}
            onSelect={(word) => {
                setQuery(word);
                searchWord(word);
            }}
            />
        </div>
        </div>
    );
    
    }

    export default Home;