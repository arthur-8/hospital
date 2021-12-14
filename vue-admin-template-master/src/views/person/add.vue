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
      <div v-if="person.id">身份信息管理设置编辑</div><div v-else>身份信息管理设置添加</div>
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
      <el-form-item label="姓名">
        <el-input v-model="person.userName"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="person.userAddress"></el-input>
      </el-form-item>
      <el-form-item label="出生年月">
        
        <el-date-picker v-model="person.userBirthday" type="date" placeholder="Pick a day" value-format="yyyy-MM-dd">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="person.nativePlace"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="person.idNumber"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="mini"
            @click="saveUpdatePerson()"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>


import getPersonById from '@/api/person/person.js'
export default {
  data() {
    return {
      labelPosition: 'right',
      person:{}
    };
  },
  created() {
    if(this.$route.params && this.$route.params.id){
      this.getPerson(this.$route.params.id)
    }
  },
  methods: {
    getPerson(id){
      getPersonById.getPersonById(id).then(
        response=>{
          //console.log(response.data)
          this.person=response.data
          }
      )
    },
    saveUpdatePerson(){
      if(this.person.id){
        this.updatePerson()
      }else{
        this.savePerson()
      }
    },
    savePerson(){
      getPersonById.addPerson(this.person).then(
        ()=>{
          this.$message({
            type: 'success',
            message:'添加成功!'
          })
          this.$router.push(
            {
              path: '/person/list'
            }
          )
        }
      )
    },
    updatePerson(){
      console.log(this.person)
      getPersonById.updatePerson(this.person).then(
        ()=>{
          this.$message({
            type: 'success',
            message:'修改成功!'
          })
          this.$router.push(
            {
              path: '/person/list'
            }
          )
        }
      )
    }
  },
};
</script>