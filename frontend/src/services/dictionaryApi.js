    import axiosInstance from "./axiosInstance";

    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    export async function fetchSuggestions(query) {
    const res = await axiosInstance.get(
        `${BASE_URL}/api/suggestions?q=${query}`
    );

    return res.data;
    }

export async function fetchWord(word) {
    try{
        const res = await axiosInstance.get(
        `${BASE_URL}/api/words/${word}`
    );

    return res.data;
    }
    catch(error){
        throw error;
    }
    
}

    export async function fetchTrendingWords() {
    const res = await axiosInstance.get(
        `${BASE_URL}/api/trending`
    );

    return res.data;
    }