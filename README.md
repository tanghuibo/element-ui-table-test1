# table-test

## 试用地址

[https://tanghuibo.github.io/echarts-study](https://tanghuibo.github.io/echarts-study)

## 数据

```json
[
  {
    "workNo": "工号",
    "workName": "姓名",
    "deptName": "部门名称",
    "markData": [
      {
        "sn": "1",
        "showType": "categoryLvl1",
        "categoryName": "一级分类1",
        "categoryField": "lvl1name1",
        "indexData": [
          {
            "indexId": "INDEX-0001",
            "indexName": "指标1",
            "indexField": "indexname1",
            "indexValue": 0,
            "disabledCheck": true,
            "componentType": "Badge",
            "sn": "1",
            "showType": "index",
            "options": [
              {
                "codeName": "codeName1",
                "codeValue": "3"
              },
              {
                "codeName": "codeName2",
                "codeValue": "2"
              },
              {
                "codeName": "codeName3",
                "codeValue": "1"
              }
            ],
            "tooltipShow": false
          },
          {
            "indexId": "INDEX-0002",
            "indexName": "指标2",
            "indexField": "indexname2",
            "indexValue": 0,
            "disabledCheck": true,
            "componentType": "Badge",
            "sn": "2",
            "showType": "index",
            "options": [
              {
                "codeName": "codename1",
                "codeValue": "2"
              },
              {
                "codeName": "codename2",
                "codeValue": "2"
              }
            ],
            "tooltipShow": false
          }
        ]
      },
      {
        "sn": "2",
        "showType": "categoryLvl1",
        "categoryName": "一级分类2",
        "categoryField": "lvl1name2",
        "indexData": [
          {
            "indexId": "INDEX-0007",
            "indexName": "指标3",
            "indexField": "indexname3",
            "indexValue": 4,
            "disabledCheck": true,
            "componentType": "StarRate",
            "sn": "1",
            "showType": "index",
            "options": [],
            "tooltipShow": false
          },
          {
            "indexId": "INDEX-0006",
            "indexName": "指标4",
            "indexField": "indexname4",
            "indexValue": 5,
            "disabledCheck": true,
            "componentType": "StarRate",
            "sn": "2",
            "showType": "index",
            "options": [],
            "tooltipShow": false
          },
          {
            "sn": "1",
            "showType": "categoryLvl2",
            "isLvl2": true,
            "categoryName": "二级分类1",
            "categoryField": "lvl2name1",
            "indexData": [
              {
                "indexId": "INDEX-0008",
                "indexName": "指标5",
                "indexField": "indexname5",
                "indexValue": 3,
                "disabledCheck": true,
                "componentType": "StarRate",
                "sn": "1",
                "showType": "index",
                "options": [],
                "tooltipShow": false
              },
              {
                "indexId": "INDEX-0009",
                "indexName": "指标6",
                "indexField": "indexname6",
                "indexValue": 3,
                "disabledCheck": true,
                "componentType": "StarRate",
                "sn": "2",
                "showType": "index",
                "options": [],
                "tooltipShow": false
              }
            ]
          },
          {
            "sn": "2",
            "showType": "categoryLvl2",
            "isLvl2": true,
            "categoryName": "二级分类2",
            "categoryField": "lvl2name2",
            "indexData": [
              {
                "indexId": "INDEX-0011",
                "indexName": "指标11",
                "indexField": "indexname11",
                "indexValue": 3,
                "disabledCheck": true,
                "componentType": "StarRate",
                "sn": "1",
                "showType": "index",
                "options": [],
                "tooltipShow": false
              },
              {
                "indexId": "INDEX-0010",
                "indexName": "指标10",
                "indexField": "indexname10",
                "indexValue": 5,
                "disabledCheck": true,
                "componentType": "StarRate",
                "sn": "2",
                "showType": "index",
                "options": [],
                "tooltipShow": false
              }
            ]
          }
        ]
      },
      {
        "sn": "3",
        "showType": "categoryLvl1",
        "categoryName": "一级分类3",
        "categoryField": "lvl1name2",
        "indexData": [
          {
            "indexId": "INDEX-0020",
            "indexName": "指标20",
            "indexField": "indexname20",
            "indexValue": 3,
            "disabledCheck": true,
            "componentType": "StarRate",
            "sn": "3",
            "showType": "index",
            "options": [],
            "tooltipShow": false
          },
          {
            "indexId": "INDEX-0030",
            "indexName": "指标30",
            "indexField": "indexname30",
            "indexValue": 5,
            "disabledCheck": true,
            "componentType": "StarRate",
            "sn": "2",
            "showType": "index",
            "options": [],
            "tooltipShow": false
          }
        ]
      }
    ]
  }
]
```

## 最终渲染结果

![xx](./screenshot/result.png)

## 处理方式

原始数据一层层嵌套，多级表头受数据控制，直接渲染十分麻烦。

于是先构造两个参数，`fileds` 和 `tableData`;

最后通过如下代码进行渲染:

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="workName" label="姓名"></el-table-column>
  <el-table-column prop="workNo" label="工号"></el-table-column>

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
```

### fileds 数据格式

```json
[
  {
    "code": "1",
    "name": "一级分类1",
    "fileds": [
      {
        "code": "INDEX-0001",
        "name": "指标1",
        "fileds": []
      },
      {
        "code": "INDEX-0002",
        "name": "指标2",
        "fileds": []
      }
    ]
  },
  {
    "code": "2",
    "name": "一级分类2",
    "fileds": [
      {
        "code": "INDEX-0007",
        "name": "指标3",
        "fileds": []
      },
      {
        "code": "INDEX-0006",
        "name": "指标4",
        "fileds": []
      },
      {
        "code": "1",
        "name": "二级分类1",
        "fileds": [
          {
            "code": "INDEX-0008",
            "name": "指标5",
            "fileds": []
          },
          {
            "code": "INDEX-0009",
            "name": "指标6",
            "fileds": []
          }
        ]
      },
      {
        "code": "2",
        "name": "二级分类2",
        "fileds": [
          {
            "code": "INDEX-0011",
            "name": "指标11",
            "fileds": []
          },
          {
            "code": "INDEX-0010",
            "name": "指标10",
            "fileds": []
          }
        ]
      }
    ]
  },
  {
    "code": "3",
    "name": "一级分类3",
    "fileds": [
      {
        "code": "INDEX-0020",
        "name": "指标20",
        "fileds": []
      },
      {
        "code": "INDEX-0030",
        "name": "指标30",
        "fileds": []
      }
    ]
  }
]
```

### tableDatas 数据的格式

```json
[
  {
    "workName": "姓名",
    "workNo": "工号",
    "data": {
      "1": {
        "INDEX-0001": 0,
        "INDEX-0002": 0
      },
      "2": {
        "1": {
          "INDEX-0008": 3,
          "INDEX-0009": 3
        },
        "2": {
          "INDEX-0011": 3,
          "INDEX-0010": 5
        },
        "INDEX-0007": 4,
        "INDEX-0006": 5
      },
      "3": {
        "INDEX-0020": 3,
        "INDEX-0030": 5
      }
    }
  }
]
```
