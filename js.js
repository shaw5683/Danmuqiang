// JavaScript Document
var config = {
  syncURL: "https://danmushaw.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

var dataArr=[];

ref.set({
	'content':dataArr
});
var time;
$('#input').on('focus',function(){
	if($(this).val()=='说点什么？'){
		$(this).val('');	
	}
})
$('#input').on('blur',function(){
	if($(this).val()==''){
	$(this).val('说点什么？');
	}
})
$('#shoot').on('click',function(){
	if($('#input').val()!='说点什么？'&&$('#input').val()!=''){
		ref.child('content').push($('#input').val());
		$('#input').val('说点什么？');
		if(dataArr.length==1){
			setTimeout('dis()',3000);
		}
		if(dataArr.length>100){
			dataArr.shift();
		}

	}
})
$('#clear').on('click',function(){
	dataArr=[];	
	$('#input').val('说点什么？');
	clearInterval(time);
	$('#area').empty();
})

ref.child('content').on('child_added', function(snapshot) {
		var text = snapshot.val();
		dataArr.push(text);
		shoot();
	});
function move(ele){
	ele.animate({right:$('#area').width()},6000,'easeInQuad');
}
var conHeight=0;
function shoot(){
	var $con=$("<div class='content'>"+dataArr[dataArr.length-1]+"</div>");
	if(conHeight>$('#area').height()-40){
	conHeight=conHeight-$('#area').height();
	}
	$con.css({'top':conHeight,'color':'rgb('+randomInt(255)+','+randomInt(255)+','+randomInt(255)+')'})
	$con.appendTo($('#area'));
	move($con);
	conHeight+=50;	
}
function dis(){
	var $con=$("<div class='content'>"+dataArr[randomInt(dataArr.length)]+"</div>");
	if(conHeight>$('#area').height()-20){
	conHeight=conHeight-$('#area').height();
	}
	$con.css({'top':conHeight,'color':'rgb('+randomInt(255)+','+randomInt(255)+','+randomInt(255)+')'})
	$con.appendTo($('#area'));
	move($con);
	conHeight+=50;
	if($('.content').length>100){
		$('.content:lt(50)').remove();
	}
	time=setTimeout('dis()',3000);
	
}
function randomInt(ele){
	return Math.floor(Math.random()*ele);	
}

