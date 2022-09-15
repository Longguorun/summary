var name = 'window'
function Person(name) {
  this.name = name
  this.fn1 = function() {
    console.log('fn1:', name)
    console.log(this.name)
  }
  this.fn2 = () => {
    console.log('fn2:', name)
    console.log(this.name)
  }
  this.fn3 = function() {
    return function() {
      console.log('fn3:', name)
      console.log(this.name)
    }
  }
  this.fn4 = function() {
    return () => {
      console.log('fn4:', name)
      console.log(this.name)
    }
  }
}

var obj1 = new Person('obj1')
var obj2 = new Person('obj2')

obj1.fn1()//obj1, obj1
obj1.fn1.call(obj2)//obj1, obj2

obj1.fn2()//obj1, obj1
obj1.fn2.call(obj2)//obj1, obj1

obj1.fn3()()//obj1, window
obj1.fn3().call(obj2)//obj1, obj2
obj1.fn3.call(obj2)()//obj1, window

obj1.fn4()()//obj1, obj1
obj1.fn4.call(obj2)()//obj1, obj2
obj1.fn4().call(obj2)//obj1, obj1