import { Storage } from "../storage";
import { MarkerIdScanner } from "./id-scanner";
import { PopupObserver } from "./popup-observer";

class Map {
    private idToMarker;

    private popupObserver = new PopupObserver(this.onNewPopup.bind(this));

    private addStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            [data-lca-todo] {
                background-color: black;
                color: white;
            }
        `;
        document.querySelector("head")!.appendChild(style);
    }

    private setMarkerColor(marker, color) {
        const style = document.createAttribute("style");
        style.value = `
            --color-support: ${color};
            --color-support-container: black;
            background-color: ${color};
            color: black;
        `;
        marker.setAttributeNode(style);
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
                popup.article.querySelector("#lca-note")!.innerHTML = data.text;
            })
        }
    }

    private onScanFinished(result) {
        this.idToMarker = result;
        this.updateAll();
    }

    private onNewPopup(popup) {
        Storage.get(popup.id).then(data => {
            const template = document.createElement("template");
            template.innerHTML = `
                <div id="lca-note" class="pb-lg px-lg text-body-2 text-on-surface">
                    <h4 class="font-bold">Notes</h4>
                    <span>${data.text || "Vous n'avez pas encore annoté cette offre."}</span>
                </div>
            `;
            popup.article.appendChild(template.content.children[0]);
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