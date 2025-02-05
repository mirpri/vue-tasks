<template>
    <div>
        <input type="checkbox" :id="id" :checked="isDone">
        <label :for="id">{{name}}</label> <!--for attribute means that the label is for the input with the same id-->
    </div>
</template>

<script>


export default {
    props: {
        name: {required: true, type: String},
        done: {default: false, type: Boolean},
        id: {required:true, type: String}
    },
    data() {
        return {
            isDone: this.done,
        }
    }
};
</script>