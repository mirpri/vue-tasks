<template>
    <div v-if="!isEditing" class="title-bar">
        <h1 >{{ ntitle }}</h1>
        &nbsp;&nbsp;
        <button class="icon" @click="isEditing=true">edit</button>
        <button class="icon" @click="$emit('deleteList')">delete</button>
    </div>
    <div v-else class="title-bar" >
        <input :value="ntitle"/>
        &nbsp;&nbsp;
        <button class="icon" @click="setTitle">done</button>
        <button class="icon" @click="isEditing=0">cancel</button>
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
            ntitle:this.title,
        };
    }, 
    methods: {
        setTitle() {
            this.ntitle = this.$el.querySelector('input').value;
            // alert('title changed to ' + this.ntitle);
            this.$emit('titleChanged', this.ntitle);
            this.isEditing = false;
        },
    },
};


</script>