<template>
    <div class="layout">
        <LayoutHeader />
        <Content>
            <Sidebar slot="left"></Sidebar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
    
</template>

<script lang="ts">
    import { Component , Vue} from "vue-property-decorator";
    import LayoutHeader from "./LayoutHeader.vue"
    import Content from "./Content.vue"
    import Sidebar from "./Sidebar.vue";
    @Component({
        components:{
            LayoutHeader,Content,Sidebar
        }
    })
    export default class Layout extends Vue {}
</script>


<style lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f5f7f9;
    }
</style>

