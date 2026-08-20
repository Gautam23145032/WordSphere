import axios from "axios";

export async function getWordFromAPI(word) {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("WORD_NOT_FOUND");
    }

    throw new Error("DICTIONARY_API_ERROR");
  }
}