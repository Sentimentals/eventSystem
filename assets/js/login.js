;(function () {
    //给去注册添加点击事件
    $('#box_reg').click(function () {
        //点击后显示注册页面隐藏登录页面
        $('.box_reg').show()
        $('.box_login').hide()
    })
    //给去登录添加点击事件
    $('#box_login').click(function () {
        //点击后显示登录页面隐藏注册页面
        $('.box_reg').hide()
        $('.box_login').show()
    })
    //自己定义输入框验证规则
    let form  = layui.form
    form.verify({
        //用户名的正则判断
        use: [/^[\S]{6,20}$/, '账号是6-20位之间的非空字符'],
        //密码的正则判断
        // pwd: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
        pwd: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/, '密码必须包含大小写字母和数字的组合，不能使用特殊字符且长度在8-15之间'],
        //确认密码与密码的判断
        repwd: function (value) {
            let password = $('.box_reg [name=password]').val()
            if (password !== value) {
                return '两次输入的密不一致'
            }
        }
    })
    //给注册表单添加提交事件
    $('#reg_box').submit(function (e) {
        //默认阻止提交
        e.preventDefault()
        //声明一个layer对象方便美化提示框
        let layer = layui.layer
        //进行ajax操作
        $.ajax({
            //传输方式
            method: 'post',
            //传输的地址
            url: 'http://big-event-api-t.itheima.net/api/reguser',
            //传输的数据
            data: {
                username: $('#reg_box [name=username]').val(), 
                password: $('#reg_box [name=password]').val()
            },
            //返回的结果
            success: function (response) {
                if (response.status !== 0) {
                    //返回的错误信息
                    return layer.msg(response.message)
                }
                //返回的正确信息
                layer.msg(response.message)
                //模拟点击
                $('#box_login').click()
            }
        })
    })
    //给登录表单添加提交事件
    $('#login_box').submit(function (e) {
        //阻止默认提交
        e.preventDefault()
        //声明一个layer对象
        let layer = layui.layer
        $.ajax({
            //传输方式
            method: 'post',
            //传输的地址
            url: 'http://big-event-api-t.itheima.net/api/login',
            //传输的数据
            data: {
                username: $('#login_box [name=username]').val(),
                password: $('#login_box [name=password]').val()
            },
            success: function (response) {
                // console.log(response)
                if (response.status !== 0) {
                    //返回错误信息
                    return layer.msg(response.message)
                }
                //将登录的token值存在本都
                localStorage.setItem('token', response.token)
                //跳转到后台主页面
                location.href = './index.html'
            }
        })
    })


} ())