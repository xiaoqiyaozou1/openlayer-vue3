

import Overlay from 'ol/Overlay.js';
import {
    Circle as CircleStyle,
    Fill,
    RegularShape,
    Stroke,
    Style,
    Text,
} from 'ol/style.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw.js';
import { Point } from 'ol/geom.js';
import { getArea, getLength } from 'ol/sphere.js';
import { unByKey } from 'ol/Observable.js';
const olMessureUtils = {
    olMap: null,
    olDraw: null,
    olDrawLayer: null,
    olDrawSource: null,
    olStyle: null,

    olLabelStyle: null,
    messure(type) {
        this.initDrawOption()
        let that = this;
        this.olDraw = new Draw({
            source: this.olDrawSource,
            type: type,
            style: function (feature) {
                return that.styleFunction(feature, type);
            },
        })


        this.olMap.addInteraction(this.olDraw);

        this.olDraw.on('drawstart', function (evt) {



        });

        this.olDraw.on('drawend', function (evt) {

        });
    },
    styleFunction(feature, drawType) {

        const styles = [];
        let that = this;
        const geometry = feature.getGeometry();
        const type = geometry.getType();
        let point, label;
        if (!drawType || drawType === type || type === 'Point') {
            styles.push(this.olStyle);
            if (type === 'Polygon') {
                point = geometry.getInteriorPoint();
                label = that.formatArea(geometry);

            } else if (type === 'LineString') {
                point = new Point(geometry.getLastCoordinate());
                label = that.formatLength(geometry);

            }
            if (label && point) {
                that.olLabelStyle.setGeometry(point);
                that.olLabelStyle.getText().setText(label);
                styles.push(that.olLabelStyle);
                return styles;
            }
        }




    },
    formatLength(line) {
        const length = getLength(line);
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    },
    formatArea(polygon) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
        } else {
            output = Math.round(area * 100) / 100 + ' m\xB2';
        }
        return output;
    },
    initDrawOption() {

        if (this.olDraw) {
            this.olMap.removeInteraction(this.olDraw)
            this.olDraw = null;
        }
        if (this.olStyle == null) {
            this.olStyle = new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
            })
        }
        if (this.olLabelStyle == null) {
            this.olLabelStyle = new Style({
                text: new Text({
                    font: '14px Calibri,sans-serif',
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 1)',
                    }),
                    backgroundFill: new Fill({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    padding: [3, 3, 3, 3],
                    textBaseline: 'bottom',
                    offsetY: -15,
                }),
                image: new RegularShape({
                    radius: 8,
                    points: 3,
                    angle: Math.PI,
                    displacement: [0, 10],
                    fill: new Fill({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                }),
            })
        }
        if (!this.olDrawLayer) {
            this.olDrawSource = new VectorSource({

            })
            let that = this
            this.olDrawLayer = new VectorLayer({
                source: this.olDrawSource,
                style: function (feature) {
                    return that.styleFunction(feature)
                }
            })
            this.olMap.addLayer(this.olDrawLayer)
        }
    },
    clear() {
        this.olDrawSource.clear()
        if (this.olDraw) {
            this.olMap.removeInteraction(this.olDraw)
            this.olDraw = null;
        }
    }

}

export default olMessureUtils