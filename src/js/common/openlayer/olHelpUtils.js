

import Overlay from 'ol/Overlay.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw.js';
const olHelpUtils = {
    olMap: null,
    olDraw: null,
    olDrawLayer: null,
    olDrawSource: null,
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
    },
    drawPoint() {
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'Point'
        })
        this.olDraw.on('drawend', () => {
            this.olMap.removeInteraction(this.olDraw)
        })
        this.olMap.addInteraction(this.olDraw);
    },
    drawLine(){
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'LineString'
        })
        this.olDraw.on('drawend', () => {
            this.olMap.removeInteraction(this.olDraw)
        })
        this.olMap.addInteraction(this.olDraw);
    },
    drawPolygon(){
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'Polygon'
        })
        this.olDraw.on('drawend', () => {
            this.olMap.removeInteraction(this.olDraw)
        })
        this.olMap.addInteraction(this.olDraw);
    },
    drawCircle(){
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'Circle'
        })
        this.olDraw.on('drawend', () => {
            this.olMap.removeInteraction(this.olDraw)
        })
        this.olMap.addInteraction(this.olDraw);
    },
    initDrawOption() {
        if (!this.olDrawLayer) {
            this.olDrawSource = new VectorSource({
                wrapX: false
            })
            this.olDrawLayer = new VectorLayer({
                source: this.olDrawSource
            })
            this.olMap.addLayer(this.olDrawLayer)
        }
        if (this.olDraw) {
            this.olMap.removeInteraction(this.olDraw)
            this.olDraw = null;
        }
    },
    clearDrawContent() {
        if (this.olDrawSource) {
            this.olDrawSource.clear()
        }
    }
}

export default olHelpUtils