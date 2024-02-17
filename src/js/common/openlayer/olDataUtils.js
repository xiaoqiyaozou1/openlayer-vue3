

import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
const olDataUtils = {
    olMap: null,
    addXYZLayer(options) {
        let xyzLayer = new TileLayer({
            source: new XYZ(options)
        })
        this.olMap.addLayer(xyzLayer)
    },
    async addGeoJson() {

        const styles = {

            'LineString': new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1,
                }),
            }),
            'MultiLineString': new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1,
                }),
            }),

            'MultiPolygon': new Style({
                stroke: new Stroke({
                    color: 'yellow',
                    width: 1,
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.1)',
                }),
            }),
            'Polygon': new Style({
                stroke: new Stroke({
                    color: 'blue',
                    lineDash: [4],
                    width: 3,
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)',
                }),
            }),
            'GeometryCollection': new Style({
                stroke: new Stroke({
                    color: 'magenta',
                    width: 2,
                }),
                fill: new Fill({
                    color: 'magenta',
                }),
                image: new CircleStyle({
                    radius: 10,
                    fill: null,
                    stroke: new Stroke({
                        color: 'magenta',
                    }),
                }),
            }),

        };
        const styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };
        const vectorLayer = new VectorLayer({          
            source: new VectorSource({
              url: './data/geojson/china.json',
              format: new GeoJSON(),
            }),
            style: styleFunction,
          });
          
        this.olMap.addLayer(vectorLayer)
    }
}

export default olDataUtils

