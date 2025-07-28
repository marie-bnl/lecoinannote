const storage = browser.storage.local;

export class AnnotationData {
    static async load(id) {
        return (await storage.get(id))[id] || { color: "#ffffff", content: "" };
    }

    static async save(id, color, content) {
        storage.set({ [id]: { color, content } });
    }
}