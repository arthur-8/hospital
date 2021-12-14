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
      医院管理设置
    </div>
    
    <el-form :inline="true" class="demo-form-inline">
         <el-form-item>
              <el-input v-model="searchObject.hosname" placeholder="医院名称" />
         </el-form-item
      >
         <el-form-item>
              <el-input v-model="searchObject.hoscode" placeholder="医院编号" />
          </el-form-item
      >
         <el-button
        type="primary"
        icon="el-icon-search"
        @click="getHospitalSetList()"
        >查询</el-button
      >
    </el-form>
    
    <div>
      <el-button type="danger"
            size="mini" @click="deleteHospitalSets()">批量删除</el-button>
    </div>
    <el-table :data="list" border style="width: 100%" @selection-change="selectIds">
      <el-table-column  type="selection" label="批量删除" width="80px" >
      </el-table-column>
      <el-table-column type="index" label="序号" width="80px">
      </el-table-column>
      <el-table-column
        prop="hosname"
        label="医院名称"
        width="160"
      ></el-table-column>
      <el-table-column prop="hoscode" label="医院编号" width="100px">
      </el-table-column>
      <el-table-column prop="apiUrl" label="api基础路径" width="200px">
      </el-table-column>
      <el-table-column
        prop="contactsName"
        label="医院联系人"
        width="100px"
      ></el-table-column>
      <el-table-column
        prop="contactsPhone"
        label="联系人电话"
        width="150px"
      ></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteHospitalSet(scope.row.id)"
          ></el-button>
          <el-button
            v-if="scope.row.status===1"
            type="danger"
            size="mini"
            @click="updateLockHospitalSet(scope.row.id,0)"
          >锁定</el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="updateLockHospitalSet(scope.row.id,1)"
          >取消锁定</el-button>
          <router-link :to="'/hospSet/edit/'+scope.row.id">
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
      @current-change="getHospitalSetList"
    />
  </div>
</template>
  </el-table>
  </div>
</template>
<script>
import getHospitalSetList from "@/api/hosp/hospitalSet.js";
import deleteHospitalSet from "@/api/hosp/hospitalSet.js";

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
    this.getHospitalSetList();
  },
  methods: {
    updateLockHospitalSet(id,status){
      deleteHospitalSet.lockHospitalStatus(id,status).then(
        ()=>{
          this.getHospitalSetList(this.current)
        }
      ).catch(
        error=>{
          console.log(error)
        }
      )
    },
    selectIds(selection){
      //console.log(selection)
      this.deletedIds=selection
    },
    deleteHospitalSets(){
      this.$confirm("此操作将永久批量删除医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        var idList=[]
        this.deletedIds.forEach(element => {
          idList.push(element.id)
        });
        //console.log(idList)
        deleteHospitalSet.deleteHospitalSets(idList).then(()=>{
          this.$message({
            type: 'success',
            message:'删除成功!'
          })
          this.getHospitalSetList(1)
        })
        }
      )
    },
    getHospitalSetList(page = 1) {
      this.current = page;
      getHospitalSetList
        .getHospitalSetList(this.current, this.limit, this.searchObject)
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
    deleteHospitalSet(id) {
      this.$confirm("此操作将永久删除医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
          deleteHospitalSet.deleteHospitalSet(id).then(
            ()=>{
              this.$message({
              type:'success',
              message:'删除成功!'
            })
            this.getHospitalSetList(1)
            }
          )}
      )
    },
  },
};
</script>
