<template>
  <div>
    <div
      style="
        margin-top: 12px;
        margin-bottom: 12px;
        text-align: center;
        color: #f56c6c;
      "
    >
      身份信息管理设置
    </div>
    
    <el-form :inline="true" class="demo-form-inline">
         <el-form-item>
              <el-input v-model="searchObject.userName" placeholder="姓名" />
         </el-form-item
      >
         <el-form-item>
              <el-input v-model="searchObject.idNumber" placeholder="身份证号码" />
          </el-form-item
      >
         <el-button
        type="primary"
        icon="el-icon-search"
        @click="getPersonPageList()"
        >查询</el-button
      >
    </el-form>
    
    <div>
      <el-button type="danger"
            size="mini" @click="deletePersons()">批量删除</el-button>
    </div>
    <el-table :data="list" border style="width: 100%" @selection-change="selectIds">
      <el-table-column  type="selection" label="批量删除" width="80px" >
      </el-table-column>
      <el-table-column type="index" label="序号" width="80px">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="100"
      ></el-table-column>
      <el-table-column prop="userAddress" label="家庭住址" width="250px">
      </el-table-column>
      <el-table-column prop="userBirthday" label="出生年月" width="120px">
      </el-table-column>
      <el-table-column
        prop="nativePlace"
        label="籍贯"
        width="250px"
      ></el-table-column>
      <el-table-column
        prop="idNumber"
        label="身份证号码"
        width="150px"
      ></el-table-column>
     
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deletePerson(scope.row.id)"
          ></el-button>
          
          <router-link :to="'/person/edit/'+scope.row.id">
          <el-button
            type="primary"
            size="mini"
          >编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0;  text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getPersonPageList"
    />
  </div>
</template>
  </el-table>
  </div>
</template>
<script>

import deletePerson from "@/api/person/person.js";

import  getPersonPageList from "@/api/person/person.js";

export default {
  data() {
    return {
      current: 1,
      limit: 3,
      searchObject: {},
      list: [],
      total: 0,
      page: 1,
      deletedIds:[]
    };
  },
  created() {
    this.getPersonPageList();
  },
  methods: {
    
    selectIds(selection){
      //console.log(selection)
      this.deletedIds=selection
    },
    deletePersons(){
      this.$confirm("此操作将永久批量删除身份设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        var idList=[]
        this.deletedIds.forEach(element => {
          idList.push(element.id)
        });
        //console.log(idList)
        deletePerson.deletePersons(idList).then(()=>{
          this.$message({
            type: 'success',
            message:'删除成功!'
          })
          this.getPersonPageList(1)
        })
        }
      )
    },
    getPersonPageList(page = 1) {
      this.current = page;
      getPersonPageList
        .getPersonPageList(this.current, this.limit, this.searchObject)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
          //console.log(this.list);
          //console.log(this.total);
          //console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePerson(id) {
      this.$confirm("此操作将永久删除身份信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
          deletePerson.deletePerson(id).then(
            ()=>{
              this.$message({
              type:'success',
              message:'删除成功!'
            })
            this.getPersonPageList(1)
            }
          )}
      )
    },
  },
};
</script>
