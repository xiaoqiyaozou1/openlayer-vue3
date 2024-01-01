<template>
  <div class="home">
    <InitMap></InitMap>
  </div>
</template>

<script>
// @ is an alias to /src
import InitMap from './components/InitMap/InitMap.vue';
export default {
  name: 'HomeView',
  components: {
    InitMap
  }
}
</script>
