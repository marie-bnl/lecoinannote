import noteHTML from "../../html/note";

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
        Map.currentPopup?.article.insertAdjacentHTML("beforeend", noteHTML);
    }

    setNoteText(text) {
        const node = Map.currentPopup!.article.querySelector("#lca-note") as HTMLElement;
        node.innerText = text;
    }
}