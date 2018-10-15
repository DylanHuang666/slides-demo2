let $buttons=$('#buttonWrapper>button')
let $slides=$('#slides')
let $images=$slides.children('img')
let current=0    //设置一个记录图片信息的变量

makeFakeSlides()  //克隆图片插进去

$slides.css({transform:'translateX(-362px)'})  //初始化图片位置，刚开始先显示第一张图片

bindEvents()   //监听按钮点击事件，去移动slids

$(previous).on('click',function(){  //上一张
    goToSlides(current-1)
})
$(next).on('click',function(){   //下一张
    goToSlides(current+1)
})

let timer=setInterval(function(){  //自动轮播
    goToSlides(current+1)
    
},1500)


$('.container').on('mouseenter',function(){  //鼠标事件监听
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer=setInterval(function(){
        goToSlides(current+1)
        
    },1500)    
})




function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        $buttons.eq(index).addClass('light').siblings().removeClass('light') //点击按钮高亮
        goToSlides(index)  //移动slides
    })
}


function goToSlides(index){
    
    if(index>$buttons.length-1){
        index=0
    }else if(index<0){
        index=$buttons.length-1
    }

    $buttons.eq(index).addClass('light').siblings().removeClass('light')  //添加高亮按钮类light

    if(current === $buttons.length - 1 && index === 0){    //最后一张到第一张
        $slides.css({transform:`translateX(${-($buttons.length + 1) * 362}px)`})        //移动到克隆的位置
        .one('transitionend',function(){                                   
            $slides.hide().css({transform:`translateX(${-(index+1) * 362}px)`}).offset()  //动画一结束马上不用动画去移动到真正的位置，避免影响下一次点击切换图片
            $slides.show()
            // $buttons.eq(index).addClass('light').siblings().removeClass('light')
        })
    }else if(current === 0 && index===$buttons.length - 1){    //第一张到最后一张
        $slides.css({transform:`translateX(0px)`})                       
        .one('transitionend',function(){                                   
            $slides.hide().css({transform:`translateX(${-($buttons.length) * 362}px)`}).offset()  
            $slides.show()
            // $buttons.eq(index).addClass('light').siblings().removeClass('light')
        })
    }else{
        $slides.css({transform:`translateX(${-(index+1) * 362}px)`})
        // .one('transitionend',function(){
        //     $buttons.eq(index).addClass('light').siblings().removeClass('light')
        // }) 
    }
    current = index //用current记录下当前是哪张图片
}

function makeFakeSlides(){
    let $firstCopy=$images.eq(0).clone(true)   //克隆第一张图片
    let $lastCopy=$images.eq($images.length-1).clone(true)   //克隆最后一张图片
    $slides.append($firstCopy)  //把克隆的第一张图片插到$slides前面，组成一个新的$slides
    $slides.prepend($lastCopy)  //把克隆的最后一张图片插到$slides后面，组成一个新的$slides
}