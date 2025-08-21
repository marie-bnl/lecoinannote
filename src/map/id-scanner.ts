import { PopupObserver } from "./popup-observer";

const SCAN_INTERVAL_MS = 250;

export class MarkerIdScanner {
    private markersById = {};

    private observer = new PopupObserver(this.onNewPopup.bind(this));

    private labelMarkersTodo() {
        for (const marker of document.querySelectorAll(".leaflet-marker-pane button")) {
            marker.setAttribute("data-lca-todo", "1");
        }
    }

    private getActiveMarkerBtn() {
        return document.querySelector(".leaflet-marker-pane .bg-support");
    }

    private onNewPopup(popup) {
        const btn = this.getActiveMarkerBtn()!;
        this.markersById[popup.id] = btn;
        btn.removeAttribute("data-lca-todo");
    }

    private clickAllMarkers() {
        return new Promise<void>((resolve) => {
            let marker;
            const interval = setInterval(() => {
                if (marker = document.querySelector("[data-lca-todo]")) {
                    marker.click();
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, SCAN_INTERVAL_MS);
        })
    }

    private scan() {
        this.labelMarkersTodo();
        this.observer.observe();

        return this.clickAllMarkers().then(() => {
            this.observer.disconnect();
            (document.querySelector("#leaflet-map") as HTMLElement).click();
            return this.markersById;
        });
    }

    static getMarkerIds() {
        return (new MarkerIdScanner()).scan();
    }
}