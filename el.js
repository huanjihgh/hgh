(function (win) {


	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: el表达式对象
	**/
    function El() {

    };


    function isNum(d){
        var reg=/^\d+(.\d+)?$/g;
        return reg.test(d);
    }

    function isFnText(fn) {
        var reg = /^\w+\d*$/;
        return reg.test(fn);
    }
	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 深拷贝一个对象
	**/
    function clone(data) {
        var rs, type = Object.prototype.toString.call(data);
        if (type == '[object Array]') {

            rs = [];
            for (var item = 0; item < data.length; item++) {
                rs.push(clone(data[item]));
            }
        } else if (type == '[object Object]') {

            rs = {};
            for (var item in data) {
                rs[item] = clone(data[item]);
            }
        } else {
            rs = data;
        }

        return rs;

    };

	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 扩展对象属性
	**/
    function extend(data) {


        for (var i = 1; i < arguments.length; i++) {

            for (var item in arguments[i]) {
                data[item] = clone(arguments[i][item]);
            }
        }
        return data;
    };


	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 去除字符串开始和结束的空白字符
	**/
    function trim(str) {
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, "");
    }

	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 转换为相应的函数
	**/
    function convertFn(fn) {
        ///>=|<=|>|<|=|!=|\+|-|\*|\/|\|\||\[\w+\d*\]||\&\&/
        var rs;
        switch (fn) {
            case '=':
                rs = 'equal';
                break;
            case ">":
                rs = "great";
                break;
            case "<":
                rs = "little";
                break;
            case "<=":
                rs = "littleEqual";
                break;
            case ">=":
                rs = "greatEquel";
                break;
            case "!=":
                rs = "notEqual";
                break;
            case "+":
                rs = "plus";
                break;
            case "-":
                rs = "minus";
                break;
            case "*":
                rs = "mul";
                break;
            case "/":
                rs = "div";
                break;
            case "||":
                rs = "or";
                break;
            case "&&":
                rs = "and";
                break;
            default:
                rs = fn;
                break;
        }

        return rs;
    };

	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 函数参数对象
	*/
    function getGroupFuntionAndParameters(expression) {


    };

	/**
    ** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 填充函数
	*/
    function fillFn(functionArray, funStr) {


        var v = funStr[0], index, index2;

        if (v != '(' && v != ')') {
            index = funStr.indexOf('(');
            index2 = funStr.indexOf(')');
            index = Math.max(index, index2);

            if (index > 0) {
                functionArray.push(convertFn(funStr.substr(0, index)));
            }
            for (var i = index; i < funStr.length; i++) {
                if (funStr[i])
                    functionArray.push(convertFn(funStr[i]));
            }


        } else {
            index = funStr.lastIndexOf('(');
            index2 = funStr.lastIndexOf(')');
            index = Math.max(index, index2);


            for (var i = 0; i <= index; i++) {
                functionArray.push(convertFn(funStr[i]));
            }
            if (index >= 0) {
                var xy = funStr.substr(index + 1);
                if (xy)
                    functionArray.push(convertFn(xy));

            }
        }



    };

    /***
     * 
     * 
     * description:这个函数用户查询闭合的括号(),成对出现
     */
    function searchGroup(expression, index, curcontent, content) {
        var i = index + 1, nx = 1;
        for (; i < expression.length; i++) {

            if (expression[i] == curcontent && i - 1 >= 0 && expression[i - 1] != '\\') {
                nx++;
            } else if (expression[i] == content && expression[i + 1] != '\\') {
                nx--;
                if (nx == 0) {
                    return i;//返回闭合的() 的位置
                }
            }
        }
        throw new Error('表达式缺少' + content);
    }


    /***
     * author:huangguoheng
     * 
     * 
     * description:返回-1说明不存在分组，否则返回分组的开始位置
     */
    function searchGroupIndex(expression,index,content){
        var i = index, nx = 1;
        for (; i < expression.length; i++) {
            
            if (expression[i] == content && i - 1 >= 0 && expression[i - 1] != '\\') {
                return i;
            } 
        }

        return -1;
    }


    /***
     * author:huangguoheng
     * 
     */
    function fillParams(expression, start, len, params) {
        var arg = trim(expression.substr(start, len));
        //函数参数
        if (arg != '') {
            arg=arg.replace('\\(','(').replace('\\)',')')
            .replace('\\[','[').replace('\\]',']');
            params.push(arg);
        }
    }


    /***
     * author:huangguoheng
     * expression:表达式
     * groups:[],函数数组
     */
    function getFnName(expression, groups, params) {
        // expression.replace(/\$?\w+\d*(?=>=|<=|>|<|=|!=|\+|-|\*|\/|\|\||\[\w+\d*\]|\&\&)/g,'_Y_0_');
        var i = 0, fn, len = expression.length, k = 0;


        for (; i < expression.length; i++) {

            //可能是函数的开始
            if (expression[i] == '[') {
                if (i > 0 && expression[i - 1] == '\\') { //转义字符不是函数了
                    continue;
                } else {

                    // var arg=trim(expression.substr(0,i+1));
                    // //函数参数
                    // if(arg!='')
                    // {
                    //     params.push(arg);
                    // }

                    fillParams(expression, k, i - k, params);

                    //找到的位置
                    k = searchGroup(expression, i, '[', ']');
                    fn = expression.substr(i + 1, k - i - 1);

                    if (!isFnText(fn)) {
                        return new Error(fn + ' is not function');
                    }

                    groups.push(convertFn(fn));
                    k++;//下一个位置
                    i = k;

                }
            } else {
                switch (expression[i]) {
                    case '>':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        if (len > i + 1 && expression[i + 1] == '=') {

                            // var arg=trim(expression.substr(0,i+1));
                            fillParams(expression, k, i - k, params);
                            k = i + 2;
                            groups.push(convertFn('>='));
                            i++;
                        } else {
                            fillParams(expression, k, i - k, params);
                            k = i + 1;
                            groups.push(convertFn('>'));
                        }
                        break;

                    case '<':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        if (len > i + 1 && expression[i + 1] == '=') {
                            groups.push(convertFn('<='));
                            fillParams(expression, k, i - k, params);
                            k = i + 2;
                            i++;
                        } else {
                            fillParams(expression, k, i - k, params);
                            k = i + 1;
                            groups.push(convertFn('<'));
                        }
                        break;

                    case '!':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        if (len > i + 1 && expression[i + 1] == '=') {
                            groups.push(convertFn('!='));
                            i++;
                        } else {
                            fillParams(expression, k, i - k, params);
                            k = i + 1;
                            groups.push(convertFn('!'));
                        }
                        break;
                    case '+':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        fillParams(expression, k, i - k, params);
                        k = i + 1;
                        groups.push(convertFn('+'));
                        // }
                        break;
                    case '-':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        fillParams(expression, k, i - k, params);
                        k = i + 1;
                        groups.push(convertFn('-'));
                        break;
                    case '*':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        fillParams(expression, k, i - k, params);
                        k = i + 1;
                        groups.push(convertFn('*'));
                        break;
                    case '=':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        fillParams(expression, k, i - k, params);
                        k = i + 1;
                        groups.push(convertFn('='));
                        break;
                    case '/':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        fillParams(expression, k, i - k, params);
                        k = i + 1;
                        groups.push(convertFn('/'));
                        break;
                    case '|':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        if (len > i + 1 && expression[i + 1] == '|') {
                            groups.push(convertFn('||'));
                            fillParams(expression, k, i - k, params);
                            k = i + 2;
                            i++;
                        }
                        // else{
                        //     fillFn(groups,'+');
                        // }
                        break;
                    case '&':
                        if (i - 1 >= 0 && expression[i - 1] == '\\') {
                            break;
                        }
                        if (len > i + 1 && expression[i + 1] == '&') {
                            groups.push(convertFn('&&'));
                            fillParams(expression, k, i - k, params);
                            k = i + 2;
                            i++;
                        }
                        break;
                }

            }
        }

        if (k < len)
            fillParams(expression, k, len - k, params);
    }

    /**
** author:huangguoheng
** date:2018-10-02
** email:4701136534@qq.com
** description: 分析函数和函数参数
**/
    function seachFn(expression, index, groups, params) {
        var i = index, str;

        for (; i < expression.length; i++) {
            //\\ 转义括号
            if (expression[i] == '(' && ((i > 1 && expression[i - 1] != '\\') || i < 1)) {//说明是一个函数组

                index = i;
                var next = searchGroup(expression, index, '(', ')');
                //获取下一个子表达式字符串
                var subexpression = expression.substr(index + 1, next - index - 1);
                groups.group = groups.group || [];
                var gp = {};
                seachFn(subexpression, 0, gp, params);
                i = next;
                groups.group.push(gp);
            }
            else {
                groups.group = groups.group || [];

                var k=searchGroupIndex(expression,i,'(');


                if(k==-1){//不存在分组
                    str = trim(expression.substr(i));
                    getFnName(str, groups.group, params);
                    return;
                }else{

                    //获取分组前面的表达式
                    str=trim(expression.substr(i,k-i));
                    getFnName(str, groups.group, params);

                    //继续处理分组函数
                    i=k-1;
                }

            }
        }
    }

    /**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 获取函数参数对象
    ** expression: (a[+]'a'[+](b + c + d)) 
    * 
    **/
    // [{fns:fn:,group:[]}]
    function getFunctionsAndParameters(expression) {

        var group = {}, params = [];
        seachFn(expression, 0, group, params);
        // console.log(group);
        // console.log(params);


        return { fnGroups: group, args: params };
    }


    function fillFnStr(fnstr, fn, key1, key2) {
        if (key1 && key2) {
            fnstr.push(key1);
            fnstr.push(fn);
            fnstr.push(key2);
        } else {
            fnstr.push(fn);
            fnstr.push(key1);
        }
    };

	/**
	** author:huangguoheng
	** date:2018-10-02
    ** email:4701136534@qq.com
    ** description: 乘法
	**
	**/
    function Fn() {
        this.fnstr = [];
    };



    Fn.prototype = {

        test: function (a1, a2) {

            var a = a1.split(',');


            var reg = new RegExp(a1), type, x = a2;

            if (a.length == 2) {
                if (a[1]) {
                    reg = new RegExp(a[0], a[1]);
                } else {
                    reg = new RegExp(a1);
                }
            } else {
                reg = new RegExp(a1);
            }

            type = Object.prototype.toString.call(a2);
            if (type == '[object Number]') {
                x = x + '';
            }

            return reg.test(x);
        },

        typeOf: function (a1, a2) {
            var type = Object.prototype.toString.call(a1);
            if (type == '[object Object]' && a2 === 'object')
                return true;
            else if (type == '[object Array]' && a2 === 'array')
                return true;
            else if (type === '[object Number]' && a2 === 'number') {
                return true;
            } else if (type === '[object Number]' || type === '[object String]') {

                console.log(a1);

                if (a2 == 'int' || a2 == 'integer' || a2 == 'long') {
                    if (/^\d+$/.test(trim(a1 + ""))) {
                        return true;
                    }
                } else if (a2 == 'float' || a2 == 'double') {
                    if (/^(\d+\.)?\d+$/.test(trim(a1 + ""))) {
                        return true;
                    }
                }

                if (a2 === 'string' && type === '[object String]') {
                    return true;
                }

            }

            return false;

        },

        tostring: function () {
            return this.fnstr.join('');
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 加分
		**/
        plus: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '+', key1, key2);

            if(isNum(a1)){
                a1=parseFloat(a1);
            }
            if(isNum(a2)){
                a2=parseFloat(a2);
            }

            return a1 + a2;
        },

		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 减法
		**/
        minus: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '-', key1, key2);
            return parseFloat(a1) - parseFloat(a2);
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 大于等于
		**/
        greatEquel: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '>=', key1, key2);
            return a1 >= a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 小于
		**/
        little: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '<', key1, key2);
            return a1 < a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 小于等于
		**/
        littleEqual: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '<=', key1, key2);
            return a1 <= a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 大于
		**/
        great: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '>', key1, key2);
            return a1 > a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 等于
		**/
        equal: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '=', key1, key2);
            return a1 == a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 不等于
		**/
        notEqual: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '!=', key1, key2);
            return a1 != a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 乘法
		**/
        mul: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '*', key1, key2);
            return a1 * a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 除法
		**/
        div: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '/', key1, key2);
            return a1 / a2;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 或者
		**/
        or: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '||', key1, key2);
            return !!(a1 || a2);
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 且
		**/
        and: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, '&&', key1, key2);
            return a1 && a2;
        },
		/**
        ** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 字符串包含
		**/
        like: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, 'like', key1, key2);
            return a1.indexOf(a2) != -1;
        },
		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 包含
		**/
        contains: function (a1, a2, key1, key2) {
            fillFnStr(this.fnstr, 'contains', key1, key2);
            for (var i = 0; i < a1.length; i++) {
                if (a1[i] == a2)
                    return true;
            }

            return false;
        }

    };


    function FnGroup() {
        this.fn = new Fn();
    };

    FnGroup.prototype = {
        invoke: function () {
            var fnName = arguments[0];
            return this.fn[fnName].apply(this.fn, Array.prototype.splice.call(arguments, 1));
        },

		/**
		** author:huangguoheng
		** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 转换为字符串
		**/
        tostring: function () {
            return "(" + this.fn.tostring() + ")";
        }
    };


    function orderby(data, sortField, asc) {
        data.sort(function (a, b) {

            return (a[sortField] > b[sortField] && asc) ? 1 : -1;

        });
    };


    function invokeFn(groups, groupFn, data, argkeys, keyIndexObj) {
        var result, a1, a2, a3, a4;
        for (var i = 0; i < groups.length; i++) {
            var fn = groups[i];
            type = Object.prototype.toString.call(fn);
            if (type == '[object String]') {


                if (Object.prototype.toString.call(groups[i + 1]) === '[object Object]') {
                    keyIndexObj.iv=false;
                    continue;
                } else {
                    if (keyIndexObj.iv == false) {
                        var k1 = argkeys[keyIndexObj.index], k2 = argkeys[keyIndexObj.index + 1];

                        if (k1[0] == '$') {
                            a2 = k1.substr(1);
                            a1 = data[a2];
                        } else {
                            a2 = k1;
                            a1 = k1;
                        }

                        if (k2[0] == '$') {
                            a4 = k2.substr(1);
                            a3 = data[a4];
                        } else {
                            a4 = k2;
                            a3 = k2;
                        }



                        result = groupFn.invoke(fn, a1, a3, a2, a4);
                        keyIndexObj.index += 2;

                    } else {
                        var k1 = argkeys[keyIndexObj.index];
                        if (k1[0] == '$') {
                            a2 = k1.substr(1);
                            a1 = data[a2];
                        } else {
                            a2 = k1;
                            a1 = k1;
                        }

                        result = groupFn.invoke(fn, result, a1, a2);
                        keyIndexObj.index++;
                    }
                    keyIndexObj.iv = true;
                }

            }

            else {
                //result=invokeFn(fn,new FnGroup(),data,argkeys,keyIndexObj);
                if (Object.prototype.toString.call(groups[i - 1]) == '[object String]') {
                    var rs;
                    if (typeof result === 'undefined') {
                        var id = keyIndexObj.index, k1 = argkeys[id];
                        keyIndexObj.index++;
                        rs = invokeFn(fn.group, new FnGroup(), data, argkeys, keyIndexObj);


                        if (k1[0] == '$') {
                            a2 = k1.substr(1);
                            a1 = data[a2];
                        } else {
                            a2 = k1;
                            a1 = k1;
                        }

                        result = groupFn.invoke(groups[i - 1], a1, rs, a2);
                    } else {
                        rs = invokeFn(fn.group, new FnGroup(), data, argkeys, keyIndexObj);
                        result = groupFn.invoke(groups[i - 1], result, rs);
                    }

                } else {
                    result = invokeFn(fn.group, new FnGroup(), data, argkeys, keyIndexObj);
                }
            }
        }

        return result;
    };

    function invokeFn2(obj, data) {

        /// iv 用来标志第一次执行或者第二次执行
        return invokeFn(obj.fnGroups.group, new FnGroup(), data, obj.args, { index: 0, iv: false })
    }
    El.prototype = {

        test: function (expression) {
            var obj = getFunctionsAndParameters(expression);
            console.log(obj);
        },

        run: function (expression) {
            var obj = getFunctionsAndParameters(expression),
                data = arguments[1];
            return invokeFn(obj.fnGroups.group, new FnGroup(), data, obj.args, { index: 0, iv: false });
        },

        /**
        ** author:huangguoheng
        ** date:2018-10-02
        ** email:4701136534@qq.com
        ** description: 乘法
        **/
        if: function (expression, data, trueResult, falseResult) {
            // if (arguments.length < 4) {
            //     throw new Error("arguments num too less,need 4 argument");
            // }

            // if (Object.prototype.toString.call(data) != '[object Object]') {
            //     throw new Error("second argument is not object");
            // }

            var result = this.run(expression, data);

            if (typeof trueResult != 'undefined' && result)
                return trueResult;

            if (typeof falseResult != 'undefined' && !result)
                return falseResult;

            // if (this.run(expression, data)) {
            //     return trueResult;
            // }

            return result;

        },

        /**
       ** author:huangguoheng
       ** date:2018-10-02
       ** email:4701136534@qq.com
       ** description: 过滤
       **
       **/
        filter: function (expression, data, sortFied, data2, asc) {
            var d = [];
            var obj = getFunctionsAndParameters(expression),
                data = arguments[1];


            for (var i = 0; i < data.length; i++) {
                var arg = data[i];
                if (!!data2)
                    arg = extend({}, arg, data2);
                if (invokeFn2(obj, arg)) {
                    d.push(data[i]);
                }
            }

            if (sortFied) {
                asc = typeof asc === 'undefined' ? true : asc;
                orderby(d, sortFied, asc);
            }

            return d;
        },

        /**
       ** author:huangguoheng
       ** date:2018-10-02
       ** email:4701136534@qq.com
       ** description: 求和
       **
       **/
        sum: function (expression, data) {
            var d = [];
            var obj = getFunctionsAndParameters(expression),
                data = arguments[1];

            if (Object.prototype.toString.call(data) == '[object Object]') {
                d[0] = invokeFn2(obj, data);
            } else {
                for (var i = 0; i < data.length; i++) {

                    d[i] = invokeFn2(obj, data[i]);
                }
            }


            return d;
        },

        /**
       ** author:huangguoheng
       ** date:2018-10-02
       ** email:4701136534@qq.com
       ** expression: 表达式: 'a+b*(c+d)'
       ** data: 数组如[{a:1,b:2,c:3,d:20}]
       ** field: 默认是avg,求平均值后会放入这个字段
       ** description: 把平均值返回
       **
       **/
        avg: function (expression, data,field) {
            // var d = [];
            var obj = getFunctionsAndParameters(expression),
                data = arguments[1],
                num = obj.args.length;

            if (Object.prototype.toString.call(data) == '[object Object]') {
                d[0] = invokeFn2(obj, data);
            } else {
                for (var i = 0; i < data.length; i++) {

                    data[i][field||'avg'] = invokeFn2(obj, data[i]) / num;
                }
            }

            return data;
            // return d;
        },

        /**
       ** author:huangguoheng
       ** date:2018-10-02
       ** email:4701136534@qq.com
       ** expression: 表达式: 'a+b*(c+d)'
       ** data: 数组如[{a:1,b:2,c:3,d:20}]
       ** fields: 选择返回的列：如['a','d']或者'a,d'
       ** data2,把data2的内容合并到data的每一次计算
       ** description: 选择符合条件的数据行
       **
       **/
        select: function (expression, data, fields, data2) {
            var d = [];
            var obj = getFunctionsAndParameters(expression),
                data = arguments[1];
            if (Object.prototype.toString.call(fields) === '[object String]') {
                fields = fields.split(',');
            }

            for (var i = 0; i < data.length; i++) {
                var arg = data[i];
                if (!!data2)
                    arg = extend({}, arg, data2);
                if (invokeFn2(obj, arg)) {
                    var ob = {};
                    for (var k = 0; k < fields.length; k++) {
                        ob[fields[k]] = arg[fields[k]];

                    }
                    d.push(ob);
                }
            }

            return d;
        }
    };

    win.el = new El();
    win.FnGroup = FnGroup;

})(window);