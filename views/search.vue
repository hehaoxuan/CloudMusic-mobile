<template>
    <SearchTop/>
</template>
<script lang='ts'>
    import {
        defineComponent
    } from 'vue'
    import searchTop from '../src/components/searchTop.vue'
    export default defineComponent({
        name: 'search',
        components:{
            SearchTop:searchTop
        }
    })
</script>
<style>

</style>