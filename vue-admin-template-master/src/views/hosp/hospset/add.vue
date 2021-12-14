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
      <div v-if="hospitalSet.id">医院管理设置编辑</div><div v-else>医院管理设置添加</div>
    </div>
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      
    >
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"></el-input>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="hospitalSet.contactsPhone"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="mini"
            @click="saveUpdateHospitalSet()"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import hospitalSet  from "@/api/hosp/hospitalSet.js"
export default {
  data() {
    return {
      labelPosition: 'right',
      hospitalSet:{}
    };
  },
  created() {
    if(this.$route.params && this.$route.params.id){
      this.getHospital(this.$route.params.id)
    }
  },
  methods: {
    getHospital(id){
      hospitalSet.getHospitalSet(id).then(
        response=>{
          //console.log(response.data)
          this.hospitalSet=response.data
          }
      )
    },
    saveUpdateHospitalSet(){
      if(this.hospitalSet.id){
        this.updateHospitalSet()
      }else{
        this.saveHospitalSet()
      }
    },
    saveHospitalSet(){
      hospitalSet.saveHospitalSet(this.hospitalSet).then(
        ()=>{
          this.$message({
            type: 'success',
            message:'添加成功!'
          })
          this.$router.push(
            {
              path: '/hospSet/list'
            }
          )
        }
      )
    },
    updateHospitalSet(){
      hospitalSet.updateHospitalSet(this.hospitalSet).then(
        ()=>{
          this.$message({
            type: 'success',
            message:'修改成功!'
          })
          this.$router.push(
            {
              path: '/hospSet/list'
            }
          )
        }
      )
    }
  },
};
</script>