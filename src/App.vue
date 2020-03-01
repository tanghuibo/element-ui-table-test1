<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="workName" label="工号"></el-table-column>

      <el-table-column
        v-for="level1Filed of fileds"
        :prop="level1Filed.code"
        :key="level1Filed.name"
        :label="level1Filed.name"
      >
        <el-table-column
          v-for="level2Filed of level1Filed.fileds"
          :key="level2Filed.code"
          :label="level2Filed.name"
          :prop="`data.${level1Filed.code}.${level2Filed.code}`"
        >
          <el-table-column
            v-for="level3Filed of level2Filed.fileds"
            :key="level3Filed.code"
            :label="level3Filed.name"
            :prop="
              `data.${level1Filed.code}.${level2Filed.code}.${level3Filed.code}`
            "
          ></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import data from "./data.json";
import dataUtil from "./dataUtil.js";
export default {
  mounted() {
    let { fileds, datas } = dataUtil.getTableData(data);
    this.fileds = fileds;
    this.tableData = datas;
  },
  data() {
    return {
      fileds: [],
      tableData: []
    };
  }
};
</script>
