    class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
    }

    export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;

        for (const ch of word) {
        if (!node.children[ch]) {
            node.children[ch] = new TrieNode();
        }

        node = node.children[ch];
        }

        node.isEnd = true;
    }

    searchPrefix(prefix) {
        let node = this.root;

        for (const ch of prefix) {
        if (!node.children[ch]) {
            return [];
        }

        node = node.children[ch];
        }

        const results = [];

        this.collectWords(
        node,
        prefix,
        results
        );

        return results.slice(0, 10);
    }

    collectWords(
        node,
        currentWord,
        results
    ) {
        if (node.isEnd) {
        results.push(currentWord);
        }

        for (const ch in node.children) {
        this.collectWords(
            node.children[ch],
            currentWord + ch,
            results
        );
        }
    }
    }