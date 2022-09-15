# JavaScript函数作用域链和执行上下文

### 执行上下文（EC）

可以理解为函数执行时的资源对象。

包括：

1. 变量对象VO
2. 作用域链（词法作用域）
3. this指向

类型有：

1. 全局执行上下文
2. 函数执行上下文
3. eval执行上下文

### 代码执行过程

1. 创建全局执行上下文
2. 全局执行上下文逐行执行，遇到函数时（生成对应函数执行上下文），将函数执行上下文推入执行上下文栈（ECS）
3. 函数执行上下文被激活，开始执行上下文中的代码
4. 函数执行完之后，被弹出执行上下文栈，之后继续执行全局上下文

### 生成对应函数执行上下文

1. 从父函数（或者叫父函数执行上下文）继承作用域链，将之赋给函数的[[scope]]属性
2. 生成变量对象VO（在函数被执行后被成为活动对象AO(Activeation Object)）
3. 将当前函数变量VO对象推入[[scope]]中
4. 赋值this的指向

```javascript
checkscopeContext = {
  scope: checkscope.[[scope]],
  VO: {
    arguments: {
      0: 'scope',
      length: 1
    },
    s: 'scope',
    f: pointer to function f,
    scope: undefined
  },
  this: globalContext.VO
}
```

### 变量对象VO

存储着当前函数的各种参数，如

```javascript
function checkScope(s) {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f()
}

//函数checkScope的VO为
VO = {
  arguments: {
    0: 'scope',
    length: 1
  },
  s: 'scope',
  f: pointer to function f,
  scope: undefined
}
```

#### 词法作用域

javascript这门语言是基于词法作用域来创建作用域的，**也就是说一个函数的作用域在函数声明的时候就已经确定了**（因此会出现变量提升的现象），而不是函数执行的时候。

### 作用域与执行上下文的关系

类似于class和实例的关系，作用域是静态的，在函数还未被执行时就已经存在（函数声明的时候就存在），但是在作用域中的各个属性值都是未初始化的，也就是所谓的变量提升；当函数被执行时，对应作用域才被激活，被添加到执行上下文中，里面的属性值会根据函数的执行被修改。

### this的指向

原则：

1. this指向的是调用该函数的作用域
2. 只有函数和顶级作用域有this，对象属性没有
3. 箭头函数的this始终指向父函数的this，且不能被更改

两个例子

```javascript
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
```

```javascript
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
```

### 函数作用域和块级作用域

函数作用域，使用var声明变量，作用域范围为函数，会被变量提升；

块级作用域，使用let和const声明变量，作用域范围为`{}`之间不会被变量提升。

一个典型示例：

```javascript
var x = "1";
function test1() {
	console.log(x);//输出为undefined，因为var是函数作用域变量声明，且会被变量提升，也就是说，在这个节点，test1函数作用域中是有x这个变量的，所以不会向上寻找x，但是x这个变量还未初始化，因此此时值是undefined
	var x = "2";
	console.log(x);//输出的是"2"
}
test1();

let y = "1";
function test2() {
    console.log(y);//输出error：Cannot access 'y' before initialization，当前作用域中已经有y变量，因此不会向上寻找，但是还未执行到那一行，因此y变量不能访问
    let y = "2";
    console.log(y);//输出"2"
}
```

