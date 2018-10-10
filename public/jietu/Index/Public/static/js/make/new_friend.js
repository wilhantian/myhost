var is_mobile = '';
if(is_mobile == '1'){
    $('.i-w-pay-money').addClass('i-w-pay-money-mobile');
}

$('body').on('change','.a-u-pic-show input',function() {
    var img = document.createElement('img');//创建 img 对象
    var _this = $(this);

    window.URL = window.URL || window.webkitURL;

    var imgFile = $(this).get(0);

    if(window.URL && imgFile.files[0]){
        var reader = new FileReader();
        reader.readAsDataURL(imgFile.files[0]);
        reader.onload = function(e){
            var img = '<img src="'+this.result+'" alt=""/>';
            _this.parent().find('img').remove();
            _this.parent().append(img);
            $('.i-b-a-face').css('background-image','url(' + this.result + ')');
        }
    }
});

$('.add_friend').click(function(){
    var users = $(this).parents('.users');
    var face = users.find('.a-u-pic-show img').attr('src');
    var nick_name = users.find('.a-u-data-name').val();
    var content = users.find('.a-u-content').val();
    var status = users.find('.status').val();
    if(!face || !nick_name || !content || !status){
        layer.msg('信息不完整！');
    }else{
        str = '<li>';
        str += '<div class="tx"><img src="'+face+'" /></div>';
        str += '<div class="text">';
        str += nick_name+'<br>';
        str += '<span class="text_hi">'+content+'</span>';
        str += '</div>';
        str += '<div class="status'+status+'"></div>';
        str += '</li>';
        $('.new_friend_box').append(str);
    }
})


$('.clear-dialog').click(function(){
    $('.new_friend_box').html('');
})