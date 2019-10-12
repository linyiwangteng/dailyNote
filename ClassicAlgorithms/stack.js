// 栈的使用
const isBalanced = (str) => {
  // Map作为构造函数，也可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组。
  const map = new Map([
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
  ])

  let stack = [];

  for(let i = 0 ; i < str.length; ++i){
      let node = str[i]

      if (map.has(node)){
          stack.push(node)
      }
      else if ([...map.values()].includes(node)){
          if (stack[stack.length - 1] !==
                              [...map.entries()].filter(el=>el[1]===node).pop().shift()
                       ){
              return false
          }
          stack.splice(stack.length-1, 1)
      }
  }

  return stack.length === 0
}
const isBalanceds = (str) => {
  let map = new Map([
    ['{','}'],
    ['(',')'],
    ['[',']']
  ]);
  const stack = [];
  for(let i = 0; i< str.length; i++) {
    let node = str[i];
    if(map.has(str[i])){
      stack.push(str[i])
    }else if([...map.values()].includes(node)){
      // if( stack[stack.length - 1] !== [...map.entries()].filter(item=>item[1] === node).pop().shift() ){
        if( stack[stack.length - 1] !== [...map.entries()].find(item=>item[1] === node).shift() ){
        return false;
      }
      // stack.splice(stack.length-1,1);
      stack.pop();
    }
  }
  return stack.length === 0;
}


console.log(isBalanceds( '(foo { (bar [baz] ) } )' ));


const isStrictBalanced = (str) => {
  const map = new Map([
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
  ])
  let stack = [], keys = [...map.keys()], values = [...map.values()];
  for(let i = 0 ; i < str.length; ++i){
      let node = str[i]
      if (map.has(node)){
          // 和栈中最后一个比较索引的大小
          if (stack.length){
              let arr = [node, [...stack].pop()]
                  .map(el => keys.indexOf(el))

              if (arr[0] < arr[1]){
                  return false
              }
          }
          stack.push(node)
      }
      else if (values.includes(node)){
          let needKey = [...map.entries()].filter(el=>el[1]===node).pop().shift()
          if ([...stack].pop() !== needKey){
              return false
          }
          stack.pop()
      }
  }
  return stack.length === 0
}
// 自己写的
const isStrictBalanced = (str) => {
  const map = new Map([
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ]);
  const stack = [], keys = [...map.keys()], values = [...map.values()];
  for(let i = 0; i<str.length;i++){
    let node = str[i];
    if(map.has(node)){
      if(stack.length){
        let arr = [node,[...stack].pop()].map(item=>keys.indexOf(item));
        if(arr[0] < arr[i]) {
          return false
        }
      }
      stack.push(node);
    }else if(values.includes(node)) {
      if(stack[stack.length - 1] !== [...map.entries()].find(item=>item[1]===node).pop()){
        return false
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}