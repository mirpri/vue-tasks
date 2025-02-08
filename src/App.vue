<template>
  <div class="container">
  <h1>Tasks</h1>
  <div class="main">
    <p class="highlight">{{ listsummary }}</p>
    <taskForm @taskAdded="addTask($event)"></taskForm>
    <div class="task-list">
      <taskItem v-for="task in tasks" 
        :key="task.id" 
        :id="task.id" 
        :name="task.name" 
        :due="task.due"
        @toggleDone="toggleDone(task.id)"
        @deleteTask="tasks = tasks.filter(item => item.id !== task.id)"
        @editTask="editTask(task.id,$event)"
        v-model:done="task.done"></taskItem>
      <div class="task-item hidden" id="item-spacer"></div>    
    </div>
  </div>
  <footer >Simple task list vue app. By mirpri.</footer> 
  <div :class="messageBar.show?'badge good message':'badge good message shrinked'">{{messageBar.content}}</div>
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
      messageBar:{content:'',show: 0}
    }
  },

  methods: {
    addTask(attr) {
      // alert('task '+attr.name+' '+attr.due+' sucessfully added');
      document.getElementById('item-spacer').classList.remove('hidden');
      document.getElementById('item-spacer').classList.remove('stop-transition');
      setTimeout(() => {
        document.getElementById('item-spacer').classList.add('hidden');
        document.getElementById('item-spacer').classList.add('stop-transition');
        this.tasks.push({ id: 'task-' + nanoid(), name: attr.name, due:attr.due, done: false });
      }, 300);
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
    saveToLocalStorage() {
      //alert('saved');
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.messageBar.content='Tasks saved to local storage';
      this.messageBar.show+=1;
      setTimeout(() => {
        this.messageBar.show-=1;
      }, 1000);
    },
    loadFromLocalStorage() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        //alert(tasks);
        this.tasks = JSON.parse(tasks);
        this.tasks.forEach(task => {
          if(task.due!='')task.due = new Date(task.due);
        });
      }
    }
  },
  created() {
    this.loadFromLocalStorage();
  },
  watch: {
    tasks: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true, // detects changes to nested properties within the tasks array.
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
