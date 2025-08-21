import { STORAGE } from "./common";
import { MarkerIdScanner } from "./map/id-scanner";
import { Map } from "./map/map";
import { MapUpdater } from "./map/updater";

function addBackupLink() {
    const link = document.createElement("a");
    link.innerText = "Backup lecoinannoté";
    link.addEventListener("click", () => {
        STORAGE.get().then(JSON.stringify).then(alert);
    });
    document.querySelector("footer")?.appendChild(link);
}

function main() {
    addBackupLink();

    document.body.insertAdjacentHTML("beforeend", `
        <div id="lca-loading">
            <h1 class="text-headline-1">Chargement</h1>
            <p class="text-body-1">En raison de limitations techniques, <em>lecoinannoté</em> est en train d'identifier chaque marqueur de la carte.</p>
            <p class="text-body-1"><strong>⚠️ Merci de ne pas interagir avec la page avant la fin du chargement. ⚠️</strong></p>
            <p class="text-body-1">Si le processus semble anormalement long, recharger la page.</p>
            <aside>
                <p class="text-body-1">Ce processus peut prendre plusieurs dizaines de secondes selon le nombre de résultats. Pour un chargement plus rapide, effectuer une recherche plus restreinte (avec plus de filtres ou dans une zone plus petite).</p>
            </aside>
        </div>
    `);

    MarkerIdScanner.getMarkerIds().then(markersById => {
        document.querySelector("#lca-loading")!.remove();
        const updater = new MapUpdater(new Map(markersById));
        updater.update();
        updater.observe();
    });
}

main();