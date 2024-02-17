<template>
    <div class="map-container" id="mapContainer">

    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import olMainUtils from "@/js/common/openlayer/olMainUtils"

const olOptions = {
    center: [104, 34],
    zoom: 5,
}
// http://t0.tianditu.gov.cn/cva_w/wmts?tk=
const layerData = [{
    id: 'xx',
    url: 'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=c700e75dd8da6ef7b17f67ce47bb060f',
    type: 'xyz'
}]
onMounted(() => {
    olMainUtils.initMap('mapContainer', olOptions)
    olMainUtils.addLayerData(layerData)
})
</script>

<style lang="scss" scoped></style>