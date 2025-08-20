import { Storage } from "../storage";
import { MarkerIdScanner } from "./id-scanner";
import { PopupObserver } from "./popup-observer";

class Map {
    private idToMarker;

    private popupObserver = new PopupObserver(this.onNewPopup.bind(this));

    private addStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            .leaflet-marker-pane button {
                --color-support: var(--lca-color, white);
                --color-support-container: black;
                background-color: var(--lca-color, white);
                color: black;
            }

            [data-lca-todo] {
                --lca-color: black;
            }
        `;
        document.querySelector("head")!.appendChild(style);
    }

    private setMarkerColor(marker, color) {
        marker.style.setProperty("--lca-color", color);
    }

    private updateAll() {
        for (const id in this.idToMarker) {
            Storage.get(id).then(data => {
                this.setMarkerColor(this.idToMarker[id], data.color);
            });
        }

        let popup;
        if (popup = this.popupObserver.getCurrentPopup()) {
            Storage.get(popup.id).then(data => {
                popup.article.querySelector("#lca-note")!.innerText = data.text;
            })
        }
    }

    private onScanFinished(result) {
        this.idToMarker = result;
        this.updateAll();
    }

    private onNewPopup(popup) {
        Storage.get(popup.id).then(data => {
            const noteTree = (new DOMParser()).parseFromString(`
                <div id="lca-note" class="pb-lg px-lg text-body-2 text-on-surface">
                    <h4 class="font-bold">Notes</h4>
                    <span id="lca-note-text"></span>
                </div>
            `, "text/html");
            (noteTree.querySelector("#lca-note-text") as HTMLElement).innerText = data.text || "Vous n'avez pas encore annoté cette offre.";
            popup.article.appendChild(noteTree.body);
        });
    }

    private main() {
        this.addStyles();
        Storage.addListener(this.updateAll.bind(this));
        MarkerIdScanner.getMarkerIds().then(this.onScanFinished.bind(this));
        this.popupObserver.observe();
    }

    static main() {
        (new Map()).main();
    }
}

Map.main();