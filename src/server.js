import server from './js/util/ajax';
import browserInfo from './js/util/get_browser_info';
import Timer from './js/util/timer';

const timer = new Timer();

//通知服务器用户开始访问。
export function tellTheServerStart(){
    server('tell_the_server_start', {
        'browser': browserInfo,
        'system': navigator.platform,
        'DPI': window.screen.width + '*' + window.screen.height
    });

    //开始记录用户访问时间
    timer.start();
}

//通知服务器访问结束
export function tellTheServerEnd(){
    server('tell_the_server_end', {
        'visitTime': timer.end()
    }, false);
}

//记录点击图片的行为
export function saveImgClickHavior(imgSrc, standTime){
    server('save_img_click_havior',{
        'imgSrc':imgSrc,
        'standTime': standTime
    })
}

