function getByCode(fileds, code, name) {
  for(filed of fileds) {
    if(filed.code === code) {
      return filed;
    }
  }
  let filed = {
    code,
    name,
    fileds: []
  };
  fileds.push(filed);
  return filed;
}

function getDataByKey(data, key) {
  if(data[key] != null) {
    return data[key];
  }
  let newData = {};
  data[key] = newData;
  return newData;
}

function putTableData(indexData, data, fileds) {
  indexData.forEach(item => {
    if(item.indexId != null) {
      data[item.indexId] = item.indexValue;
      getByCode(fileds, item.indexId, item.indexName);
    } else {
      putTableData(
        item.indexData, 
        getDataByKey(data, item.sn), 
        getByCode(fileds, item.sn, item.categoryName).fileds);
    }
  })
}

export default {
  getTableData(list) {
    let datas = [];
    let fileds = [];
    list.forEach(item => {
      let data = {
        workName: item.workName, 
        workNo: item.workNo, 
        data: {}
      };
      datas.push(data);
      putTableData(item.markData, data.data, fileds);
    });
    
    return {
      datas,
      fileds
    }

  }

  


}
