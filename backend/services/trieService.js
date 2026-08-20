
    import { Trie } from "./trie.js";

    const trie = new Trie();

    import fs from "fs";
    import path from "path";
    import { fileURLToPath } from "url";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(
        __dirname,
        "../data/words.txt"
    );


    const fileContent = fs.readFileSync(
        filePath,
        "utf-8"
    );

    const words = fileContent
        .split("\n")
        .map(word => word.trim().toLowerCase())
        .filter(Boolean);

    for (const word of words) {
        trie.insert(word);
    }

    console.log(
        `Loaded ${words.length} words into Trie`
    );

    export {words};
    export default trie;

