<template>
    <form class="stack-small" @submit.prevent="onSubmit">
        <div>
            <label class="edit-label">Edit Name for &quot;{{ label }}&quot;</label>
            <br>
            <input :id="id" type="text" autocomplete="off" v-model.lazy.trim="newLabel" />
        </div>
        <div class="btn-group">
            <button type="button" class="btn" @click="onCancel">
                Cancel
                <span class="visually-hidden">editing {{ label }}</span>
            </button>
            <button type="submit" class="btn btn__primary">
                Save
                <span class="visually-hidden">edit for {{ label }}</span>
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
    },
    data() {
        return {
            newLabel: this.label,
        };
    },
    methods: {
        onSubmit() {
            if (this.newLabel && this.newLabel !== this.label) {
                this.$emit("item-edited", this.newLabel);
            }
        },
        onCancel() {
            this.$emit("edit-cancelled");
        },
    },
};
</script>