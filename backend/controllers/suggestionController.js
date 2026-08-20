    import trie from "../services/trieService.js";

    export async function getSuggestions(
        req,
        res
        ) {
        try {

            const { q } = req.query;

            if (!q) {
                return res.json([]);
            }

            const suggestions =
                trie.searchPrefix(
                    q.toLowerCase()
                );

            return res.json(
                suggestions
            );

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }
    }