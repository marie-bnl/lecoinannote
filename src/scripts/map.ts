import { STORAGE } from "./common";
import { MarkerIdScanner } from "./map/id-scanner";
import { Map } from "./map/map";
import { MapUpdater } from "./map/updater";

import loadingHTML from "../html/loading";
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
    document.body.insertAdjacentHTML("beforeend", loadingHTML);

    MarkerIdScanner.getMarkerIds().then(markersById => {
        document.querySelector("#lca-loading")!.remove();
        const updater = new MapUpdater(new Map(markersById));
        updater.update();
        updater.observe();
    });

    addFooter();
}

main();