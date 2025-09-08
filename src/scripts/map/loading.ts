import loadingHTML from "../../html/loading";


export class LoadingScreen {
    private progress = 0;
    private total = 0;

    show() {
        document.body.insertAdjacentHTML("beforeend", loadingHTML);
    }

    delete() {
        document.querySelector("#lca-loading")!.remove();
    }

    setTotal(value) {
        this.total = value;
    }

    setProgress(value) {
        this.progress = value;
        this.update();
    }

    private update() {
        (document.querySelector("#lca-loading-progress") as HTMLElement)
            .innerText = `${this.progress} / ${this.total}`;
    }
}