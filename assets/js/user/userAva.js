  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)


  $('#updataBtn').click(function () {
    $('#chooseFiles').click()
    $('#chooseFiles').change(function (e) {
     //1. 拿到用户选择的文件
     let file = e.target.files[0]
     //2. 根据选择的文件，创建一个对应的 URL 地址：
     let newImgURL = URL.createObjectURL(file)
     //3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
     $image
         .cropper('destroy')      // 销毁旧的裁剪区域
         .attr('src', newImgURL)  // 重新设置图片路径
         .cropper(options)        // 重新初始化裁剪区域
    })
})
$('#suerBtn').click(function () {
 let dataURL = $image
     .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
         width: 100,
         height: 100
     })
     .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
 $.ajax({
     method: 'post',
     url: 'http://big-event-api-t.itheima.net/my/update/avatar',
     headers: {
         Authorization: localStorage.getItem('token')
     },
     data: {
         avatar: dataURL
     },
     success: function (res) {
         if (res.status !== 0) {
             return layui.layer.msg('修改头像失败')
         }
         layui.layer.msg('修改头像成功')
         window.parent.getUserInfo()
     }
 })
})
