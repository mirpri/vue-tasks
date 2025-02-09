<template>
    <div class="task-item" :id="id">
        <div class="itemLabel">
            <input type="checkbox" :id="id" @change="$emit('toggleDone')" :checked="isDone">
            <label :for="id">{{ name }}</label>
            <span v-if="due!=='' && (dateStat(due)==='future' || done)" class="badge">{{formatTime(due)}}</span>
            <span v-else-if="due!=='' && dateStat(due)==='past'" class="badge danger">{{formatTime(due)}}</span>
            <span v-else-if="due!=='' && dateStat(due)==='today'" class="badge moderate">{{formatTime(due)}}</span>
            <!--for attribute means that the label is for the input with the same id-->
        </div>
        <div>
            <button @click="isEditing=true" class="iconbutton icon">edit</button>
            <button @click="delTask()" class="iconbutton danger icon">delete</button>
        </div>
    </div>

    <taskEditor v-if="isEditing" :id="id" :label="name" :due="due" @item-edited="editTask"
        @edit-cancelled="isEditing=false"></taskEditor>
   
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
        id: { required: true, type: String },
        due: { default:'', type: Date},
    },
    data() {
        return {
            isDone: this.done,
            isEditing: false,
        }
    },
    methods:{
        delTask(){
            document.getElementById(this.id).classList.add('hidden');
            setTimeout(() => {
                this.$emit('deleteTask');
            }, 300);
        },
        editTask(newName, newDue){
            if(newDue=='Invalid Date') newDue='';
            // alert('task '+newName+' sucessfully edited '+newDue);
            this.$emit('editTask',{ newName:newName , newDue:newDue});
            this.isEditing = false;
        },
        formatTime(date){
            date = new Date(date);
            const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];   
            return months[date.getMonth()] + ' ' + date.getDate();
        },
        dateStat(date) {
            const today = new Date();
            const targetDate = new Date(date);

            // Remove time component for accurate comparison
            today.setHours(0, 0, 0, 0);
            targetDate.setHours(0, 0, 0, 0);

            if (targetDate > today) {
                return 'future';
            } else if (targetDate < today) {
                return 'past';
            } else {
                return 'today';
            }
        }
    }
};
</script>