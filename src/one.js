let one ={
  a:[
    {
      "header":"1",
      "hello":"world"
    },
    {
      "hello":"world"
    }
  ]
}
one.b = one.a[0];

console.log(one)