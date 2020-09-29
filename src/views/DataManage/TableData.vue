<template>
    <div class="table-data">
        <div class="search-box">
            <el-input size="small" placeholder="请输入" v-model="searchVal">
                
            </el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">
                搜索
            </el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" :height="tHight" class="table-box">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column label="名称" prop="title"></el-table-column>   
            <el-table-column label="等级" prop="level"></el-table-column>   
            <el-table-column label="技术" prop="type"></el-table-column>
            <el-table-column label="人数" prop="count"></el-table-column> 
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages" ref="page-box">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <EditDialog :dialogVisible="dialogVisible" :form="formData"></EditDialog>
    </div>
</template>

<script lang="ts">
    import { Component , Vue , Provide} from "vue-property-decorator";
    import EditDialog from "./EditDialog.vue"
    @Component({
        components:{
            EditDialog
        }
    })
    export default class TableData extends Vue {
        @Provide() searchVal:string = "";
        @Provide() tHight:number = document.body.offsetHeight - 270;
        @Provide() tableData:any = [];
        @Provide() page:number = 1;
        @Provide() size:number = 10;
        @Provide() total:number = 0;

        @Provide() dialogVisible:Boolean = false;//是否展示编辑页面
        @Provide() formData:object = {
            title:"",
            type:"",
            level:"",
            count:"",
            date:""
        }
        handleEdit(index:number,row:object){
            console.log(index,row)
            this.dialogVisible = true;
            this.formData = row;
        }
        created(){
            this.loadData()
        }
        loadData(){
            (this as any).$axios(`/api/profiles/loadMore/${this.page}/${this.size}`).then((res:any) => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
                console.log(res)
            })
        }
        handleSizeChange(val:number):void{
            this.size = val;
            this.page = 1;
            // this.loadData()
            this.searchVal ? this.loadSearchData():this.loadData();
        }
        handleCurrentChange(val: number): void{
            this.page = val;
            // this.loadData()
            this.searchVal ? this.loadSearchData():this.loadData();
        }
        handleSearch(){
            this.page = 1;
            
            this.searchVal ? this.loadSearchData():this.loadData();
        }
        loadSearchData(){
            // 加载搜索的数据
            (this as any).$axios(`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`).then((res:any) => {
                console.log(res)
                this.tableData = res.data.datas.list;
                this.total = res.data.datas.total;
            })
        }
    }
</script>

<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
