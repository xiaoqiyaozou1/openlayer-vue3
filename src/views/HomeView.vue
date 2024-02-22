<template>
  <div class="home">
    <InitMap></InitMap>
    <ExamplePage></ExamplePage>

  </div>
</template>

<script>
// @ is an alias to /src
import InitMap from '@/components/common/InitMap/InitMap.vue';
import ExamplePage from '@/components/common/ExamplePage/ExamplePage.vue';
export default {
  name: 'HomeView',
  components: {
    InitMap,
    ExamplePage
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  }

}
</script>
<style></style>
