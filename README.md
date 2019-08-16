# hgh

	1,预定义的函数函数有如下:
		 = equal,>great,<little,<= littleEqual,>= greatEquel,!= notEqual,+ plus,- minus,* mul,/ div,|| or ,&& and;
	2,用户可以自定义扩展函数,
		比如可在一个函数 flay
		1),注册函数,el.extendFn('fly',function(a,b){ 
			return a+b;
		 })

		2),使用注册的函数
			var b=el.if('a[fly]b',{a:'i',b:' am fly'});

			console.log(b);
			
			//输出
			output: i am fly


    //test data
    var data=[
        {f1:100,f2:30},
        {f1:78,f2:30},
        {f1:99,f2:30},
        {f1:44,f2:30},
        {f1:32,f2:30},
        {f1:65,f2:30},
        {f1:12,f2:30}
    ]
    //求平均值，这里两列相加后会除以2 $开头的是变量，非$开头的是常量
    var d=el.avg('($f1+$f2)',data);
    console.log(d);



    var data2 = [
       { f1: 100, f2: 30,name:'dddd' },
       { f1: 78, f2: 30, name: 'ang' },
       { f1: 99, f2: 30, name: 'ggg' },
       { f1: 44, f2: 30, name: 'yyy' },
       { f1: 32, f2: 30, name: 'ffff' },
       { f1: 65, f2: 30, name: 'hhh' },
       { f1: 12, f2: 30, name: 'pfpp' }
    ]

   

    //筛选数据返回指定的列
    var ddd = el.select("($f1=100)||($f1=32)||($name[like]f)", data2, "f1,f2,name");
    console.log(ddd);


    var ccc = el.select("$f1*2>$c", data2, "f1,f2,name", {c:30});
    console.log(ccc);


    var xx = el.if('xxxxxx+(100*100)', { a: 100, b: 10 });

    //会输出 xxxxxx10000
    console.log(xx);