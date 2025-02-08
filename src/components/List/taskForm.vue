<template>
    <form @submit.prevent="submittask" @focusin="isFoucus += 1" @focusout="focusOut">
        <div class="flex-div">
            <input type="text"
                id="newtask-input" 
                autocomplete="off" 
                placeholder="Add a task"
                v-model.lazy.trim="name"
                class="highlightinput"
                required>
            <button type="submit" class="icon iconbutton">add</button>
        </div>
        <div :class="isFoucus>0?'btn-div':'hidden'">
            <label class="badge">
                <input type="radio" v-model="days" value="0"> today
            </label>
            <label class="badge">
                <input type="radio" v-model="days" value="1"> +1d
            </label>
            <label class="badge">
                <input type="radio" v-model="days" value="u"> unset
            </label>
            <button type="button" @click="openEditor">...
                <span v-if="days!='u' && days>2" class="badge moderate">+{{ days }}d</span>
                <span v-if="days!='u' && days<0" class="badge danger">-{{ -days }}d</span>
            </button>
        </div>
    </form>

    <taskEditor v-if="isEditing" :id="0" :label="name" :due="due" @item-edited="editTask"
        @edit-cancelled="isEditing=false"></taskEditor>
</template>


<script>
import taskEditor from './taskEditor.vue';

export default {
    components: {
        taskEditor,
    },
    methods: {
        submittask() {
            // alert('submitted task: '+this.name);
            if(this.name === '') return;
            if(this.days=='u')this.due='';
            else {
                this.due=new Date().setHours(0,0,0,0);
                this.due+=this.days*86400000;
                this.due=new Date(this.due);
            }        
            this.$emit('taskAdded', {name:this.name, due:this.due});
            this.name = '';
        },
        focusOut() {
            setTimeout(() => {
                this.isFoucus -= 1;
            }, 100);
        },
        openEditor() {
            if(this.days!='u'){
                this.due=new Date();
                this.due.setDate(this.due.getDate()+this.days);
            } else {
                this.due='';
            }
            // alert(this.due);
            this.isEditing = true;
        },
        editTask(newName, newDue) {
            if (newDue == 'Invalid Date') newDue = '';
            this.name = newName;
            this.due = newDue;
            this.days = this.due === '' ? 'u' : (this.due- new Date().setHours(0,0,0,0))/86400000;
            this.isEditing = false;
        },
    },
    data() {
        return {
            name: '',
            days: 0,
            due: new Date().setHours(0, 0, 0, 0),
            isFoucus: 0,
            isEditing: false,
        }
    }
};
</script>