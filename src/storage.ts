const storage = browser.storage.local;

class TData { color; text; }

export class Storage {
    static get(id) {
        return new Promise<TData>((resolve) => {
            storage.get(id).then(data => {
                resolve(data[id] ?? { color: "#000000", text: "" });
            });
        });
    }

    static getAll() {
        return storage.get();
    }

    static set(id, color, text) {
        storage.set({ [id]: { color, text } });
    }

    static addListener(callback) {
        storage.onChanged.addListener(callback);
    }
}