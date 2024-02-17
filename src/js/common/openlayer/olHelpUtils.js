

import Overlay from 'ol/Overlay.js';
const olHelpUtils = {
    olMap: null,
    createPopup(dom) {
        const overlay = new Overlay({
            element: dom,
            autoPan: {
                animation: {
                    duration: 250
                }
            }
        })
        this.olMap.addOverlay(overlay)
        return overlay;
    }

}

export default olHelpUtils