$("#dt-feature").click(function(){
	var pos = $("#forFeature").position().top;
	$("html,body").stop(true,false).animate({scrollTop:pos-0},500, "easeOutBack");
});

$("#dt-special").click(function(){
	var pos = $("#forSpecial").position().top;
	$("html,body").stop(true,false).animate({scrollTop:pos-0},500, "easeOutBack");
});

$("#dt-cover").click(function(){
	var pos = $("#forCover").position().top;
	$("html,body").stop(true,false).animate({scrollTop:pos-100},500, "easeOutBack");
});

$("#dt-digital").click(function(){
	var pos = $("#forDigital").position().top;
	$("html,body").stop(true,false).animate({scrollTop:pos-0},500, "easeOutBack");
});

$("#dt-design").click(function(){
	var pos = $("#forDesign").position().top;
	$("html,body").stop(true,false).animate({scrollTop:pos-0},500, "easeOutBack");
});