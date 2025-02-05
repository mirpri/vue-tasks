<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">-->
  <div id="app">
    <h1>Tasks</h1>    
    <div class="container">
    <div class="main">
      <p class="highlight">What needs to be done?</p>
      <taskForm @taskAdded="addTask"></taskForm>
      <div>
        <taskItem v-for="task in tasks" :key="task.id" :id="task.id" :name="task.name" :done="task.done"></taskItem>
      </div>
    </div>
    <footer>Simple task list vue app. By mirpri.</footer></div>
  </div>
</template>

<script>
import taskItem from './components/taskItem.vue';
import taskForm from './components/taskForm.vue';
import { nanoid } from 'nanoid'; // import nanoid to generate unique ids

export default {

  name: 'App',
  components: {
    taskItem,
    taskForm,
  },

  data() {
    return {
      tasks: [
        { id: 'task-' + nanoid(), name: 'eat', done: true },
        { id: 'task-' + nanoid(), name: 'sleep', done: false },
        { id: 'task-' + nanoid(), name: 'code', done: false },
      ]
    }
  },

  methods: {
    addTask(Name) {
      this.tasks.push({ id: 'task-' + nanoid(), name: Name, done: false });
      // alert('task '+Name+' sucessfully added');
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
