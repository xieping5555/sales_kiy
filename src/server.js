import server from './js/util/ajax';


//通知服务器访问结束
export function tellTheServerEnd(data){
    server('tell_the_server_end', data, false);
}


