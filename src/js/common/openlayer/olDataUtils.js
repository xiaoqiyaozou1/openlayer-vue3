import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
const olDataUtils = {
  olMap: null,
  layerDataArr: [],
  addXYZLayer(options) {
    let xyzLayer = new TileLayer({
      source: new XYZ(options),
    });
    this.layerDataArr.push({
      id: options.id,
      layer: xyzLayer,
    });
    this.olMap.addLayer(xyzLayer);
  },
  async addGeoJson(options) {
    const styles = {
      LineString: new Style({
        stroke: new Stroke({
          color: "green",
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: "green",
          width: 1,
        }),
      }),

      MultiPolygon: new Style({
        stroke: new Stroke({
          color: "yellow",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(255, 255, 0, 0.1)",
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: "blue",
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: "magenta",
          width: 2,
        }),
        fill: new Fill({
          color: "magenta",
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: "magenta",
          }),
        }),
      }),
    };
    const styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: options.url,
        format: new GeoJSON(),
      }),
      style: styleFunction,
    });
    this.layerDataArr.push({
      id: options.id,
      layer: vectorLayer,
    });
    this.olMap.addLayer(vectorLayer);
  },

  setLayerIsShow(id, isShow) {
    for (let i = 0; i < this.layerDataArr.length; i++) {
      const element = this.layerDataArr[i];
    
      if (element.id == id) {
        console.log(element);
        element.layer.setVisible(isShow);
      }
    }
  },
};

export default olDataUtils;
