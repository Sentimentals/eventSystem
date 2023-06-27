getUserInfo()
//通过ajax获取用户信息
function getUserInfo() {
    $.ajax({
        //传输方式
        method: 'get',
        //url地址
        url: 'http://big-event-api-t.itheima.net/my/userinfo',
        //需要附加的请求头用来核对token值
        headers: {
            Authorization: localStorage.getItem('token')
        },
        //传输成功后返回信息
        success: function (response) {
            let name = response.data.nickname || response.data.username
            // 展示出用户名或昵称以昵称优先
            $('.layui-nav #usName').html(name)
            //当返回来的状态码不等于0时返回错误消息
            if (response.status !== 0) {
                return layui.layer.msg(response.message)
            }
            //当状态码为0时
                //当返回来的数据中用户头像不为空时
            if (response.data.user_pic !== null) {
                //隐藏文字头像
                $('.headerMsg').hide()
                //显示图片头像并更改头像的scr属性
                $('#afterPic')
                    .show()
                    .attr('src', response.data.user_pic)
            } else {
                //当返回数据中用户的头像为空时
                //先优先获取昵称在获取用户名(如果昵称不为空时name的值为昵称，反之则为用户名)
                let name = response.data.nickname || response.data.username
                //获取到name的第一个字符并转化为大写
                $('.headerMsg').text(name[0].toUpperCase())
            }
        },
        //限制用户的访问权限
        //每个ajax请求都有一个complete属性，无论ajax请求提交是否成功都会返回complete
        complete: function (res) {
            if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
                //删除token值
                localStorage.removeItem('token')
                //跳转到登录页面
                location.href = './login.html'
            }
        }
    })
}
//给退出按钮添加点击事件
$('#logout_btn').click(function () {
    //初始化一个layer对象
    let layer = layui.layer
    //采用layer的confirm方法添加一个提示框
    layer.confirm('是否确认退出本系统？', {icon:3},function (index) {
        //退出系统后直接删除token值
        localStorage.removeItem('token')
        //且返回到登录页面
        location.href = './login.html'
        //点击取消按钮则取消本次操作
        layer.close(index)
    })
})
