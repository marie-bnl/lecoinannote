import { STORAGE } from "./common";
import { MarkerIdScanner } from "./map/id-scanner";
import { Map } from "./map/map";
import { MapUpdater } from "./map/updater";

function addStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        .leaflet-marker-pane button {
            --color-support: var(--lca-color, black);
            --color-support-container: white;
            background-color: var(--lca-color, black);
            color: white;
        }

        [data-lca-todo] {
            --lca-color: grey;
        }
    `;
    document.querySelector("head")!.appendChild(style);
}

function addBackupLink() {
    const link = document.createElement("a");
    link.innerText = "Backup lecoinannoté";
    link.addEventListener("click", () => {
        STORAGE.get().then(JSON.stringify).then(alert);
    });
    document.querySelector("footer")?.appendChild(link);
}

function main() {
    addStyles();
    addBackupLink();

    MarkerIdScanner.getMarkerIds().then(markersById => {
        const updater = new MapUpdater(new Map(markersById));
        updater.update();
        updater.observe();
    });
}

main();