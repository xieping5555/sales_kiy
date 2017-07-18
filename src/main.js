
import './css/common.css';


$(window).on('load',function(){
    //注册fastClick
    FastClick.attach(document.body);

    let heightArray = [],
        parOffsetH = $('.content').offset().top;

    //获取每一个包裹元素距离页面顶部的高度


    $('.info-part').each(function(index,item){
        heightArray[index] = $(item).offset().top + parOffsetH;
    });


    /**
     * 改变导航栏
     * @param {Number} idx
     */
    function changeNav(idx){
        let navItem = $('.nav-item');

        navItem.each(function(index,item){
            if ( $(item).hasClass('nav-active') ) {
                $(item).removeClass('nav-active');
            }
        });
        navItem.eq(idx).addClass('nav-active');
    }


    $('.header-nav').on('click','a',function(){

        let me = this,
            navIndex = $(me).data('nav-index');

        changeNav(navIndex);

        // //动画滚动
        // $('body').animate({'scrollTop':heightArray[navIndex] + 'px'},'fast');

    });

    /**
     * 滚动导航栏切换样式
     */
    function scrollHandler (){
        let timer,
            scrollFun;

        scrollFun = () => {
            let scrTop = $(window).scrollTop();

            if(heightArray[0] <= scrTop && scrTop < heightArray[1] && !$('.header-nav a').eq(0).hasClass('nav-active')){
                changeNav(0);
            }

            if(heightArray[1] <= scrTop && scrTop < heightArray[2] && !$('.header-nav a').eq(1).hasClass('nav-active')){
                changeNav(1);
            }

            if(scrTop > heightArray[2] && !$('.header-nav a').eq(2).hasClass('nav-active')){
                changeNav(2);
            }
        };


        $(window).on('scroll',() => {
            scrollFun();
        });

        // //手机端惯性滚动时导航栏样式不会切换
        // timer = setInterval(() => {
        //     scrollFun();
        // },100)
    }

    scrollHandler();
});