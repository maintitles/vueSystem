<template>
    <el-container class="layout-content">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <slot name="left"></slot>
        </el-aside>
        <!-- 右侧页面
         -->
         <el-main>
            <div class="top">
                <i class="fa fa-reorder"></i>
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item v-for="(item,index) in breadCrumbItems" :key="index" :to="{path:item.path}">{{ item.title }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 页面内容 -->
            <div class="content">
                <slot name="content"></slot>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
    import { Component , Vue , Provide , Watch} from "vue-property-decorator";
    @Component({
        components:{

        }
    })
    export default class Content extends Vue {
        @Provide() breadCrumbItems:any;
        @Watch("$route") handleRouteChange(to: any) {
            this.initBreadCrumbItems(to);
        }
        created(){
            console.log(this);
            this.initBreadCrumbItems(this.$route)
        }
        initBreadCrumbItems(router:any){
            console.log(router);
            let breadcrumbList:any = [
                {path:"/",title:"后台管理系统"}
            ]
            for(const index in router.matched){
                if(router.matched[index].meta && router.matched[index].meta.title){
                    breadcrumbList.push({
                        path:router.matched[index].path ? router.matched[index].path : "/",
                        title:router.matched[index].meta.title
                    })
                }
            }
            this.breadCrumbItems = breadcrumbList;
        }
    }
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>
