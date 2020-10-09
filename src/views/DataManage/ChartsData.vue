<template>
    <div class="charts-data">
        <el-tabs type="border-card" v-model="tabPosition">
            <el-tab-pane label="折线图" name="line">
                <Charts :chartsData="chartsData" chartType="line"></Charts>
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="bar">
                <Charts :chartsData="chartsData" chartType="bar"></Charts>
            </el-tab-pane>
            <el-tab-pane label="扇形图" name="pie">
                <Charts :chartsData="chartsData" chartType="pie"></Charts>
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script lang="ts">
    import { Component , Vue , Provide ,Prop} from "vue-property-decorator";
    import Charts from "../../components/Charts.vue"
    @Component({
        components:{
            Charts
        }
    })
    export default class ChartsData extends Vue {
        @Provide() tabPosition:string = "line";
        @Provide() chartsData:any = {
            xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    }
</script>

<style lang="scss">

</style>
