
<template>
    <div class="popup-container">
        <div class="close-btn" @click="closeContainer">X</div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeContainer'])
const closeContainer = () => {
    emit('closeContainer')
}
</script>

<style lang="scss" scoped>
.popup-container {

    min-width: 200px;
    min-height: 200px;
    background-color: #fff;

    .close-btn {

        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
    }
}
</style>