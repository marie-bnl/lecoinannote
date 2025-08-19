export class PopupObserver {
    private lastId;
    private onNewPopup;

    private observer = new MutationObserver(this.onChange.bind(this));

    constructor(onNewPopup) {
        this.onNewPopup = onNewPopup;
    }

    getCurrentPopup() {
        const article = document.querySelector("article[data-test-id='map-ad-card']");
        const id = article?.querySelector("a")?.href.split("/").slice(-1)[0];

        if (!id)
            return;

        return { id, article };
    }

    private onChange() {
        const popup = this.getCurrentPopup();

        if (!popup) {
            this.lastId = null;
            return;
        }

        if (popup.id == this.lastId) {
            return;
        }

        this.lastId = popup.id;
        this.onNewPopup(popup);
    }

    observe() {
        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    disconnect() {
        this.observer.disconnect();
    }
}