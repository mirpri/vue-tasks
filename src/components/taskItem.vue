<template>
    <div class="task-item">
        <div>
            <input type="checkbox" :id="id" @change="$emit('toggleDone')" :checked="isDone">
            <label :for="id">{{ name }}</label>
            <!--for attribute means that the label is for the input with the same id-->
        </div>
        <div>
            <button @click="$emit('deleteTask')" class="danger">Del</button>
            <button @click="isEditing=true" class="moderate">Edit</button>
        </div>
    </div>

    <div class="modal" v-if="isEditing">
        <div class="modal-content">
            <taskEditor :id="id" :label="name" @item-edited="editTask"
            @edit-cancelled="isEditing=false"></taskEditor>
        </div>
    </div>
</template>

<script>

import taskEditor from './taskEditor.vue';

export default {
    components: {
        taskEditor,
    },
    props: {
        name: { required: true, type: String },
        done: { default: false, type: Boolean },
        id: { required: true, type: String }
    },
    data() {
        return {
            isDone: this.done,
            isEditing: false,
        }
    },
    methods:{
        editTask(newName){
            this.$emit('editTask', newName);
            this.isEditing = false;
        }
    }
};
</script>