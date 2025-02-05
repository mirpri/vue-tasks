<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="app">
    <h1>Tasks</h1>
        <taskItem name="eat" :done="true"></taskItem>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import taskItem from './components/taskItem.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld
    taskItem
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
