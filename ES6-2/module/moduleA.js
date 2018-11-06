// 这是模块A
const a=20;
// 把a暴露出去
const fun=(y)=>{
  let x=10;
  return x+y+a;
};
// 当输出的接口只有一个时,可以用default,default在模块中只能用一次
export default fun;
/*export{
  a,
  // 直接写方法名
  fun
};*/
const fun1=()=>{};
const fun2=()=>{};
const fun3=()=>{};
export{
  fun1,
  fun2,
  fun3
}
