# hgh

	1,Ԥ����ĺ�������������:
		 = equal,>great,<little,<= littleEqual,>= greatEquel,!= notEqual,+ plus,- minus,* mul,/ div,|| or ,&& and;
	2,�û������Զ�����չ����,
		�������һ������ flay
		1),ע�ắ��,el.extendFn('fly',function(a,b){ 
			return a+b;
		 })

		2),ʹ��ע��ĺ���
			var b=el.if('a[fly]b',{a:'i',b:' am fly'});

			console.log(b);
			
			//���
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
    //��ƽ��ֵ������������Ӻ�����2 $��ͷ���Ǳ�������$��ͷ���ǳ���
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

   

    //ɸѡ���ݷ���ָ������
    var ddd = el.select("($f1=100)||($f1=32)||($name[like]f)", data2, "f1,f2,name");
    console.log(ddd);


    var ccc = el.select("$f1*2>$c", data2, "f1,f2,name", {c:30});
    console.log(ccc);


    var xx = el.if('xxxxxx+(100*100)', { a: 100, b: 10 });

    //����� xxxxxx10000
    console.log(xx);