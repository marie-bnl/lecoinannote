import { STORAGE } from "../common";
import { Map } from "./map";
import { PopupObserver } from "./popup-observer";

export class MapUpdater {
    private map;
    private popupObserver;

    constructor (map) {
        this.map = map;
        this.popupObserver = new PopupObserver(this.onNewPopup.bind(this));
    }

    private onNewPopup(popup) {
        this.map.addNoteSection();
        this.update([popup.id]);
    }

    update(ids: string[] | null = null) {
        if (!ids)
            ids = this.map.allMarkerIds;

        STORAGE.get(ids).then(data => {
            for (const id in data)
                this.map.setMarkerColor(id, data[id].color);

            let popupId = Map.currentPopup?.id;
            if (popupId && data[popupId])
                this.map.setNoteText(data[popupId].text);
        });
    }

    observe() {
        STORAGE.onChanged.addListener(changes => {
            this.update(Object.keys(changes));
        });

        this.popupObserver.observe();
    }
}