<template>
    <div class="modal">
        <div class="modal-content">
            <form class="stack-small" @submit.prevent="onSubmit">
                <div>
                    <label class="edit-label">Edit <span v-if="label!=''">&quot;{{ label }}&quot;</span></label>
                    <br>
                    <input :id="id" type="text" autocomplete="off" v-model.lazy.trim="newLabel" required="true"/>
                    <input type="date" autocomplete="off" v-model="newDue"/>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn" @click="onCancel">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn__primary" :disabled="!available()">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        due: {
            type: Date,
            required: true,
        },
    },
    methods: {
        onSubmit() {
            if (this.available()) {
                this.$emit("item-edited", this.newLabel, new Date(this.newDue).setHours(12, 0, 0, 0));
            }
        },
        onCancel() {
            this.$emit("edit-cancelled");
        },
        formatTime2(date)
        {
            if(date === '') return '';
            date = new Date(date);
            return date.toISOString().split('T')[0];
        },
        available(){
            return this.newLabel&&(this.newLabel !== this.label || Date(this.newDue) !== Date(this.due));
        }
    },
    data() {
        return {
            newLabel: this.label,
            newDue: this.formatTime2(this.due),
        };
    },
};
</script>