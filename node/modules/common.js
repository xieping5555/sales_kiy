import path from 'path';
import fs from 'fs';

export function readUserInfo(){
    let fileUrl = path.resolve(__dirname,'../user_info.json');
    return new Promise((resolve, reject) => {
        fs.readFile(fileUrl, 'utf-8', (err, data) => {
            if(err){
                return reject(err);
            }else{
                return resolve(data);
            }
        })
    })
}


export function getClientIp(req){
    return req.ip;
}

export function writeUserInfo(){
    let fileUrl = path.resolve(__dirname,'../user_info.json');
    let file = readUserInfo();
    file.then((data) => {

    }).catch((err) => {
        console.log(err);
    })
}

/**
 * 获取ip地址
 * @param  {HTTP Request} req http请求信息
 * @return {String}     ip地址
 */
export function getIP(req) {
    let ip = null;
    if ( req.headers['x-forwarded-for'] ) {
        ip = req.headers['x-forwarded-for'];
    }
    else if ( req.headers['x-real-ip'] ) {
        ip = req.headers['x-real-ip'];
    }
    else if ( req.headers['remote_addr'] && req.headers['client_ip'] )
    {
        ip = req.headers['client_ip'];
    }
    else if ( req.headers['remote_addr'] )
    {
        ip = req.headers['remote_addr'];
    }
    else if ( req.headers['client_ip'] )
    {
        ip = req.headers['client_ip'];
    }
    else {
        return "0.0.0.0";
    }

    return ip;
};