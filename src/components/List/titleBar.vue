<template>
    <div class="title-bar">
    <h1 v-if="!isEditing">{{ title }}</h1>
    &nbsp;&nbsp;
    <button class="icon">edit</button>
    <button class="icon">delete</button>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isEditing: false,
            newName: this.title,
        };
    }, 
};


</script>