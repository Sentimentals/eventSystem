getTextList()
function getTextList() {
  //发送ajax请求获取文章列表
  $.ajax({
    method: 'get', //传输方式
    url: 'http://big-event-api-t.itheima.net/my/article/cates', //接口地址
    headers: {
        Authorization: localStorage.getItem('token') //包含token的请求头
    },
    success: function (res) {
        if (res.status !== 0) {
            return layui.layer.msg('获取文章分类列表失败！') //根据状态码返回失败信息
        }
        let arr = []
        //对返回的数据进行遍历
        res.data.forEach(function (item) {
            //将遍历的数据放到存到数组中
          arr.push(`
            <tr>
              <td>${item.name}</td>
              <td>${item.alias}</td>
              <td>
                <button type="button" class="layui-btn layui-btn-normal layui-btn-radius layui-btn-sm editTextList" id=${item.Id}>编辑</button>
                <button type="button" class="layui-btn layui-btn-danger layui-btn-radius layui-btn-sm delTextList" id=${item.Id}>删除</button>
              </td>
            </tr>
          `)
          //将数据渲染到页面中
          $('.layui-table tbody').html(arr)
        });
    }
  })
}
// 申明一个对象用来存放layer.open的返回值
let indexAdd = null
//添加点击事件
$('#addBtn').click(function () {
  let layer = layui.layer //申明layer对象
  //采用layui中的open弹出层
  indexAdd = layer.open({
    type: 1,
    title:'添加文章类别',
    area: ['600px', '300px'], // 宽高
    //渲染输入框
    content: `
    <form class="layui-form" id="addTextForm">
      <div class="layui-form-item textInput">
        <label class="layui-form-label">文章类别</label>
        <div class="layui-input-block">
          <input type="text" name="textname" lay-verify="required" placeholder="请输入文章类别" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item textInput">
        <label class="layui-form-label">文章别名</label>
        <div class="layui-input-block">
          <input type="text" name="aliasname" lay-verify="required" placeholder="请输入文章别名" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item textInput">
        <button type="button" class="layui-btn layui-btn-lg layui-btn-normal" id="sureAddBtn">确定添加</button>
        <button type="button" class="layui-btn layui-btn-primary layui-btn-lg" id="resetBtn">重置</button>
      </div>
    </form>  
    `
  })
})
//采用事件委托的方法给确定添加按钮添加点击事件
$('body').on('click', '#sureAddBtn', function (e) {
  e.preventDefault() //阻止默认提交
  $.ajax({
      method: 'post', //传输方式
      url: 'http://big-event-api-t.itheima.net/my/article/addcates', //接口地址
      headers: {
        Authorization: localStorage.getItem('token') //携带token值的请求头
      },
      data: {
        name: $('form [name=textname]').val(), //获取文章类型的名称
        alias: $('form [name=aliasname]').val() //获取文章类型的别名
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('添加文章类别失败！') //失败消息提示
        }
        layui.layer.msg('添加文章类别成功！') //成功消息提示
        getTextList() //将数据更新到列表中
        layui.layer.close(indexAdd) //关闭弹出层
      }
  })
})
// 采用事件委托的方法给重置按钮添加点击事件
$('body').on('click', '#resetBtn', function () {
  $('form [name=textname]').val('') //将文章类型名称改为空
  $('form [name=aliasname]').val('') //将文章别名改为空
 })
//用代理的方法给编辑按钮事件
$('tbody').on('click', '.editTextList', function (e) {
  let id = e.target.id //获取点击对象的id
  let layer = layui.layer  //声明layer对象
  //采用layui中的open弹出层
  indexAdd = layer.open({
  type: 1,
  title:'编辑文章类别',
  area: ['600px', '300px'], // 宽高
  //渲染输入框
  content: `
  <form class="layui-form" id="addTextForm">
    <input type="hidden" id="textListId">
    <div class="layui-form-item textInput">
      <label class="layui-form-label">编辑类别</label>
      <div class="layui-input-block">
        <input type="text" name="oldTextname" lay-verify="required" placeholder="请输入文章类别" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item textInput">
      <label class="layui-form-label">编辑别名</label>
      <div class="layui-input-block">
        <input type="text" name="oldAliasname" lay-verify="required" placeholder="请输入文章别名" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item textInput">
      <button type="button" class="layui-btn layui-btn-lg layui-btn-normal sureEditBtn" id=${id}>确定修改</button>
      <button type="button" class="layui-btn layui-btn-primary layui-btn-lg" id="resetBtn">重置</button>
    </div>
  </form>  
  `
  })
  $.ajax({
    method: 'get',
    url: 'http://big-event-api-t.itheima.net/my/article/cates/' + id, //获取对应id的数据
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取信息失败')
      }
      //将获取的数据渲染到输入框中
      $('#addTextForm [name=oldTextname]').val(res.data.name) 
      $('#addTextForm [name=oldAliasname]').val(res.data.alias)
      //用事件委托给重置按钮添加点击事件
      $('body').on('click', '#resetBtn', function() {
        $('#addTextForm [name=oldTextname]').val(res.data.name)
        $('#addTextForm [name=oldAliasname]').val(res.data.alias)
      })
    }
  })
})
// 采用事件委托给修改按钮添加点击事件
$('body').on('click', '.sureEditBtn', function (e) {
  e.preventDefault() //阻止默认提交
  let id = e.target.id //获取所点对象的id
  $.ajax({
    method: 'post', 
    url: 'http://big-event-api-t.itheima.net/my/article/updatecate',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    data: {
      Id: id, //传输id
      name: $('#addTextForm [name=oldTextname]').val(), //传输类名
      alias: $('#addTextForm [name=oldAliasname]').val() //传输别名
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message) //返回失败信息
      }
      layer.msg('修改信息成功！') //返回成功信息
      getTextList() //更新列表
      layer.close(indexAdd) //关闭弹出框
    }
  })
})
//用事件委托的方法给删除按钮添加点击事件
$('tbody').on('click', '.delTextList', function (e) {
  let id = e.target.id //获取点击对象的id
  let layer = layui.layer //声明一个layer对象
  //删除提示框
  layer.confirm('是否确定删除此类别？', function(index) {
    $.ajax({
     method: 'get',
     url: 'http://big-event-api-t.itheima.net/my/article/deletecate/' + id, //对应的数据地址
     headers: {
      Authorization:localStorage.getItem('token') //携带token值的请求头
     },
     success: function (res) {
      if (res.status !== 0) {
        return layer.msg('删除信息失败！') //返回失败信息
      }
      layer.msg('删除信息成功！') //返回成功信息
      getTextList() //重新渲染列表
     }
    })
    layer.close(index) //关闭删除框
  })
})
