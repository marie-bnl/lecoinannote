export class Map {
    private markersById;

    constructor(markersById) {
        this.markersById = markersById;
    }

    static get currentPopup() {
        const article = document.querySelector("article[data-test-id='map-ad-card']");
        const id = article?.querySelector("a")?.href.split("/").slice(-1)[0];

        if (!id)
            return;

        return { id, article };
    }

    get allMarkerIds() {
        return Object.keys(this.markersById);
    }

    setMarkerColor(id, color) {
        this.markersById[id].style.setProperty("--lca-color", color);
    }

    addNoteSection() {
        Map.currentPopup?.article.insertAdjacentHTML("beforeend", `
            <div class="pb-lg px-lg text-body-2 text-on-surface">
                <h4 class="font-bold">Notes</h4>
                <span id="lca-note"></span>
            </div>
        `);
    }

    setNoteText(text) {
        const node = Map.currentPopup!.article.querySelector("#lca-note") as HTMLElement;
        node.innerText = text || "Vous n'avez pas annoté cette offre.";
    }
}