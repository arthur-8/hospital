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
      数据字典列表
    </div>
    <div>
      <div style="padding-left: 85%">
        <el-button @click="exportDict()" style="color: #f56c6c">导出</el-button>
        <el-button @click="importDict()" style="color: #f56c6c">导入</el-button>
      </div>
        <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="名称" width="300" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>             
          </template>
        </el-table-column>
        <el-table-column label="编码" width="280" align="center">
           <template slot-scope="scope">
            <span>{{ scope.row.dictCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值" width="280" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
         </el-table
      > 
    </div>
    <div>
      <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
        <el-form label-position="right" label-width="170px">
          <el-form-item label="文件">
            <el-upload
              :multiple="false"
              :on-success="onUploadSuccess"
              :action="'http://localhost:8202/admin/cmn/dict/importDict'"
              class="upload-demo"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传xls文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogImportVisible = false"> 取消 </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dict from "@/api/cmn/dict";
export default {
  data() {
    return {
      list: [],
      dialogImportVisible:false,
    };
  },
  created() {
    this.getDictList(1);
  },
  methods: {
    onUploadSuccess(response){
      //console.log(response)
      if(response.code===200){
        this.$message.info('上传成功')
        this.dialogImportVisible=false
        this.getDictList(1)
      }  
    },
    importDict() {
      this.dialogImportVisible=true
    },
    exportDict() {
      window.location.href = "http://localhost:8202/admin/cmn/dict/exportDict";
    },
    getDictList(id) {
      dict
        .getDictList(id)
        .then((response) => {
          //console.log(response.data)
          this.list = response.data;
          //console.log(this.list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChildrens(tree, treeNode, resolve) {
      dict.getDictList(tree.id).then((response) => {
        resolve(response.data);
      });
    },
  },
};
</script>