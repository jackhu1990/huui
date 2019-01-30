<template>
    <div>

        <div :class="$style.test">this is a test component</div>

    </div>
</template>

<script>
    export default {
        name: "Test",
        mounted(){
        }
    }
</script>

<style scoped module>
    .test{
        color: red;
    }
</style>
