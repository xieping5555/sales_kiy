/**
 * @file AF销售工具
 */

import './css/index.css';
import {tellTheServerStart, tellTheServerEnd, saveImgClickHavior} from "./server";
import Timer from './js/util/timer';

$(window).on('load',() => {
    //注册fastClick
    FastClick.attach(document.body);

    let heightArray = [];

    /**
     * 获取每一个包裹元素距离页面顶部的高度
     */
    function getOffsetHeight(){
        $('.info-part').each((index,item) => {
            heightArray[index] = $(item).offset().top;
        });
    }

    /**
     * 给要放大的图片加上pro-img-index属性
     */
    function setProImgIndex(){
        $('.pro-img').each((index,item) => {
            $(item).data('pro-img-index',index);
        })
    }

    /**
     * 屏幕翻转重新获取元素距顶部高度
     */
    function orientationchange(){
        $(window).on('orientationchange',() => {
            getOffsetHeight();

            // if(player){
            //     setBigButtonOffset(player);
            // }
        })
    }

    /**
     * 改变导航栏
     * @param {Number} idx
     */
    function changeNav(idx){
        let navItem = $('.nav-item');

        navItem.each((index,item) => {
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

            changeNav(navIndex);

            // //动画滚动
            $('body').animate({'scrollTop':heightArray[navIndex]+ 1 + 'px'},'fast');

            return false;

        });
    }

    /**
     * 滚动导航栏切换样式
     */
    function scrollHandler (){
        let scrollFun,
            len = heightArray.length;
        scrollFun = () => {
            let scrTop = $(window).scrollTop();

            heightArray.forEach((item,i) => {
                let navHasClass = !$('.header-nav a').eq(i).hasClass('nav-active');
                if(i === len - 1){
                    if(heightArray[i] <= scrTop && navHasClass){
                        changeNav(i);
                    }
                }else{
                    if(heightArray[i] <= scrTop && scrTop < heightArray[i+1] && navHasClass){
                        changeNav(i);
                    }
                }
            })
        };
        $(window).on('scrollstop',() => {
            //判断滚动条是否滚到了底部
            if($(document).scrollTop() + $(window).height() >= $(document).height()){
                changeNav(len - 1);
                return;
            }
            scrollFun();
        });
    }

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

                saveImgViewInfo(gallery);
            };
        $('body').on('click',clickEle,openPhotoSwipe);
    }


    /**
     * 使用pjax无刷新载入子页面
     */
    function skipToChildPage(){
        $(document).pjax('a.sub-detail-link-describe','.body-content');
        //setVideo();
    }

    /**
     * pjax success时设置videojs
     */
    var player = {};
    function setVideo(){
        $(document).on('pjax:success', () => {

            let id = setVideoRandomId('.video-js');

            if(id){
                player = initVideo(id);
                debugger;
                setBigButtonOffset(player);
            }
        })
    }

    /**
     * 载入页面时设置pro-img的index值
     */
    function onPjaxEnd(){
        $(document).on('pjax:end',() => {
            setProImgIndex();
        })
    }

    /**
     * 为video标签生成随机数id
     * @param {String} videoClassName
     */
    function setVideoRandomId(videoClassName){
        let ranNum = Math.ceil(Math.random()*10000000 + 10000000);
        let videoId = 'videoId' + ranNum;

        if($(videoClassName).length){
            $(videoClassName).attr('id',videoId);
            return videoId;
        }else{
            return false;
        }

    }

    /**
     * 初始化videojs
     * @param {String} id
     */
    function initVideo(id){
        let player = videojs(id);

        return player;
    }

    /**
     * 设置播放按钮的offset和视频区域的高度
     * @param {Object} player
     */
    function setBigButtonOffset(player){

        let playWidth = player.currentWidth();
        //设置视频区域的高度
        player.height(playWidth*(9/16));

        //设置bigPlayButton的offset
        let bigPB = player.bigPlayButton;
        let playHeight = player.currentHeight();
        bigPB.el_.style.left = (playWidth - bigPB.currentWidth())/2 + 'px';
        bigPB.el_.style.top = (playHeight -bigPB.currentHeight())/2 + 'px';
    }

    /**
     * 监听页面关闭或刷新事件
     */
    function beforeUnload(){
        $(window).on('beforeunload',function(){
            tellTheServerEnd();
        });
    }

    /**
     * 保存用户访问图片信息
     * @param pswp
     */
    function saveImgViewInfo(pswp){
        let curImg = ''; //当前正在浏览的图片。
        let  viewTime = new Timer();

        //监听图片关闭事件
        pswp.listen('close', () => {
            let time = viewTime.end();
            saveImgClickHavior(curImg, time);
        });


        //监听图片放大载入完毕事件
        pswp.listen('imageLoadComplete', (index, item) => {
            let imgSrc = item.src.match(/\/imgs.+/g)[0];
            curImg = imgSrc;
            //先重置计时器
            viewTime.reset();
            //开始计算浏览时间
            viewTime.start();

        });

        //滑动图片时重新结算时间和图片
        pswp.listen('afterChange', () => {
            let time = viewTime.end();
            saveImgClickHavior(curImg, time);
        })
    }

    /**
     * 初始化
     */
    function init(){
        tellTheServerStart();
        beforeUnload();
        getOffsetHeight();
        setProImgIndex();
        orientationchange();
        navClick();
        scrollHandler();
        imgPro('.pro-img');
        imgPro('','.img-pro-btn');
        skipToChildPage();
        onPjaxEnd();

    }
    init();
});