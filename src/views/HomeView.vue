<template>
  <div class="home">
    <InitMap></InitMap>
    <PopupContainer id="popupContainer" @close-container="closePopup">
      <div>
        {{ number }}
      </div>
    </PopupContainer>
    <LayerTree></LayerTree>
    <div class="draw-container">
      <el-button @click="drawGeo('point')">绘制点</el-button>
      <el-button @click="drawGeo('line')">绘制线</el-button>
      <el-button @click="drawGeo('polygon')">绘制多边形</el-button>
      <el-button @click="drawGeo('circle')">绘制圆</el-button>
      <el-button @click="clearDraw">清除</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InitMap from '@/components/common/InitMap/InitMap.vue';
import PopupContainer from "@/components/common/Popups/PopupContainer.vue"
import olHelpUtils from '@/js/common/openlayer/olHelpUtils';
import LayerTree from "@/components/common/LayerTree/LayerTree.vue"

export default {
  name: 'HomeView',
  components: {
    InitMap,
    PopupContainer,
    LayerTree
  },
  data() {
    return {
      isShowPopup: false,
      number: 1,
      overlay: null
    }
  },
  methods: {
    openPopup() {
      const that = this;
      olHelpUtils.olMap.on('singleclick', function (evt) {
        const dom = document.getElementById('popupContainer')
        const overlay = olHelpUtils.createPopup(dom)
        const coordinate = evt.coordinate;
        overlay.setPosition(coordinate);
        that.overlay = overlay
        that.number += 1

      });

    },
    closePopup() {
      this.overlay.setPosition(undefined)
    },
    async drawGeo(type) {
      let res = null;
      if (type == 'point') {
        res = await olHelpUtils.drawPoint()
      } else if (type == 'line') {
        res = await olHelpUtils.drawLine()
      } else if (type == 'polygon') {
        res = await olHelpUtils.drawPolygon()
      } else if (type == 'circle') {
        res = await olHelpUtils.drawCircle()
      }
      console.log(res);
    },
    clearDraw() {
      olHelpUtils.clearDrawContent()
    }
  },
  mounted() {
    //this.openPopup()
  }

}
</script>
<style>
.draw-container {
  position: absolute;
  right: 15px;
  top: 15px
}
</style>
