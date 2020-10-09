<template>
    <div class="chart" :style="{width:chartwidth,height:chartHeight}">
        
    </div>
</template>

<script lang="ts">
    import { Component , Vue , Provide , Prop} from "vue-property-decorator";
    import echarts from "echarts"
    @Component({
        components:{
        }
    })
    export default class Charts extends Vue {
        @Prop({type:String,default:"line"}) readonly chartType !: string;//图表类型 line/bar/pie
        @Prop(Object) chartData!:string | null;
        @Provide() chartHeight:string = "";
        @Provide() chartWidth:string = "";
        created(){
            this.getAutoHeight();
        }
        getAutoHeight(){
            //图表的宽度和高度
            this.chartHeight = `${document.body.offestHeight* 0.6}px`
            this.chartwidth = `${document.body.offsetWidth * 0.8 }px`
        }
    }
</script>

<style lang="scss">

</style>
