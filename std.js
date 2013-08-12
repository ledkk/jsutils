(function(){
	//constructor 

	function Person(name,sex){
		this.name = name;
		this.sex = sex;
	}

	var ledkk = new Person('ledkk','man');
	console.log(ledkk.name);// can this log anything ? 

	Person.prototype = {
		getName : function(){
			return this.name;
		},
		getSex : function(){
			return this.sex;
		}
	};

	//console.log(ledkk.getName()); // ledkk.getName is not a function 

	var rj = new Person('rj','female');
	console.log(rj.getName()); // print the rj's name 


	Person.prototype.age = 20;
	var tenderuser = new Person('tenderuser','man');
	console.log(tenderuser.age);  // 20 

	tenderuser.age = 19;
	console.log(tenderuser.age);  // 19 

	delete tenderuser.age;  

	console.log(tenderuser.age);  //19



	// create an Employee Class which extend the Person class

	function Employee (name,sex,employeeId) {
		this.name = name ;
		this.sex = sex;
		this.employeeId = employeeId;
	}

	// make the Employee extend the Person class
	Employee.prototype = new Person(); // now the Employee has the getName method and getSex method 

	tenderuser = new Employee('tenderuser','man',121);
	console.log(tenderuser.getName()); // print tenderuser

	//Add a new method getEmployeeId to Class Employee 
	Employee.prototype.getEmployeeId = function(){
		return this.employeeId;
	};

	console.log(tenderuser.getEmployeeId());  //print 121 

	ledkk = new Employee('ledkk','man',121); // create a new person 
	console.log(ledkk instanceof Person && ledkk instanceof Employee);

	
	/**
	*    在创建Employee构造函数和原型（以后简称类）时，就对Person进行了实例化，这是不合适的。
    *	Employee的构造函数没法调用父类Person的构造函数，导致在Employee构造函数中对name和sex属性的重复赋值。
    *	Employee中的函数会覆盖Person中的同名函数，没有重载的机制（和上一条是一个类型的问题）。
    *	创建JavaScript类的语法过于零散，不如C#/Java中的语法优雅。
    *   实现中有constructor属性的指向错误，这个会在第二篇文章中讨论。 
	*
	**/
	//定义一个全局函数
	function foo () {
		if(this === window){
			console.log('this is window');
		}
	}


	foo.boo = function(){
		if(this === foo){
			console.log('this is foo');
		}else if(this === window){
			console.log('this is window');
		}
	};

	// 等价于window.foo
	foo(); // print this is window 

	// 可以看到函数中this指向调用函数的对象
	foo.boo(); // print this is foo 

	//使用apply改变函数中this的指向
	foo.boo.apply(window); // print this is window 


	//prototype本质上是一个Javascript对象，并且每个函数上都有一个prototype属性，如果这个函数被用来创建自定义对象的场景时，我们可以称这个函数为构造函数
	/**
	*  Javascript中的数据类型-- 字符串（String）、数字（Number）、数组（Array） 、对象（Object） 、日期（Date)、等都是作为构造函数来事项的。

	**
	* 	实际上JavaScript 所有固有数据类型都具有只读的prototype属性，不能修改prototype上的已有类型，但是我们可以加入我们自己的扩展方法
	**/

	Array.prototype.min = function(){
		var min = this[0];
		for(var i=1; i< this.length ; i++){
			if(this[i] < min){
				min = this[i];
			}
		}
		return min;
	};	
	console.log([1,56,23,123,112,0].min());  // 0 


	/**
	*	 再向Array的原型中添加扩展方法后，当使用for-in循环数组时，这个扩展方法也会被循环出来
	* 	在Array原型加入min方法后
	**/

	var arr = [1,56,23,231,123,32];

	var total = 0;
	for(var i in arr){
		console.log(arr[i]);
		total += parseInt(arr[i],10);
	}
	console.log(total); //NaN


	/**
	* 	解决办法为：
	**/
	total = 0;
	for(var i in arr){
		if(arr.hasOwnProperty(i)){
			total += parseInt(arr[i],10);
		}
	}

	console.log(total);


	/**
	*	constructor  始终指向创建当前对象的构造函数。
	* 	
	**/

	console.log(arr.constructor === Array); // var arr = [1,56,234.....] same as var arr = new Array(1,56,234...);  print Array

	var Foo = function(){}; // same as var Foo = new Function();
	console.log(Foo.constructor === Function) ; // print true 

	var obj = new Foo();
	console.log(obj.constructor === Foo) ; // print true 

	console.log(obj.constructor.constructor === Function);// print true 

	/**
	*	 每个函数都有一个prototype，而这个prototype的构造函数默认指向这个函数，而当覆盖了prototype函数属性的时候，
	*	prototype的构造函数就会发生变化
	**/

	console.log(Foo.prototype.constructor === Foo && Foo.prototype.constructor === obj.constructor); // true 

	Foo.prototype = {
		name:'test'
	};

	console.log(Foo.prototype.constructor === Foo.constructor); //false
	console.log(Foo.prototype.constructor === Object);  // true var a = {}  same as var a = new Object()


	
})();