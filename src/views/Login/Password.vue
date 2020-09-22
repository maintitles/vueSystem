<template>
    <div class="password">
        <LoginHeader>
            <el-form
                slot="container"
                label-position="left"
                label.width="0px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
            >
                <div class="title">
                    <h3>找回密码</h3>
                </div>
                <el-form-item prop="username">
                    <el-input placeholder="账号" v-model="ruleForm.username">
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input placeholder="邮箱" v-model="ruleForm.email">
                        <i slot="prefix" class="fa fa-envelope-o"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        @click.native.prevent="handleSubmit"
                        :loading = loading
                        type="primary"
                        style="width:100%"
                    >确定</el-button>
                </el-form-item>
            </el-form>
        </LoginHeader>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import LoginHeader from "./LoginHeader.vue";
@Component({
    components: {
        LoginHeader,
    },
})
export default class Password extends Vue {
    @Provide() loading:boolean  = false;
    @Provide() ruleForm: {
        username: String;
        email: String;
    } = {
        username: "",
        email: "",
    };
    @Provide() rules = {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        email: [
            {
                required: true,
                message: "请输入邮箱地址",
                trigger: "blur"
            },
            {
                type:"email",
                message: "请输入正确得邮箱地址",
                trigger: "blur,change"
            }
        ]
    };
    handleSubmit(): void {
        (this.$refs["ruleForm"] as any ).validate((valid:boolean) => {
            if(valid){
                this.loading = true;
                (this as any).$axios.post("/api/users/findPwd",this.ruleForm).then((res:any) => {
                    this.loading = false;
                    console.log(res)
                    this.$message({
                        message:res.data.msg,
                        type:"success"
                    })
                    this.$router.push("/login")
                })
                .catch(() => {
                    this.loading = false;
                })
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

i {
    font-size: 14px;
    margin-left: 8px;
}
</style>