<template>
    <div>
        <input type="checkbox" id="task-item" :checked="isDone">
        <label for="task-item">{{name}}</label>
    </div>
</template>

<script>
export default {
    props: {
        name: {required: true, type: String},
        done: {default: false, type: Boolean}
    },
    data() {
        return {
            isDone: this.done
        }
    }
};
</script>