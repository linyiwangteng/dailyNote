var a1 = [1,2,3,4,5,6];
var a2 = [2,4,5,6,7,8];
var a3 = [1,4,5,8,9,10];
var a4 = [2,5,8,11,12,14];

function arrMerge(...args){
  console.log(args);
  let newArr = [];
  let temp1 = a1.shift(),temp2 = a2.shift();

  while(a1.length!==0 && a2.length!== 0){
    if(temp1 < temp2){
      newArr.push(temp1);
      temp1 = a1.shift();
      if(a1.length == 0) {
        newArr.push(temp1)
      }
    }else{
      newArr.push(temp2);
      temp2 = a2.shift();
      if(a2.length == 0) {
        newArr.push(temp2)
      }
    }

  }
  if(a1.length !== 0){
    newArr = newArr.concat(a1);
  }
  if(a2.length !== 0) {
    newArr = newArr.concat(a2);
  }
  console.log(newArr);
  return newArr;
}
const newarr = arrMerge(a1,a2,a3,a4);

// function unque_array(arr){
//   return arr.filter((item,index,self)=>{
//     returnself.indexOf(item) === index;
//   })
// }
// console.log(unque_array(newarr));

const dups_names = ['Ron', 'Pal', 'Fred', 'Rongo', 'Ron'];
function dup_arr(arr){
  var unique= {};
  arr.forEach(item=>{
    if(!unique[item]){
      unique[item] = true
    }
  });
  return Object.keys(unique)
}
console.log(dup_arr(dups_names));