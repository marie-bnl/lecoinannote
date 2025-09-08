import { STORAGE } from "./common";
import { MarkerIdScanner } from "./map/id-scanner";
import { Map } from "./map/map";
import { MapUpdater } from "./map/updater";

import footerHTML from "../html/footer";

function addFooter() {
    document.querySelector("footer")!.insertAdjacentHTML("beforeend", footerHTML);

    document.querySelector("#lca-backup")!.addEventListener("click", () => {
        STORAGE.get().then(JSON.stringify).then(alert);
    });

    document.querySelector("#lca-restore")!.addEventListener("click", () => {
        const res = prompt();
        if (res) {
            STORAGE.set(JSON.parse(res));
            location.reload();
        }
    });
}

function main() {
    MarkerIdScanner.getMarkerIds().then(markersById => {
        const updater = new MapUpdater(new Map(markersById));
        updater.update();
        updater.observe();
    });

    addFooter();
}

main();