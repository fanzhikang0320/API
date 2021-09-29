
layui.use(['element', 'layer', 'util', 'form'], function(){
    var element = layui.element,
    layer = layui.layer,
    util = layui.util,
    form = layui.form,
    $ = layui.$;
    
    //头部事件
    util.event('lay-header-event', {
      //左侧菜单事件
      menuLeft: function(othis){
        layer.msg('展开左侧菜单的操作', {icon: 0});
      }
      ,menuRight: function(){
        layer.open({
          type: 1
          ,content: '<div style="padding: 15px;">暂无任何信息</div>'
          ,area: ['260px', '100%']
          ,offset: 'rt' //右上角
          ,anim: 5
          ,shadeClose: true
        });
      }
    });
    

    $.ajax({
      method: 'GET',
      url: '/website/all',
      data: {
    
      },
      success: (res) => {
        if (res.status === 'success') {
          res.data.forEach(ele => {

            if (localStorage.getItem('checkWebsite') === ele.website_id){
              $('#websiteSelect').append(new Option(ele.website, ele.website_id, true, true))
            } else {
              $('#websiteSelect').append(new Option(ele.website, ele.website_id))
            }
            
          })
          layui.form.render('select'); //重新渲染下拉框
        } else {
          layer.msg('查询网站信息失败!');
        }
      },
      fail: (err) => {
        layer.msg('Error: ' + err)
      }
    })

    // 触发选择网站事件, 用户缓存一下
    form.on('select(selectWebsite)', function(data){
      let website = data.value;
      

      if (localStorage.getItem('checkWebsite') === website) {

      } else {
        localStorage.setItem('checkWebsite', website);
        localStorage.removeItem('edit_article_id');
        window.location.replace(window.location.href);
      }
      
      
    });
  });

  function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }
  function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval=getCookie(name);
    if(cval!=null) { 
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
  }

$('.signOutBtn').on('click', () => {
  delCookie('token');
  localStorage.removeItem('checkWebsite');
  localStorage.removeItem('edit-article_id')
  window.location.replace('/login');
})


function formatTime(time) {
  let year = new Date(time).getFullYear(),
      month = new Date(time).getMonth() + 1,
      day = new Date(time).getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}



// let headerHeight = $('.layui-header.header-container').height();
// let footerHeight = $('.layui-footer.footer-container').height();
// let screenHeight = $(window).height();

// $(window).on('resize',function () {
//   $(this).height();
// })

// let height = screenHeight - headerHeight - footerHeight;
// // $('.main-container').height()

// $('.layui-table-view').css({
//   height: height
// })

