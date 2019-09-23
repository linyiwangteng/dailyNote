const arr = [10,9,2,5,3,7,101,18];

function t(arr){
  var result_arr = [];
  for(let i = 0; i< arr.length; i++){
    if(!result_arr.length){
      result_arr.push(arr[i])
    }else{
      if(result_arr[result_arr.length-1] > arr[i]){
        result_arr.pop();
      }
      result_arr.push(arr[i]);
    }
  }
  return result_arr;
}
console.log(t(arr));

function zhongshu(arr){
  let quchong = Array.from(new Set(arr));
  for(let i = 0; i<quchong.length;i++){
    let filter_arr = arr.filter(item=>{
      return item == quchong[i];
    });
    if(filter_arr.length > arr.length/2){
      return quchong[i]
    }
  }
  return false
}

let a = zhongshu([1,2,3,4,5,3,2,2,2,3,2,7]);

console.log(a)