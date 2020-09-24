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
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
    import { Component , Vue} from "vue-property-decorator";
    @Component({
        components:{

        }
    })
    export default class Content extends Vue {}
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
