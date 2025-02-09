<template>
    <div class="title-bar">
        <button class="icon" @click="addList">add</button>
        <button class="icon" @click="clearData">delete_forever</button>
        <button class="icon " @click="showAbout">info</button>
    </div>
</template>

<script>

export default {
    methods: {
        addList() {
            this.$emit('addList');
        },
        showAbout() {
            alert("Tasks App\nVersion: 1\nDeveloped by: Mirpri")
        },
        clearData() {
            this.$emit('clearData');
        },
    },
};
</script>