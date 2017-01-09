/**
 * Created by hxsd on 2016/12/3.
 */
$(function(){
    $('#Ajax-btn').on("click",function(){

        var Inputvalue=$("#Input").val();
        var url="http://wthrcdn.etouch.cn/weather_mini?city="+Inputvalue;
        //点击事件触发后，清空
        $('#temperature').html("");
        $('#condition').html("");
        $('.day p').html("");
        $('.day .pic_icon').html("");


        $.getJSON(url,function(weather){
            var content="<p>"+weather.data.wendu+"°</p>";
            var type="<span>"+weather.data.forecast[0].type+"</span>";
            var img_t=weather.data.forecast[0].type;
            var img;

            if(img_t=="霾"){
                img="<div id='weather_icon'><img src='images/pic_wumai.png'></div>";
            }else if(img_t=="多云"){
                img="<div id='weather_icon'><img src='images/pic_cloudy.png'></div>";
            }else if(img_t=="晴"){
                img="<div id='weather_icon'><img src='images/pic_sunny.png'></div>";
            }else if(img_t=="大雪"){
                img="<div id='weather_icon'><img src='images/pic_bigsnow.png'></div>";
            }else if(img_t=="打雷"){
                img="<div id='weather_icon'><img src='images/pic_dalei.png.png'></div>";
            }else if(img_t=="阵雪") {
                img = "<div id='weather_icon'><img src='images/pic_snow.png'></div>";
            }else if(img_t=="小雨") {
                img = "<div id='weather_icon'><img src='images/pic_rain.png'></div>";
            };

            $('#temperature').append(content);
            $('#temperature').append(type);
            $('#temperature').append(img);


            var fengli="<p>风力"+weather.data.forecast[0].fengli+"</p>";
            var high="<p>"+weather.data.forecast[0].high+"</p>";
            var low="<p>"+weather.data.forecast[0].low+"</p>";
            $('#condition').append(fengli);
            $('#condition').append(high);
            $('#condition').append(low);


            //底部调用数据  //正则
            $("#week_weather").find(".day").each(function(index,item){
                var str1= weather.data.forecast[index].high;
                var str2= weather.data.forecast[index].low;

                var num_h=str1.replace(/[\u4e00-\u9fa5]+/g, '');
                var num_l=str2.replace(/[\u4e00-\u9fa5]+/g, '');

                $(".day").eq(index).find("p").html(num_h+" ~ "+num_l);
            });

            //用最原始的方法实现循环插入图片
            var img=[];
            img[0]=weather.data.forecast[0].type;
            img[1]=weather.data.forecast[1].type;
            img[2]=weather.data.forecast[2].type;
            img[3]=weather.data.forecast[3].type;
            img[4]=weather.data.forecast[4].type;

            function getIcon(weather){
                var img="<img src='images/pic_wumai.png'>";
                var img_t={
                    "霾":"<img src='images/pic_wumai.png'>",
                    "多云":"<img src='images/pic_cloudy.png'>",
                    "晴":"<img src='images/pic_sunny.png'>",
                    "大雪":"<img src='images/pic_bigsnow.png'>",
                    "打雷":"<img src='images/pic_dalei.png.png'>",
                    "阵雪":"<img src='images/pic_snow.png'>",
                    "小雨":"<img src='images/pic_rain.png'>"
                };
                return img_t[weather] || img_t;
            }
            getIcon(img[0]);
            getIcon(img[1]);
            getIcon(img[2]);
            getIcon(img[3]);
            getIcon(img[4]);



            $(".pic_icon").eq(0).append(getIcon(img[0]));
            $(".pic_icon").eq(1).append(getIcon(img[1]));
            $(".pic_icon").eq(2).append(getIcon(img[2]));
            $(".pic_icon").eq(3).append(getIcon(img[3]));
            $(".pic_icon").eq(4).append(getIcon(img[4]));


            //切换背景图
            function getbg(weather){
                var img_b="images/mai.jpg";
                var img_bg={
                    "霾":"images/mai.jpg",
                    "多云":"images/duoyun.jpg",
                    "晴":"images/sunny.jpg",
                    "大雪":"images/xiaxue.jpg",
                    "打雷":"images/shandian.jpg",
                    "阵雪":"images/xiaxue.jpg",
                    "小雨":"images/xiayu.jpg",
                    "小雪":"images/xiaxue.jpg"
                };
                return img_bg[weather] || img_b;
            };
            var img_bg=getbg(weather.data.forecast[0].type);

            $("#background").animate({'opacity':0},500,function(){
                $("#background").css('backgroundImage','url('+img_bg+')').animate({'opacity':1},500);
            });

        });


    });

    $("#Ajax-btn").trigger("click");

    $("#Input").on("keyup",function(event){
        if(event.keyCode==13){
            $("#Ajax-btn").trigger("click");
        };
    });
});