# hgh

    1,el是个全局对象,该对象包含方法有：
        run、if、filter、sum、avg、select

        1）、run 会执行一个字符表达式，返回字符表达式的结果
            参数
                expression：字符表达式
                ...:可变参数对象，该参数会合并成一个参数对象提供给字符表达式执行
            返回值
                返回字符表达的结果
        2）、if 执行一个字符表达式，返回字符表达式结果
            参数
               expression：字符表达式
               data:参数对象
               trueResult:如果参数表达式执行返回非空值，true被定义，将返回trueResult定义的值，或者字符表达的结果
               falseResult：如果参数定义且字符表达式结果值为false，则返回 falseResult的值
            返回值
                字符表达返回值为true，trueResult已定义返回trueResult，否则返回字符表达式的值
                字符表达式返回false，falseResult已定义返回falseResult，否则返回字符表达式的值
        3）、filter 会执行一个字符表达式
            参数
                expression：字符表达式
                data:过滤的数组源数据
                ...:可变参数对象，将会合并到一个对象参与字符表达式计算
            返回值
                返回符合过滤条件的结果集

        4）、sum 求和数组数据集
            参数
                expression：字符表达式
                data：要计算求和的数据集
                ...:可变参数，会合并到data的没一列参与计算
            返回值
                返回每一行求和的值

        5）、avg 求数组数据集的某行的值的平均价
            参数
                expression：字符表达式
                data：要计算求和的数据集
                ...:可变参数，会合并到data的没一列参与计算
            返回值
                返回每一行求和的值

        6）、select 选择符合要求的行和行的列
            参数
                expression：字符表达式，过滤表达式
                data：要计算求和的数据集
                field：要筛选的列名称,如'field1,field2...'或者['field1','field2']
                ...:可变参数对象，会合并到data的没一列参与计算
            返回值
                返回符合要求的列

	2,预定义的函数函数有如下:
		 = equal,>great,<little,<= littleEqual,>= greatEquel,!= notEqual,+ plus,- minus,* mul,/ div,|| or ,&& and;
	3,用户可以自定义扩展函数,
		比如可在一个函数 flay
		1),注册函数,el.extendFn('fly',function(a,b){ 
			return a+b;
		 })

		2),使用注册的函数
			var b=el.if('$a[fly]$b',{a:'i',b:' am fly'});

			console.log(b);
			
			//输出
			output: i am fly


    4、使用列子
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