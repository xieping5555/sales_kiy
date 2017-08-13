/**
 * Created by pc on 2017/7/27.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import {readUserInfo,
        getClientIp,
        writeUserInfo,
        getIP}
        from './modules/common';
const app = express();

//解决跨域请求
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);
    else  next();
});

//设置body-parser中间件来解析请求数据。
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/tell_the_server_end', (req, res) => {
    let info = req.body;
    console.log(info);
    let userInfo = Object.assign(info, {IP: getClientIp(req)});
    //访问结束，将信息写入json文件。
    let ws = fs.createWriteStream(__dirname + '/user_info.json', {
        flags: 'r+'
    });
    console.log(userInfo);
    ws.write(JSON.stringify(userInfo));

    let rs = fs.createReadStream(__dirname + '/user_info.json');
    rs.setEncoding('utf-8');
    rs.on('data', (data) => {

    })
    ws.on('error', (err) => {
        console.log(err);
    });

    res.send('end');
});


//默认获取到的是ipv6格式的ip，设置hostname即可得到ipv4格式的ip.
app.listen(3000,'0.0.0.0');