<template>
    <div class="home">
		<div class="home-body">
            <h4 class="title">欢迎来访！</h4>
            <p class="des">走过了人来人往，不喜欢也得欣赏！</p>
            <el-button @click="learn">
                打开网站
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
	import { Component , Vue} from "vue-property-decorator";
	@Component({
		components:{

		}
	})
	export default class Home extends Vue {
        learn():void{
            window.open("https://www.baidu.com/")
        }
    }
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat;
  background-size: 100% 100%;
  .home-body {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    padding: 100px;
    box-sizing: border-box;
    .title {
      font-size: 32px;
      font-weight: bold;
      line-height: 60px;
    }
    .des {
      font-size: 18px;
      margin: 40px 0;
    }
  }
}
</style>
