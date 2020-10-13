<template>
    <el-dialog 
        title="新增账户"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        width="30%">
        <el-form :rules="rules" ref="ruleForm" class="form-box" label-width="100px" :model="account">
            <el-form-item label="请选择用户" prop="role">
                <el-select @change="selectChange" v-model="account.role" placeholder="请选择用户角色权限">
                    <el-option v-for="option in options" :key="option.key" :label="option.role" :value="option.role">
                        
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请输入账号" prop="username">
                <el-input v-model="account.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <!-- <el-form-item class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary">确定</el-button>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('closeDialog')">取消</el-button>
            <el-button @click="handleAdd" type="primary">确定</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
    import { Component , Vue , Provide , Prop , Emit} from "vue-property-decorator";

    @Component({
        components:{}
    })
    export default class AddAccount extends Vue {
        // 
        @Prop(Boolean) dialogVisible !: boolean;
        @Prop(Array) options !: any;
        @Provide() account:object = {
            key:"",
            role:"",
            username:"",
            des:""
        }
        @Provide() rules:any = {
            username:[{require:true,message:"请输入账号",trigger:"blur"}],
            role:[{ required: true, message: "请选择角色", trigger: "change" }]
        }
        @Emit('closeDialog')
        // 新增保存
        handleAdd(){
            (this as any).$refs["ruleForm"].validate((valid:boolean) => {
                if(valid){
                    (this as any).$axios.post(`/api/users/addUser`,this.account)
                    .then((res:any) => {
                        this.$emit("update");
                        this.$message({
                            message:res.data.msg,
                            type:"success"
                        })
                        this.dialogVisible = false;
                    })
                }
            })
        }
        // 选择角色权限
        selectChange(select:string){
            console.log(this.options)
            this.options.map((option:any) => {
                if(option.role == select){
                    (this as any).account.key = option.key;
                    (this as any).account.des = option.des;
                }
            })
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