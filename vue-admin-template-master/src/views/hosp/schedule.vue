<template>
      
  <div class="app-container">
            
    <div style="margin-bottom: 10px; font-size: 10px">
      选择：{{ baseMap.hosname }}  /  {{ depname }}  /  {{ workDate }}
    </div>
        <el-container style="height: 100%">
            <el-aside width="200px" style="border: 1px silver solid">
                        <!-- 部门 -->
                <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
                </el-tree
        >
           
      </el-aside>
      <el-main style="padding: 0 0 0 20px">
            <el-row style="width: 100%">
                          <!-- 排班日期 分页 -->
          <el-tag
            v-for="(item, index) in bookingScheduleList"
            :key="item.id"
            @click="selectDate(item.workDate, index)"
            :type="index == activeIndex ? '' : 'info'"
            style="
              height: 60px;
              margin-right: 10px;

              cursor: pointer;
            "
          >
            {{ item.workDate }} {{ item.dayOfWeek }}<br />
             {{ item.availableNumber }} / {{ item.reservedNumber }}
          </el-tag>
                              <!-- 分页 -->
          <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            class="pagination"
            layout="prev, pager, next"
            @current-change="getPage"
          >
          </el-pagination>
        </el-row>
        <el-row style="margin-top: 20px">
                          <!-- 排班日期对应的排班医生 -->
          <el-table
            v-loading="listLoading"
            :data="scheduleList"
            border
            fit
            highlight-current-row
          >
            <el-table-column  label="序号"  width="60" align="center">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="职称" width="150">
               <template slot-scope="scope">  {{scope.row.title}} | {{scope.row.docname}}
               </template >
            </el-table-column>
            <el-table-column  label="号源时间"  width="80">
               <template slot-scope="scope">{{ scope.row.workTime == 0 ? "上午" : "下午"}}</template>
            </el-table-column>
            <el-table-column prop="reservedNumber"  label="可预约数" width="80" />
            <el-table-column prop="availableNumber" label="剩余预约数" width="100"/>
            <el-table-column prop="amount" label="挂号费(元)" width="90"/>
            <el-table-column prop="skill" label="擅长技能"/>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
        
  </div>
</template>
<script>
import hospApi from "@/api//hosp/hosp.js";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "depname",
      },
      hoscode: null,
      baseMap: {},
      page: 1,
      limit: 7,
      depcode: null,
      depname: null,
      activeIndex: 0,
      workDate: null,
      bookingScheduleList: [],
      total: 0,
      scheduleList: [],
      listLoading:false
    };
  },
  created() {
    this.hoscode = this.$route.params.hoscode;
    this.workDate = this.getCurDate();
    this.fetchHospSchedule();
  },
  methods: {
    fetchHospSchedule() {
      hospApi.fetchHospScheduleByHosCode(this.hoscode).then((response) => {
        //console.log(response.data)
        this.data = response.data;
        if (this.data.length > 0) {
          this.depcode = this.data[0].children[0].depcode;
          this.depname = this.data[0].children[0].depname;
          this.getPage();
        }
      });
    },
    handleNodeClick(data) {
      if (data.children != null) {
        return;
      }
      this.depcode = data.depcode;
      this.depname = data.depname;
      this.getPage(1);
    },
    getPage(page = 1) {
      this.page = page;
      this.workDate = null;
      this.scheduleList=[]
      this.activeIndex = 0;
      this.getScheduleRule();
    },
    getScheduleRule() {
      hospApi
        .findScheduleDetail(this.page, this.limit, this.hoscode, this.depcode)
        .then((response) => {
          this.bookingScheduleList = response.data.bookingScheduleRuleList;
          this.total = response.data.total;
          this.baseMap = response.data.baseMap;
          if (this.workDate === null) {
            this.workDate = this.bookingScheduleList[0].workDate;
          }
          this.getDetailSchedule();
        });
      
    },
    selectDate(workDate, index) {
      this.workDate = workDate;
      this.activeIndex = index; //调用查询排班详情
      this.getDetailSchedule();
    },
    getCurDate() {
      var datetime = new Date();
      var year = datetime.getFullYear();
      var month =
        datetime.getMonth() + 1 < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1;
      var date =
        datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      return year + "-" + month + "-" + date;
    },
    getDetailSchedule() {
      //console.log(this.workDate)
      hospApi.getDetailSchedule(this.hoscode, this.depcode, this.workDate).then((response) => {
        //console.log(response.data)
        this.scheduleList = response.data
        //console.log(this.scheduleList)
        });
    },
    
  },
};
</script>