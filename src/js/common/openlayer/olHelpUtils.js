

import Overlay from 'ol/Overlay.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw.js';
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
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
    drawPoint(prj = '4326') {
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'Point'
        })

        this.olMap.addInteraction(this.olDraw);
        let that = this;
        return new Promise(resolve => {
            that.olDraw.on('drawend', (event) => {
                let geoJson = null
                if (prj == '4326') {
                    const feature = new Feature({
                        geometry: event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326')
                    })
                    geoJson = new GeoJSON().writeFeature(feature)
                } else {
                    geoJson = new GeoJSON.writeFeature(event.feature)
                }

                that.olMap.removeInteraction(this.olDraw)
                resolve(JSON.parse(geoJson))
            })
        })

    },
    drawLine(prj = '4326') {
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'LineString'
        })
        this.olMap.addInteraction(this.olDraw);
        let that = this;
        return new Promise(resolve => {
            that.olDraw.on('drawend', (event) => {
                let geoJson = null
                if (prj == '4326') {
                    const feature = new Feature({
                        geometry: event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326')
                    })
                    geoJson = new GeoJSON().writeFeature(feature)
                } else {
                    geoJson = new GeoJSON.writeFeature(event.feature)
                }

                that.olMap.removeInteraction(this.olDraw)
                resolve(JSON.parse(geoJson))
            })
        })
    },
    drawPolygon(prj = '4326') {
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'Polygon'
        })

        this.olMap.addInteraction(this.olDraw);
        let that = this;
        return new Promise(resolve => {
            that.olDraw.on('drawend', (event) => {
                let geoJson = null
                if (prj == '4326') {
                    const feature = new Feature({
                        geometry: event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326')
                    })
                    geoJson = new GeoJSON().writeFeature(feature)
                } else {
                    geoJson = new GeoJSON.writeFeature(event.feature)
                }

                that.olMap.removeInteraction(this.olDraw)
                resolve(JSON.parse(geoJson))
            })
        })
    },
    drawCircle(prj = '4326') {
        this.initDrawOption()
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: 'Circle'
        })

        this.olMap.addInteraction(this.olDraw);
        let that = this;
        return new Promise(resolve => {
            that.olDraw.on('drawend', (event) => {
                let geoJson = null
                if (prj == '4326') {
                    const feature = new Feature({
                        geometry: event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326')
                    })
                    geoJson = new GeoJSON().writeFeature(feature)
                } else {
                    geoJson = new GeoJSON.writeFeature(event.feature)
                }

                that.olMap.removeInteraction(this.olDraw)
                resolve(JSON.parse(geoJson))
            })
        })
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