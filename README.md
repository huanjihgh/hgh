# hgh

    1,el�Ǹ�ȫ�ֶ���,�ö�����������У�
        run��if��filter��sum��avg��select

        1����run ��ִ��һ���ַ����ʽ�������ַ����ʽ�Ľ��
            ����
                expression���ַ����ʽ
                ...:�ɱ�������󣬸ò�����ϲ���һ�����������ṩ���ַ����ʽִ��
            ����ֵ
                �����ַ����Ľ��
        2����if ִ��һ���ַ����ʽ�������ַ����ʽ���
            ����
               expression���ַ����ʽ
               data:��������
               trueResult:����������ʽִ�з��طǿ�ֵ��true�����壬������trueResult�����ֵ�������ַ����Ľ��
               falseResult����������������ַ����ʽ���ֵΪfalse���򷵻� falseResult��ֵ
            ����ֵ
                �ַ���ﷵ��ֵΪtrue��trueResult�Ѷ��巵��trueResult�����򷵻��ַ����ʽ��ֵ
                �ַ����ʽ����false��falseResult�Ѷ��巵��falseResult�����򷵻��ַ����ʽ��ֵ
        3����filter ��ִ��һ���ַ����ʽ
            ����
                expression���ַ����ʽ
                data:���˵�����Դ����
                ...:�ɱ�������󣬽���ϲ���һ����������ַ����ʽ����
            ����ֵ
                ���ط��Ϲ��������Ľ����

        4����sum ����������ݼ�
            ����
                expression���ַ����ʽ
                data��Ҫ������͵����ݼ�
                ...:�ɱ��������ϲ���data��ûһ�в������
            ����ֵ
                ����ÿһ����͵�ֵ

        5����avg ���������ݼ���ĳ�е�ֵ��ƽ����
            ����
                expression���ַ����ʽ
                data��Ҫ������͵����ݼ�
                ...:�ɱ��������ϲ���data��ûһ�в������
            ����ֵ
                ����ÿһ����͵�ֵ

        6����select ѡ�����Ҫ����к��е���
            ����
                expression���ַ����ʽ�����˱��ʽ
                data��Ҫ������͵����ݼ�
                field��Ҫɸѡ��������,��'field1,field2...'����['field1','field2']
                ...:�ɱ�������󣬻�ϲ���data��ûһ�в������
            ����ֵ
                ���ط���Ҫ�����

	2,Ԥ����ĺ�������������:
		 = equal,>great,<little,<= littleEqual,>= greatEquel,!= notEqual,+ plus,- minus,* mul,/ div,|| or ,&& and;
	3,�û������Զ�����չ����,
		�������һ������ flay
		1),ע�ắ��,el.extendFn('fly',function(a,b){ 
			return a+b;
		 })

		2),ʹ��ע��ĺ���
			var b=el.if('$a[fly]$b',{a:'i',b:' am fly'});

			console.log(b);
			
			//���
			output: i am fly


    4��ʹ������
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