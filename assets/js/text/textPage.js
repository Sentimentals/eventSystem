//获取文章分类信息并且将其渲染到下拉框中
$.ajax({
    method: 'get', 
    url: 'http://big-event-api-t.itheima.net/my/article/cates',
    headers: {
        Authorization: localStorage.getItem('token')
    },
    success: function (res) {
        if (res.status !== 0) {
            return
        }
        res.data.forEach(function (item) {
            //new一个option对象将其追加到select中第一个参数为需要显示的值，第二个参数为其value值
            $('#textList').append(new Option(item.name, item.name))
        })
        //调用layui中form对象的render函数将其渲染到下拉框
        layui.form.render('select')
    }
})
//定义文章请求参数
let reqData = {
    pagenum: 1,   //当前页码数
    pagesize: '3',  //当前页需要的数据条数
    cate_id: '',  //文章分类id
    state: ''  //文章状态(可选值"已发布"或"草稿")
   }
