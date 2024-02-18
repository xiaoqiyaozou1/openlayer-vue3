
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import olDataUtils from './olDataUtils';
import olHelpUtils from './olHelpUtils';
const olMainUtils = {
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
    
    olDataUtils.olMap = this.olMap;
    olHelpUtils.olMap = this.olMap;
  },
  addLayerData(layerData) {
    for (let i = 0; i < layerData.length; i++) {
      const element = layerData[i];
      const type = element.type
      switch (type) {
        case 'xyz':
          olDataUtils.addXYZLayer(element)
          break;
        case 'geojson':
          olDataUtils.addGeoJson(element)
      }
    }


  },


}
export default olMainUtils