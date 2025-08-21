import { Map } from "./map";

export class PopupObserver {
    private onNewPopup;

    private lastId;
    private observer = new MutationObserver(this.onChange.bind(this));

    constructor(onNewPopup) {
        this.onNewPopup = onNewPopup;
    }

    private onChange() {
        const popup = Map.currentPopup;

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