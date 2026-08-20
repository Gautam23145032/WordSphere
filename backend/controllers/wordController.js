import client from "../config/redis.js";
import { getWordFromAPI } from "../services/dictionaryService.js";
export async function searchWord(req, res) {
try {
    const { word } = req.params;
    const normalizedWord = word.toLowerCase().trim();
    const cacheKey = `word:${normalizedWord}`;

    const cachedData = await client.get(cacheKey);

    if (cachedData) {
        console.log("CACHE HIT");
        await client.zIncrBy(
            "trending_words",
            1,
            normalizedWord
        );
        return res.json({
            source: "redis",
            data: JSON.parse(cachedData),
        });
    }

    console.log("CACHE MISS");

    const data = await getWordFromAPI(word);

    await client.set(
        cacheKey,
        JSON.stringify(data),
        {
            EX: 86400,
        }
    );
    await client.zIncrBy(
        "trending_words",
        1,
        normalizedWord
    );
    return res.json({
        source: "api",
        data,
    });

} catch (error) {

    if (error.message === "WORD_NOT_FOUND") {
        return res.status(404).json({
            success: false,
            message: "Word not found",
        });
    }

    return res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
    }
}