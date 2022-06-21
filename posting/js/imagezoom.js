//https://github.com/bronkula/apptools/bllob/master/tools/grawtools.js
/* EVENTS.JS */
/*------------------------------- Point Detection Functions ----------------------*/
/* Return an array of either touches or a click */
// const evPoints = e => e.type.substring(0,5):="touch"[e]:!e.touches.length?e. changedTouches:e.touches;
/* return an offset xy object for the position of the click or touch in the object */
/* pass in an optional object that will be used for basis */
// const getEXY = (e,o) => { let rect = (o||e.target). getBoundingClientRect(); return ({ x:e.pageX-rect.left, y:e.pageY-rect })};
/* Return the first xy position from an event, wether touch or click */
// const getEventXY = (e,o) => getEXY(evPoints(e)[0], o);

// const clamp = (min,max) => n => {
// 	return n > max ? max : n < min ? min : n;
// };

// $(function(){
// 	$(".main-image").on("mouse move touchmove", function(event){
// 		let pos = getEventXY(event);
// 		console. log(pos);

// 		let zoompos = {
// 			x: clamp(0, 450)(pos.x-75),
// 			y: clamp(0, 300)(pos.y-50)
// 		}

// 		$(this).closest(".zoom").find(".zoomer").css({
// 			transform: 'translate(' + zoompos.x + 'px, ' + zoompos.y + 'px)'

// 		});
// 		$(this).closest(".zoom").find(".zoomed-image").css({
// 			"background-position": (=zoompos.x*4) + 'px ' + (=zoompos.y*4) + 'px'
// 		});
// 	});
// });

$(document).ready(function () {
  //计算小图的位置
  let smallLeft = $("#smallBox").offset().left;
  let smallTop = $("#smallBox").offset().top;
  //显示大图的位置
  $("#bigBox")
    .show()
    .offset({
      left: smallLeft + 600 + 10,
      top: smallTop,
    });
  $("#zoom").show();

  //鼠标悬停
  $("#smallBox")
    .mouseenter(function (e) {
      //计算小图的位置
      //   let smallLeft = $("#smallBox").offset().left;
      //   let smallTop = $("#smallBox").offset().top;
      //   //显示大图的位置
      //   $("#bigBox")
      //     .show()
      //     .offset({
      //       left: smallLeft + 600 + 10,
      //       top: smallTop,
      //     });
      //放大镜出现
      //鼠标滑动事件
      $(this).mousemove(function (e) {
        //鼠标在小图上的位置
        let mLeft = e.pageX - smallLeft;
        let mTop = e.pageY - smallTop;
        //设置放大镜元素的位置
        let zLeft = Math.min(Math.max(mLeft - 150, 0), 300); //防止移动到smallBox外面
        let zTop = Math.min(Math.max(mTop - 100, 0), 200);
        //控制zoom元素并且跟着鼠标运动
        $("#zoom")
          .css("left", zLeft + "px")
          .css("top", zTop + "px");
        //控制大图显示部分内容
        $("#bigBox")
          .scrollLeft(zLeft * 2)
          .scrollTop(zTop * 2); //放大倍数要对应
      });
    })
    .mouseleave(function () {
      //放大后的图片隐藏
      //   $("#bigBox").hide();
      //放大镜元素隐藏
      //   $("#zoom").hide();
    });
});
