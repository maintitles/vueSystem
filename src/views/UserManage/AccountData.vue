<template>
    <div class="account-data">
        <div class="add-box">
            <el-button @click="addAccount" type="promary">新增账户</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="角色">
                <template slot-scope="scope">
                    <span>{{scope.row.role}}</span>   
                </template>
            </el-table-column>
            <el-table-column label="账户">
                <template slot-scope="scope">
                    <span>{{scope.row.username}}</span>   
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    <span>{{scope.row.role}}</span>   
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <AddAccount :dialogVisible="dialogVisible"></AddAccount>
    </div>
</template>
<script lang="ts">
    import { Component , Vue , Provide } from "vue-property-decorator";
    import AddAccount from "./AddAccount.vue"
    @Component({
        components:{AddAccount}
    })
    export default class AccountData extends Vue {
        @Provide() tableData:any = [];
        @Provide() dialogVisible:boolean = false;
        created(){
            this.getData();
        }
        // 新增客户
        addAccount(){
            this.dialogVisible = true;
        }
        // 获取所有的用户
        getData(){
            (this as any).$axios("/api/users/allUsers")
            .then((res:any) => {
                // 获取所有的用户
                this.tableData  = res.data.datas;
            })
        }
    }


</script>

<style lang="scss" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>