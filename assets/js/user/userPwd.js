// 声明一个form对象
let form = layui.form
//自定义layui中的验证规则
form.verify({
    // pwd: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
    pwd: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/, '密码必须包含大小写字母和数字的组合，不能使用特殊字符且长度在8-15之间'],
    //判断新密码是否与旧密码一致
    newPwd: function (value) {
        if (value === $('[name=oldPwd]').val()) {
            return '不能和原来密码相同！'
        }
    },
    //判断两次密码是否输入的一致
    reNewPwd: function (value) {
        if (value !== $('[name=newPwd]').val()) {
            return '两次密码不一致！'
        }
    }
})
//给表单添加submit事件
$('form').submit(function (e) {
    e.preventDefault() //阻止默认提交
    $.ajax({
        method: 'post', //交互类型
        url: 'http://big-event-api-t.itheima.net/my/updatepwd', //接口地址
        headers: {
            Authorization: localStorage.getItem('token') //含token值的请求头
        }, 
        data: {
            oldPwd: $('[name=oldPwd]').val(), //获取旧密码
            newPwd: $('[name=newPwd]').val() //获取新密码
        },
        //打印返回信息
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('修改密码失败')  //修改失败错误提示
            }
            layui.layer.msg(res.message) //修改成功提示
            $('form')[0].reset() //重置表单
        }
    })
})
