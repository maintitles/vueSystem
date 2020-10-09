<template>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false">
        <el-form :rules="rules" ref="ruleForm" :model="form" label-width="100px" size="small" class="form-box">
            <el-form-item label="名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="等级" prop="level">
                <el-select v-model="form.level" placeholder="请输入等级">
                    <el-option label="初级" value="初级"></el-option>
                    <el-option label="中级" value="中级"></el-option>   
                    <el-option label="高级" value="高级"></el-option>    
                </el-select>
            </el-form-item>  
            
            <el-form-item label="人数" prop="count">
                <el-input v-model="form.count" placeholder='请输入人数'></el-input> 
            </el-form-item>
            <el-form-item label="时间" prop="date">
                <el-date-picker 
                    type="date" 
                    placeholder='选择时间' 
                    v-model="form.date" 
                    value-format="yyyy-MM-dd">
                    
                </el-date-picker>
            </el-form-item>
            <el-form-item label="技术" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio label="vue" name="type"></el-radio>
                    <el-radio label="react" name="type"></el-radio>
                    <!-- <el-radio label="angular" name="type"></el-radio> -->
                    <el-radio label="node" name="type"></el-radio>
                    <el-radio label="typescript" name="type"></el-radio>
                    <el-radio label="javascript" name="type"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('closeDialog')" size="small">取消</el-button>
            <el-button @click="submitForm('ruleForm')" type="primary" size="small">确定</el-button>
        </span> 
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
        };
        @Provide() rules:any = {
            title:[{required:true,message:"请输入课程名称",trigger:"blur"}],
            lever:[{required:true,message:"请输入等级",trigger:"change"}],
            count:[{required:true,message:"请输入人数",trigger:"blur"}],
            date:[{required:true,message:"请选择时间",trigger:"change"}],
            type:[{required:true,message:"请输入技术",trigger:"change"}]
        };
        submitForm(formName:any){
            (this.$refs[formName] as any).validate((valid:boolean) => {
                if(valid){
                    (this as any).$axios.post(`/api/profiles/edit/${this.form._id}`).then((res:any) => {
                        // console.log(res)
                        this.$emit("closeDialog");
                        this.$message({
                            message:res.data.msg,
                            type:"success"
                        })
                    })
                }
            });
        }
        created(){
            console.log(this.dialogVisible)
        }
    }
</script>

<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>

