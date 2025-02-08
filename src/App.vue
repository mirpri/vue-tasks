<template>
  <div class="outer-container">
  <List v-for="list in taskss" :key="list.id" :tasklist="list.tasks" :title="list.name" @listChanged="updateList($event,list.id)"></List>
  </div>
  <div :class="messageBar.show?'badge good message':'badge good message shrinked'">{{messageBar.content}}</div>
</template>


<script>
import List from './components/List/List.vue';
import { nanoid } from 'nanoid'; // import nanoid to generate unique ids

export default {

  name: 'App',
  components: {
    List,
  },

  data() {
    return {
      taskss: [
        {name:'list-1',
         id: "list-"+nanoid(),
          tasks:[
            { id: 'task-1', name: 'Task 1', due: new Date(), done: true },
            { id: 'task-2', name: 'Task 2', due: new Date(), done: false },
            { id: 'task-3', name: 'Task 3', due: '', done: false },]
        },
        {name:'list-2',
        id: "list-"+nanoid(),
        tasks:[
          { id: 'task-4', name: 'Task 4', due: new Date(), done: true },
          { id: 'task-5', name: 'Task 5', due: new Date(), done: false },
          { id: 'task-6', name: 'Task 6', due: '', done: false },]
        },
      ],
      messageBar: {
        content: '',
        show: 0
      }
    };
  },
  mounted() {
    this.loadFromLocalStorage();
  },

  methods: {
    updateList(tasks, id) {
      this.taskss.forEach(list => {
        if (list.id === id) {
          list.tasks = tasks;
        }
      });
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      // alert('saved');
      localStorage.setItem('taskss', JSON.stringify(this.taskss));
      this.messageBar.content='Tasks saved to local storage';
      this.messageBar.show+=1;
      setTimeout(() => {
        this.messageBar.show-=1;
      }, 1000);
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('taskss');
      if (data) {
        // alert(data);
        this.taskss = JSON.parse(data);
        this.taskss.forEach(tasks => {
          tasks.tasks.forEach(task => {
          if(task.due!='')task.due = new Date(task.due);
          });
        });
      this.messageBar.content='Tasks loaded from local storage';
      this.messageBar.show+=1;
        setTimeout(() => {
          this.messageBar.show-=1;
        }, 1000);
      }
    }
  },

};

</script>

<style>
#app{
  display: flex;
  justify-content: center;
  overflow: hidden;
  transition: 0ms;
}
</style>
