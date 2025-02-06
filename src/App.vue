<template>
  <div class="container">
  <h1>Tasks</h1>
  <div class="main">
    <p class="highlight">{{ listsummary }}</p>
    <taskForm @taskAdded="addTask($event)"></taskForm>
    <div>
      <taskItem v-for="task in tasks" 
        :key="task.id" 
        :id="task.id" 
        :name="task.name" 
        :due="task.due"
        @toggleDone="toggleDone(task.id)"
        @deleteTask="tasks = tasks.filter(item => item.id !== task.id)"
        @editTask="editTask(task.id,$event)"
        v-model:done="task.done"></taskItem>
    </div>
  </div>
  <footer>Simple task list vue app. By mirpri.</footer> 
  <br>
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
        { id: 'task-' + nanoid(), due:new Date(), name: 'eat', done: true },
        { id: 'task-' + nanoid(), due:'', name: 'sleep', done: false },
        { id: 'task-' + nanoid(), due:'', name: 'code', done: false },
      ],
    }
  },

  methods: {
    addTask(attr) {
      // alert('task '+attr.name+' '+attr.due+' sucessfully added');
      this.tasks.push({ id: 'task-' + nanoid(), name: attr.name, due:attr.due, done: false });
    },
    toggleDone(id) {
      const task = this.tasks.find(task => task.id === id);
      task.done = !task.done;
    },
    editTask(id,newatt) {
      // alert(id+'task '+newatt.newName+' sucessfully edited '+newatt.newDue);

      const task = this.tasks.find(task => task.id === id);
      task.name = newatt.newName;
      task.due = newatt.newDue;
    },
  },

  computed: {
    listsummary() {
      return this.tasks.filter(item => item.done === true).length + ' out of ' + this.tasks.length + ' items completed';
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
}
</style>
