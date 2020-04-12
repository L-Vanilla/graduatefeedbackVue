<!---系统后台页头--Vanilla-->
<template>
    <div>
         <el-breadcrumb v-if="arrmenu.length!=0" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(txt,index) in arrmenu" :key="index">{{txt}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    import store from '@/vuex/store'
    import {mapState} from 'vuex'
    export default {
        name:'myBreadcrumb',
        computed:{
            ...mapState(['arrmenu'])
        },
        store
    }
</script>

<style scoped>

 
</style>
