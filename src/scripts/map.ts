import { STORAGE } from "./common";
import { MarkerIdScanner } from "./map/id-scanner";
import { Map } from "./map/map";
import { MapUpdater } from "./map/updater";
import loadingHTML from "../html/loading";

function addBackupLink() {
    const link = document.createElement("a");
    link.innerText = "Backup lecoinannoté";
    link.addEventListener("click", () => {
        STORAGE.get().then(JSON.stringify).then(alert);
    });
    document.querySelector("footer")?.appendChild(link);
}

function main() {
    document.body.insertAdjacentHTML("beforeend", loadingHTML);

    MarkerIdScanner.getMarkerIds().then(markersById => {
        document.querySelector("#lca-loading")!.remove();
        const updater = new MapUpdater(new Map(markersById));
        updater.update();
        updater.observe();
    });

    addBackupLink();
}

main();