import { STORAGE } from "./common";

const id = window.location.pathname.split("/").splice(-1)[0];

function removeExistingSection() {
    const section = document.querySelector("#lca-section");
    if (section)
        section.remove();
}

function addSection() {
    const template = document.createElement("template");
    template.innerHTML = `
        <div id="lca-section" class="top-[100px] sticky bg-surface rounded-lg shadow-sm p-xl mb-xl gap-xl flex-col custom:flex">
            <div class="flex flex-row">
                <h2 class="text-headline-2">Notes</h2>
                <div class="grow"></div>
                <input id="lca-input-color" type="color" value="#000000" class="h-xl w-xl rounded-full outline-2">
            </div>
            <textarea id="lca-input-text" class="w-full" style="min-height: 150px;"></textarea>
        </div>
    `;
    document.querySelector("#aside")!.appendChild(template.content.children[0]);
}

function getInputField(id) {
    return document.querySelector(`#lca-input-${id}`) as HTMLInputElement;
}

function setData() {
    STORAGE.get(id).then(data => {
        if (id in data) {
            getInputField("color").value = data[id].color;
            getInputField("text").value = data[id].text;
        }
    });
}

function addEventListeners() {
    for (const element of document.querySelectorAll("[id^='lca-input']")) {
        element.addEventListener("input", () => {
            const color = getInputField("color").value;
            const text = getInputField("text").value;
            STORAGE.set({ [id]: { color, text } });
        })
    }
}

function main() {
    removeExistingSection();
    addSection();
    setData();
    addEventListeners();
}

main();