
import './css/common.css';

$(window).on('load',function(){
    //注册fastClick
    FastClick.attach(document.body);

    let heightArray = [];

    /**
     * 获取每一个包裹元素距离页面顶部的高度
     */
    function getOffsetHeight(){
        $('.info-part').each(function(index,item){
            heightArray[index] = $(item).offset().top;
        });
    }

    getOffsetHeight();


    /**
     * 屏幕翻转重新获取元素距顶部高度
     */
    function orientationchange(){
        $(window).on('orientationchange',() => {
            getOffsetHeight();
        })
    }

    orientationchange();

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


    /**
     * 点击导航栏
     */
    function navClick(){
        $('body').on('click','.nav-item',function(){
            let me = this,
                navIndex = $(me).data('nav-index');

            $(window).on('scrollstop',() => {
                changeNav(navIndex);
            });

            // //动画滚动
            $('body').animate({'scrollTop':heightArray[navIndex] + 'px'},'fast');

            return false;

        });
    }

    navClick();

    /**
     * 滚动导航栏切换样式
     */
    function scrollHandler (){
        let scrollFun;

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

        $(window).on('scrollstop',() => {
            scrollFun();
        });

    }

    scrollHandler();

    /**
     * 点击图片放大
     * @param {Object} imgEle
     * @param {object} btnEle
     */
    function imgPro (imgEle,btnEle){

        let proImgIndex,
            pswpElement = document.querySelectorAll('.pswp')[0],
            $item,
            $window = $(window),
            $me,
            scale,
            options,
            imgList,
            imgInfoMap,
            clickEle = imgEle ? imgEle : btnEle,
            ele = imgEle ? imgEle : '.btn-click-pro-img-box > img';

        let openPhotoSwipe = function(e) {
                proImgIndex = imgEle ? $(e.target).data('pro-img-index') : 0;
                imgInfoMap = [];

                $(ele).each(function(index,item){
                        $item = $(item);
                        $me = this;
                        scale = $window.width()/$item.width();

                    imgInfoMap.push({
                        w:$item.width() * scale,
                        h:$item.height() * scale,
                        src:$me.src
                    })
                });
                options = {
                    history: false,
                    focus: false,
                    showAnimationDuration: 100,
                    hideAnimationDuration: 100,
                    //start index
                    index:proImgIndex,
                    tapToClose:true,
                    maxSpreadZoom:4
                };

                imgList = imgEle ? imgInfoMap : [imgInfoMap[$(e.target).data('btn-pro-index')]];
                const gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, imgList, options);
                gallery.init();
            };
        $('body').on('click',clickEle,openPhotoSwipe);
    }

    imgPro('.pro-img');

    imgPro('','.img-pro-btn');

    /**
     * 异步载入页面
     * @param {String} src
     * @param {Function} callback
     */
    function loadPage(src,callback){
        $('.body-content').load(src,callback);
    }

    /**
     * 跳转到子页面
     */
    function skipToChildPage(){
        $('body').on('click','.sub-detail-link',function(e){
            let pageType = $(e.currentTarget).data('page-type') || 0;

            switch (pageType){

                case 'risk_evaluation':

                    loadPage('/html/risk_evaluation.html');
                    history.pushState({
                        page:'risk_evaluation'
                    },'','risk_evaluation.html');
                    $('body').scrollTop(0);
                    break;

                case 'strategy':

                    loadPage('/html/strategy.html');
                    history.pushState({
                        page:'strategy'
                    },'','strategy.html');
                    $('body').scrollTop(0);
                    break;

                default:
            }

            $(window).on('popstate',function(){
                loadPage('/html/home.html');
                $('body').animate({'scrollTop':0 },'fast');
            });

            return false;
        })
    }

    skipToChildPage();
});