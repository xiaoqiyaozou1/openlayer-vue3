<template>
    <div>
        <PopupContainer id="popupContainer" @close-container="closePopup">
            <div>
                {{ showQueryTxt }}
            </div>
        </PopupContainer>
        <div class="example-container">
            <LayerTree class="layer-tree example-row"></LayerTree>
            <div class="draw-container example-row">
                <el-button @click="drawGeo('point')">绘制点</el-button>
                <el-button @click="drawGeo('line')">绘制线</el-button>
                <el-button @click="drawGeo('polygon')">绘制多边形</el-button>
                <el-button @click="drawGeo('circle')">绘制圆</el-button>
                <el-button @click="clearDraw">清除</el-button>
            </div>
            <div class="popup-ctr example-row">
                <el-button @click="openPopupEvent">打开气泡事件</el-button>
                <el-button @click="closePopupEvent">关闭气泡事件</el-button>
            </div>
            <div class="popup-ctr example-row">
                <el-button @click="messureFunc('LineString')">距离测量</el-button>
                <el-button @click="messureFunc('Polygon')">面积测量</el-button>
                <el-button @click="clearMeasureContent">清除</el-button>
            </div>
        </div>

    </div>
</template>

<script setup>
import PopupContainer from "@/components/common/Popups/PopupContainer.vue"
import olHelpUtils from '@/js/common/openlayer/olHelpUtils';
import LayerTree from "@/components/common/LayerTree/LayerTree.vue"
import olMessureUtils from '@/js/common/openlayer/olMessureUtils'
import { onMounted, ref } from "vue";
import olDataUtils from "@/js/common/openlayer/olDataUtils";


const drawGeo = (type) => {
    if (type == 'point') {
        olHelpUtils.drawPoint()
    } else if (type == 'line') {
        olHelpUtils.drawLine()
    } else if (type == 'polygon') {
        olHelpUtils.drawPolygon()
    } else if (type == 'circle') {
        olHelpUtils.drawCircle()
    }
}

const clearDraw = () => {
    olHelpUtils.clearDrawContent()
}
const showQueryTxt = ref('')

const overlay = ref(null)
const initPopup = () => {

    if (overlay.value == null) {
        const dom = document.getElementById('popupContainer')
        const options = {}
        overlay.value = olHelpUtils.createPopup(dom, options)
    }

}
let singleclick = null
const openPopupEvent = () => {
    singleclick = olHelpUtils.olMap.on('singleclick', async (evt) => {
        const coordinate = evt.coordinate;
        const pixel = olHelpUtils.olMap.getEventPixel(evt.originalEvent);
        const queryLayer = olDataUtils.getLayerById('chinaGeoJson')
        if (queryLayer) {
            const layer = queryLayer.layer
            const features = await layer.getFeatures(pixel)
            if (features.length > 0) {
                showQueryTxt.value = features[0].values_.name
            }


        }

        overlay.value.setPosition(coordinate);


        //全局查
        // olHelpUtils.olMap.forEachFeatureAtPixel(pixel, function (feature) {

        // })

    });
}

const closePopupEvent = () => {

    olHelpUtils.olMap.un('singleclick', singleclick.listener)
    if (overlay.value) {
        overlay.value.setPosition(undefined);
    }
}

const closePopup = () => {
    if (overlay.value) {
        overlay.value.setPosition(undefined);
    }
}
const messureFunc = (type) => {
    olMessureUtils.messure(type)
}
const clearMeasureContent = () => {
    olMessureUtils.clear()
}
onMounted(() => {
    initPopup()
})
</script>

<style lang="scss" scoped>
.example-container {
    position: absolute;
    right: 15px;
    top: 15px
}

.example-row {
    margin-top: 10px;
}
</style>