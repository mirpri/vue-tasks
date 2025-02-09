<template>
    <div class="container">
    <titleBar :title="title" @titleChanged="onTitleChanged" @deleteList="$emit('deleteList')"></titleBar>
    <div class="main">
      <taskForm @taskAdded="addTask($event)"></taskForm>
      <div class="task-list">
        <div style="height: 30px;" :class="tasks.length==0?'flex-div highlight':'flex-div highlight hidden'" > Empty </div>
        <taskItem v-for="task in tasks" 
          :key="task.id" 
          :id="task.id" 
          :name="task.name" 
          :due="task.due"
          @toggleDone="toggleDone(task.id)"
          @deleteTask="tasks = tasks.filter(item => item.id !== task.id)"
          @editTask="editTask(task.id,$event)"
          v-model:done="task.done"></taskItem>
        <div class="task-item hidden" ref="itemSpacer"></div>    
      </div>
    </div>
    <footer >{{ listsummary }}</footer>
  </div>
</template>
  
  
  <script>
  import taskItem from './taskItem.vue';
  import taskForm from './taskForm.vue';
  import titleBar from './titleBar.vue';
  import { nanoid } from 'nanoid'; // import nanoid to generate unique ids

  
  export default {
  
    name: 'App',
    components: {
      taskItem,
      taskForm,
      titleBar,
    },
    props: {
      tasklist: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  
    data() {
      return {
        tasks:this.tasklist,
      }
    },
  
    methods: {
      addTask(attr) {
        // alert('task '+attr.name+' '+attr.due+' sucessfully added');
        this.$refs.itemSpacer.classList.remove('hidden');
        this.$refs.itemSpacer.classList.remove('stop-transition');
        setTimeout(() => {
          this.$refs.itemSpacer.classList.add('hidden');
          this.$refs.itemSpacer.classList.add('stop-transition');
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
        this.$emit('listChanged',this.tasks);
      },
      onTitleChanged(newTitle) {
        this.$emit('titleChanged', newTitle);
      },
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

  