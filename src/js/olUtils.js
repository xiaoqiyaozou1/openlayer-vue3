
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';


const olUtils = {
  olMap: null,
  initMap(dom, options) {
    let defaultOptions = {
      center: [0, 0],
      zoom: 1
    }
    Object.assign(defaultOptions, options)
    this.olMap = new Map({
      target: dom,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=c700e75dd8da6ef7b17f67ce47bb060f",
          })
        }),
      ],
      view: new View({
        center: fromLonLat(defaultOptions.center),
        zoom: defaultOptions.zoom
      })
    })
  },
  addLayerData(layerData) {
    for (let i = 0; i < layerData.length; i++) {
      const element = layerData[i];
      const type = element.type
      switch (type) {
        case 'xyz':
          this.addXYZLayer(element)
          break;
      }
    }
  },
  addXYZLayer(options) {
    let xyzLayer = new TileLayer({
      source: new XYZ(options)
    })
    this.olMap.addLayer(xyzLayer)
  }

}
export default olUtils