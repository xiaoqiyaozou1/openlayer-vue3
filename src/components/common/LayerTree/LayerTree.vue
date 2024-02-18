<template>
    <div class="layer-tree">
        <el-tree ref="layerTree" :data="layerData" :props="defaultProps"
            :default-checked-keys="['tianDiTuXyzLabel', 'chinaGeoJson']" show-checkbox node-key="id"
            @check-change="selectChange">
        </el-tree>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import olDataUtils from '@/js/common/openlayer/olDataUtils'
const defaultProps = {
    children: 'children',
    label: 'label'
}
const allLayerId = ['tianDiTuXyzLabel', 'chinaGeoJson']
const layerData = [{
    id: 'tianditu',
    label: '天地图',
    children: [{
        id: 'tianDiTuXyzLabel',
        label: '天地图注记'
    }],
}, {
    id: 'vectorLayer',
    label: '矢量数据',
    children: [
        {
            id: 'chinaGeoJson',
            label: '中国地图'
        }
    ]
}]
const layerTree = ref(null)
const selectChange = () => {
    const selectKeys = layerTree.value.getCheckedKeys(true)
    const noSelectKeys = [];
    for (let i = 0; i < allLayerId.length; i++) {
        const element = allLayerId[i];
        if (!selectKeys.includes(element)) {
            noSelectKeys.push(element)
        }
    }
    for (let i = 0; i < selectKeys.length; i++) {
        const element = selectKeys[i];
        olDataUtils.setLayerIsShow(element, true)
    }
    for (let i = 0; i < noSelectKeys.length; i++) {
        const element = noSelectKeys[i];
        olDataUtils.setLayerIsShow(element, false)
    }
}
</script>

<style lang="scss" scoped>
.layer-tree {
    width: 300px;
    height: 600px;
    position: absolute;
    left: 15px;
    bottom: 15px;
}
</style>