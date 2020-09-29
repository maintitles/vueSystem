<template>
    <el-dialog title="编辑" :visible.sync="dialogVisible">
        <el-form ref="ruleForm" :model="form" label-width="100px" size="small" class="form-box"></el-form>  
    </el-dialog>
</template>

<script lang="ts">
    import { Component , Vue , Prop , Provide} from "vue-property-decorator";
    @Component({
        components:{

        }
    })
    export default class Home extends Vue {
        @Prop(Boolean) dialogVisible!: boolean;
        @Prop(Object) form!: {
            title:string,
            type:string,
            level:string,
            count:string,
            date:string,
            _id:string
        }
        created(){
            console.log(this.dialogVisible)
        }
    }
</script>

<style lang="scss" scoped>

</style>
