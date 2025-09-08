import { PopupObserver } from "./popup-observer";
import { LoadingScreen } from "./loading";

const SCAN_INTERVAL_MS = 250;

export class MarkerIdScanner {
    private markersById = {};

    private loading = new LoadingScreen();
    private observer = new PopupObserver(this.onNewPopup.bind(this));

    private labelMarkersTodo() {
        const markers = document.querySelectorAll(".leaflet-marker-pane button");
        this.loading.setTotal(markers.length);
        for (const marker of markers) {
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
                    this.loading.setProgress(Object.keys(this.markersById).length)
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, SCAN_INTERVAL_MS);
        })
    }

    private scan() {
        this.loading.show();
        this.labelMarkersTodo();
        this.observer.observe();

        return this.clickAllMarkers().then(() => {
            this.observer.disconnect();
            (document.querySelector("#leaflet-map") as HTMLElement).click();
            this.loading.delete();
            return this.markersById;
        });
    }

    static getMarkerIds() {
        return (new MarkerIdScanner()).scan();
    }
}