function objtoMap(obj) {
  let strMap = new Map();
  for(let key of Object.keys(obj)){
    strMap.set(key,obj[key]);
  }
  return strMap;
}

function strMaptoObj(strMap){
  let obj = Object.create(null);
  for(let [key,value] of strMap){
    obj[key] = value;
  }
  return obj;
}

function strMaptoJson(map){
  return JSON.stringify(strMaptoObj(map))
}

function maptoArrayJson(map){
  return JSON.stringify([...map])
}

const maparr = new Map();
maparr.set('a',1).set('b',2).set('c',3);
const json_arr =  JSON.stringify([...maparr]);

console.log(Object.prototype.toString.call(JSON.parse(json_arr)));
