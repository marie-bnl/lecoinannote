export class PopupArticle {
    articleNode: Element;

    constructor(articleNode) {
        this.articleNode = articleNode;
    }

    get id() {
        return this.articleNode.querySelector("a")!.href.split("/").slice(-1)[0]
    }

    async addNote(content) {
        const template = document.createElement("template");
        template.innerHTML = `
            <div class="lbc-annotations-notes pb-lg px-lg text-body-2 text-on-surface">
                <h4 class="font-bold">Notes</h4>
                <span>${content || "Vous n'avez pas encore annoté cette offre."}</span>
            </div>
        `;

        this.articleNode!.appendChild(template.content.children[0]);
    }
}