import { AnnotationData } from "./data";
import { PopupArticle } from "./popup";

const mapNode = document.querySelector("#leaflet-map")!;
const popupPane = mapNode.querySelector(".leaflet-popup-pane")!;
const markerPane = mapNode.querySelector(".leaflet-marker-pane")!;

class Map {
    markersIds: object;
    currentId: string | null;

    getPopupArticle() {
        const articleNode = popupPane.querySelector("article");

        if (!articleNode)
            return null;

        return new PopupArticle(articleNode);
    }

    getSupportMarkerBtn() {
        return markerPane.querySelector(".bg-support");
    }

    observe() {
        const observer = new MutationObserver(async () => {
            const article = this.getPopupArticle();

            if (!article) {
                this.currentId = null;
                return;
            }

            if (article.id == this.currentId)
                return;

            this.currentId = article.id;

            const data = await AnnotationData.load(this.currentId);
            article.addNote(data.content);

            const supportMarkerBtn = this.getSupportMarkerBtn();

            if (supportMarkerBtn) {
                const color = data.color || "white";

                const style = document.createAttribute("style");
                style.value = `
                    background-color: ${color};
                    --color-support: ${color};

                    color: black;
                    --color-support-container: black;
                `;

                supportMarkerBtn.setAttributeNode(style);
            }
        });

        observer.observe(popupPane, { childList: true, subtree: true });
    }

    async init() {
        this.observe();

        const style = document.createElement("style");
        style.innerHTML = `
            .lbc-annotations-todo {
                background-color: black;
                color: white;
            }
        `;
        document.querySelector("head")!.appendChild(style);

        for (const marker of markerPane.querySelectorAll("button")) {
            marker.classList.add("lbc-annotations-todo");
        }

        setTimeout(async () => {
            let marker;
            while ((marker = markerPane.querySelector(".lbc-annotations-todo"))) {
                marker.click();
                await new Promise(r => setTimeout(r, 200));
            }
            mapNode.click();
        }, 500)
    }
}

const map = new Map();
map.init();