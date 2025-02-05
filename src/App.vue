<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="app">
    <h1>Tasks</h1>
        <div>
            <taskItem v-for="task in tasks" :key="task.id" :id="task.id" :name="task.name" :done="task.done"></taskItem>
        </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import taskItem from './components/taskItem.vue';
import { nanoid } from 'nanoid'; // import nanoid to generate unique ids

export default {
  name: 'App',
  components: {
    // HelloWorld
    taskItem,
  },
  data() {
    return {
      tasks: [
        { id: 'task-' + nanoid(), name: 'eat', done: true },
        { id: 'task-' + nanoid(), name: 'sleep', done: false },
        { id: 'task-' + nanoid(), name: 'code', done: false },
      ]
    }
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
