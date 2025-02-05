<template>
    <form @submit.prevent="submittask">
        <input type="text"
            id="newtask-input" 
            autocomplete="off" 
            placeholder="Add a task"
            v-model.lazy.trim="name"
            class="highlightinput"
            required>
        <button type="submit">Add</button>
    </form>
</template>

<script>
export default {
    methods: {
        submittask() {
            // alert('submitted task: '+this.name);
            if(this.name === '') return;
            this.$emit('taskAdded', this.name);
            this.name = '';
        }
    },
    data() {
        return {
            name: ''
        }
    }
};
</script>