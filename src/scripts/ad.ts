import { STORAGE } from "./common";
import editorHTML from "../html/editor";

const id = window.location.pathname.split("/").splice(-1)[0];

function removeExistingSection() {
    const section = document.querySelector("#lca-section");
    if (section)
        section.remove();
}

function addSection() {
    document.querySelector("#aside")!.insertAdjacentHTML("beforeend", editorHTML);
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