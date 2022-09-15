var name = 'window'
var obj1 = {
  name: 'obj1',
  fn1: function() {
    console.log(this.name)
  },
  fn2: () => {
    console.log(this.name)
  },
  fn3: function() {
    return function() {
      console.log(this.name)
    }
  },
  fn4: function() {
    return () => {
      console.log(this.name)
    }
  }
}
var obj2 = {
  name: 'obj2'
}

obj1.fn1() // obj1

obj1.fn1.call(obj2) // obj2

obj1.fn2() // window
obj1.fn2.call(obj2) // window

obj1.fn3()() // window
obj1.fn3().call(obj2) // obj2
obj1.fn3.call(obj2)() // window

obj1.fn4()() // obj1
obj1.fn4().call(obj2) // obj1
obj1.fn4.call(obj2)() // obj2