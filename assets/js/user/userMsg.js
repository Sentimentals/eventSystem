orderUserMsg()
//定义一个获取用户信息的方法
function orderUserMsg() {
  $.ajax({ 
  method: 'get',   //请求方式
  url: 'http://big-event-api-t.itheima.net/my/userinfo',  //请求链接
  headers: {
    Authorization: localStorage.getItem('token')  //携带token的请求头
  },
  //请求成功后返回来的信息
  success: function (res) {
    if (res.status !== 0) {
      return layui.layer.msg(res.message) //失败信息
    }
    $('.userId').val(res.data.id) //获取用户id
    $('[name=username]').val(res.data.username) //获取用户名
    $('[name=nickname]').val(res.data.nickname) //获取用户昵称
    $('[name=email]').val(res.data.email)  //获取用户邮箱
  }
})
}
let form = layui.form  //定义一个layui中的form对象
form.verify({
  nickname: [/^[\S]{1,6}$/, '昵称必须是1~6位的为空字符！']  //自定义验证昵称的方法
})
//给重置按钮添加点击事件
$('#resetBtn').click(function () {
  orderUserMsg()
})
//给form表单添加submit提交事件
$('form').submit(function (e) {
  e.preventDefault() //阻止默认提交事件
  $.ajax({
  method: 'post', //请求方式
  url: 'http://big-event-api-t.itheima.net/my/userinfo', //请求接口
  headers: {
    Authorization: localStorage.getItem('token') //请求头需要携带的token值
  },
  //post请求需要携带的参数
  data: {
    id:  $('.userId').val(), //用户的id
    nickname: $('[name=nickname]').val(), //用户的昵称
    email: $('[name=email]').val() //用户的邮箱
  },
  success: function (res) {
    if (res.status !== 0) {
      return layui.layer.msg('修改信息失败！') //返回修改失败信息
    }
    layui.layer.msg(res.message) //修改成功提示消息
    window.parent.getUserInfo()  //重新渲染用户夫人基本信息和头像
  }
})
})
