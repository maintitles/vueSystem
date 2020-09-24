<template>
    <div class="login">
        <LoginHeader>
            <el-form
                ref="ruleForm"
				:rules = "rules"
                :model="ruleForm"
                slot="container"
                label-position="left"
                label-width="0px"
            >
                <div class="title">
                    <h3>账号密码登陆</h3>
                </div>
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" placeholder="请输入账号" >
						<i slot="prefix" class="fa fa-user-o"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码" >
						<i slot="prefix" class="fa fa-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="isLogin" class="onSubmit" type="primary" @click.native.prevent="handleSubmit">登录</el-button>
				</el-form-item>
				<el-form-item>
					<el-checkbox label="7天内自动登录" :checked="ruleForm.autoLogin"></el-checkbox>
					<el-button @click="$router.push('/password')" class="forget">忘记密码？</el-button>
				</el-form-item>
            </el-form>
        </LoginHeader>
    </div>
</template>

<script lang="ts">
import { Component,Vue , Provide} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LoginHeader from "./LoginHeader.vue";
@Component({
    components: {
        LoginHeader,
    },
})
export default class Login extends Vue {
    // 存储用户信息
    @Action("setUser") setUser:any;
	@Provide() isLogin:boolean = false;
    @Provide() ruleForm: {
        username: String,
        pwd: String,
        autoLogin: boolean
    } = {
        username: "",
        pwd: "",
        autoLogin: true //是否自动登录
	};
	@Provide() rules = {
		username:[{ required: true, message: '请输入账号', trigger: 'blur' }],
		pwd:[{ required: true, message: '请输入密码', trigger: 'blur' }]
	}
	handleSubmit():void{
		(this.$refs["ruleForm"] as any).validate((valid:boolean) => {
			console.log("验证通过")
			if (valid) {
				this.isLogin = true;
				// 网络请求
				(this as any).$axios
				.post("/api/users/login", this.ruleForm)
				.then((res: any) => {
					this.isLogin = false;
					console.log(res.data);
					localStorage.setItem("tsToken",res.data.token);
                    // 存储到 vuex中
                    this.setUser(res.data.token);
					this.$router.push("/");
				})
				.catch(() => {
					this.isLogin = false;
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
.onSubmit{
	width: 100%;
}
.forget {
    float: right;
}
</style>