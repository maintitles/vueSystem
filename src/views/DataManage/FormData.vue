<template>
    <div class="form-data">
        <el-form :rules="rules" ref="ruleForm" :model="form" label-width="100px">
            <el-form-item label="名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="等级" prop="level">
                <el-select v-model="form.level" placeholder="请选择等级">
                    <el-option label="初级" value="初级"></el-option>
                    <el-option label="中级" value="中级"></el-option>
                    <el-option label="高级" value="高级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人数" prop="count">
                <el-input v-model="form.count" placeholder="请输入人数"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd">
                       
                </el-date-picker>
            </el-form-item>
            <el-form-item label="技术栈" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio label="vue" name="type"></el-radio>
                    <el-radio label="react" name="type"></el-radio>
                    <el-radio label="node" name="type"></el-radio>
                    <el-radio label="typescript" name="type"></el-radio>
                    <el-radio label="javascript" name="type"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('ruleForm')" type="primary">创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import { Component , Vue , Provide} from "vue-property-decorator";
    @Component({
        components:{

        }
    })
    export default class FromData extends Vue {
        @Provide() form:object = {
            title:"",
            type:"",
            level:"",
            count:"",
            date:""
        }
        @Provide() rules: any = {
            title: [{ required: true, message: "请输入名称", trigger: "blur" }],
            level: [{ required: true, message: "请选择等级", trigger: "change" }],
            count: [{ required: true, message: "请输入人数", trigger: "blur" }],
            date: [
                {
                    type: "string",
                    required: true,
                    message: "请选择日期",
                    trigger: "change"
                }
            ],
            type: [
                {
                    required: true,
                    message: "请选择技术栈",
                    trigger: "change"
                }
            ]
        };
        // 创建
        submitForm(formName:string){

            (this as any).$refs[formName].validate((valid:boolean) => {
                if(valid){
                    (this as any).$axios.post(`api/profiles/add`,this.form).then((res:any) => {
                        this.$message({
                            message:res.data.msg,
                            type:"success"
                        })
                        this.resetForm(formName);
                    })
                }
            })
        }
        //重置
        resetForm(formName:string){
            (this as any).$refs[formName].resetFields();
        }
    }
</script>

<style lang="scss" scoped>
.form-data {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .el-input,
  .el-select {
    width: 200px !important;
  }
  .division {
    margin: 0 10px;
    color: #606266;
  }
}
</style>
