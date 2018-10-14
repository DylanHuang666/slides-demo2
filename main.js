let $buttons=$('#buttonWrapper>button')
let $slides=$('#slides')
let $images=$slides.children('img')
let $firstCopy=$images.eq(0).clone(true)   //克隆第一张图片
let $lastCopy=$images.eq($images.length-1).clone(true)   //克隆最后一张图片
$slides.append($firstCopy)  //把克隆的第一张图片插到$slides前面，组成一个新的$slides
$slides.prepend($lastCopy)  //把克隆的最后一张图片插到$slides后面，组成一个新的$slides

$slides.css({transform:'translateX(-362px)'})  //刚开始先显示第一张图片

let current=0                                    //设置一个记录图片信息的变量

$buttons.eq(0).on('click',function(){           //第一张和最后一张之间点击切换快的时候会有bug,因为图片还没变回真正的位置时就已经点击了第一或最后，导致是从克隆的图片位置开始移动，造成bug
    if(current==2){
        $slides.css({transform:'translateX(-1448px)'})                       //移动到克隆的位置
          .one('transitionend',function(){                                   
              $slides.hide().css({transform:'translateX(-362px)'}).offset()  //动画一结束马上不用动画去移动到真正的位置，避免影响下一次点击切换图片
              $slides.show()
          })
    }else{
        $slides.css({transform:'translateX(-362px)'})
    }
    current=0
})
$buttons.eq(1).on('click',function(){
    $slides.css({transform:'translateX(-724px)'})
    current=1
})
$buttons.eq(2).on('click',function(){
    if(current==0){
        $slides.css({transform:'translateX(0px)'})                                 //移动到克隆的位置
          .one('transitionend',function(){                                         
              $slides.hide().css({transform:'translateX(-1086px)'}).offset()       //动画一结束马上不用动画去移动到真正的位置，避免影响下一次点击切换图片
              $slides.show()
          })
    }else{
        $slides.css({transform:'translateX(-1086px)'})
    }
    current=2
})