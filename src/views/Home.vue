<template>
  <div class="home">
    <img alt="Vue logo" src="" />
    <HelloWorld msg="Welcome" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  mounted() {
    console.log("Home.vue-process", process.env);
  },
};
</script>
