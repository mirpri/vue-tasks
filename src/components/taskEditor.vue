<template>
    <form class="stack-small" @submit.prevent="onSubmit">
        <div>
            <label class="edit-label">Edit &quot;{{ label }}&quot;</label>
            <br>
            <input :id="id" type="text" autocomplete="off" v-model.lazy.trim="newLabel" />
            <input type="date" autocomplete="off" v-model="newDue"/>
        </div>
        <div class="btn-group">
            <button type="button" class="btn" @click="onCancel">
                Cancel
            </button>
            <button type="submit" class="btn btn__primary">
                Save
            </button>
        </div>
    </form>
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
            if (this.newLabel && (this.newLabel !== this.label || this.newDue !== this.due)) {
                this.$emit("item-edited", this.newLabel, new Date(this.newDue));
            }
        },
        onCancel() {
            this.$emit("edit-cancelled");
        },
        formatTime2(date)
        {
            if(date === '') return '';
            return date.toISOString().split('T')[0];
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