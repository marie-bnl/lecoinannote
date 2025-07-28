import { AnnotationData } from "./data";

async function init() {
    const id = window.location.pathname.split("/").splice(-1)[0];
    const data = await AnnotationData.load(id);

    const aside = document.querySelector("#aside")!;

    const existingSection = aside.querySelector(".lbc-annotations-section");
    if (existingSection)
        existingSection.remove();

    const template = document.createElement("template");
    template.innerHTML = `
        <div class="lbc-annotations-section top-[100px] sticky bg-surface rounded-lg shadow-sm p-xl mb-xl gap-xl flex-col custom:flex hidden">
            <div class="flex flex-row">
                <h2 class="text-headline-2">Notes</h2>
                <div class="grow"></div>
                <input id="input-color" type="color" value="${data.color}" class="h-xl w-xl rounded-full outline-2">
            </div>
            <textarea id="input-content" class="w-full" style="min-height: 150px;">${data.content}</textarea>
        </div>
    `;

    const colorInput = template.content.querySelector("#input-color")!;
    const textArea = template.content.querySelector("#input-content")!;

    function update() {
        AnnotationData.save(id, colorInput.value, textArea.value);
    }

    colorInput.addEventListener("input", update);
    textArea.addEventListener("input", update);

    aside.appendChild(template.content.children[0]);
}

init();