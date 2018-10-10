

    $('body').on('click','.a-u-dialog a',function(){
      var user = $(this).parents('.add-user');
      var index = user.index();
      var name = user.find('.a-u-name .a-u-data-name').val();
      var content = user.find('.a-u-name textarea').val();
      var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
      var type = user.find('.a-u-dialog-master a').hasClass('btn-success');

      if(name == ''){
        alert('请输入用户名！');
        return false;
      }

      if(content == ''){
        alert('请输入聊天内容！');
        return false;
      }

      if(!img.length){
        img = '<img src="/Public/static/images/default-head.png" />';
      }

      content = replace_qq_emoji(content);

      var msg_class = type ? 'i-b-sen-text' : 'i-b-rec-text';
      var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

      var dialog = $('<div class="' + msg_class + '"><div>' + nick + '<span><i></i><em>' + content + '</em><a class="msg-del"></a></span></div></div>');
      //dialog.prepend(img);
      $('.i-body').append(dialog);
      return false; 
    });

    $('.add-time-btn').click(function(){
      var xinqi = $('.slt-xinqi option:selected').val();
      var shi = $('.slt-shi option:selected').val();
      var hour = $('.slt-hour option:selected').val();
      var minite = $('.slt-minite option:selected').val();
      var str = '';
      if(xinqi != '-')
        str += xinqi + ' ';
      if(shi != '-')
        str += shi;
      str += hour + ':';
      str += minite;
      var html = '<div class="i-b-time"><span>' + str + '</span><a class="msg-del"></a></div>';
      $('.i-body').append(html);
      return false;
    });



    $('body').on('change','.a-u-pic-show input',function() { 
      var img = document.createElement('img');//创建 img 对象
      var _this = $(this);
      var callback = _this.attr('data-callback');
  
      window.URL = window.URL || window.webkitURL;

      var imgFile = $(this).get(0);

      if(window.URL && imgFile.files[0]){
        var reader = new FileReader(); 
        reader.readAsDataURL(imgFile.files[0]); 
        reader.onload = function(e){ 
          var img = '<img src="'+this.result+'" alt=""/>'; 
          _this.parent().find('img').remove();
          _this.parent().append(img);

          if(callback){
            eval(callback + '()');
          }
        } 
      }
    });
	
	
	
	//2016-3-13 新增图片处理
	$('body').on('change','.a-u-pic-show-pic input',function() { 
      var img = document.createElement('img');//创建 img 对象
      var _this = $(this);
      var callback = _this.attr('data-callback');
  
      window.URL = window.URL || window.webkitURL;

      var imgFile = $(this).get(0);

      if(window.URL && imgFile.files[0]){
        var reader = new FileReader(); 
        reader.readAsDataURL(imgFile.files[0]); 
        reader.onload = function(e){ 
          var img = '<img src="'+this.result+'" alt=""/>'; 
          _this.parent().find('img').remove();
          _this.parent().append(img);

          if(callback){
            eval(callback + '()');
          }
        } 
      }
    });
	
	

    //添加用户
    $('#add-user').click(function(){

      var time = (new Date()).valueOf();
      var html = $('<div class="add-user"><div class="a-u-name"><p><span>聊天内容：</span><textarea class="a-u-content' + time + '"></textarea><a class="a-u-face btn-add-face" data-input="a-u-content' + time + '" href="#">表情</a></p></div><div class="a-u-dialog" style="clear:both;"><a class="btn btn-primary" data-type="left" href="#">添加文字对话</a></div><div class="a-u-dialog-master"><a class="btn btn-primary" href="#">设为主人</a></div><div class="a-u-dialog-del"><a class="btn btn-danger" href="#">删除用户</a></div></div>');
      $('.users').append(html);
      html.find('.btn-rand-username').click();
    });

    //删除用户
    $('body').on('click','.a-u-dialog-del',function(){
      if(confirm('您确认要删除？')){
        $(this).parents('.add-user').remove();
      }
      return false;
    });

    /*$('body').on('mouseover','.i-b-time,.i-b-rec-text,.i-b-sen-text',function(){
      $(this).find('.msg-del').show();
    });
    $('body').on('mouseout','.i-b-time,.i-b-rec-text,.i-b-sen-text',function(){
      $(this).find('.msg-del').hide();
    });*/

    $('body').on('click','.msg-del',function(){
      $(this).parents('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
    });

    $('.clear-dialog').click(function(){
      if(confirm('您确认要清除所有对话？')){
        $('.i-body').html('');
      }
    });

	
	//添加图片对话
	var pic_i = 0;
    $('body').on('click','.a-u-dialog-pic a',function(){
	  $('.i-body').css('background','none');
      var user = $(this).parents('.add-user');
      var name = user.find('.a-u-name .a-u-data-name').val();
      var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
      var pic = $(this).parent().parent().find('.a-u-pic-show-pic img').clone();
      var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
	  pic_i = pic_i + 1;
      if(name == ''){
        alert('请输入用户名！');
        return false;
      }
	  
	  if(!pic.length){
        alert('您没有上传图片！');
        return false;
      }

      if(!img.length){
        img = '<img src="/Public/static/images/default-head.png" />';
      }

      var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
      var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';
	  var pic_type = !type ? 'wx_pic_pos2' : 'wx_pic_pos';

      var unread = '';//type ? '' : '<strong></strong>';

      var html = $('<div class="' + wrap_class + '"><div class="i-b-voice">' + nick + '<span class="wx_pic_diy" id="s'+pic_i+'"><h6 class="' + pic_type + '"></h6><a class="msg-del"></a></span></div></div>');

	  //html.prepend(img);

      $('.i-body').append(html);
	  
	  $('#s'+pic_i).prepend(pic);
	  

      return false;
    });
	

    //主人切换
    $('body').on('click','.a-u-dialog-master a',function(){
      var parent = $(this).parents('.users');
      parent.find('.a-u-dialog-master a').removeClass('btn-success');
      $(this).addClass('btn-success');
      return false;
    });

    $('.body_bg_del').click(function(){
      $('.i-body').css('background-image','none');
      $('.a-u-pic-bodybg img').remove();
      return false;
    });

    $('#add-user').click();

    setTimeout(function(){
      $('.btn-rand-face').click();
      $('.btn-rand-username').click();
    },500);