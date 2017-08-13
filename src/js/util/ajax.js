export default function server(serverName,data,async){
    //ie10以下跨域会报 no transport的错误
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/'+serverName,
        async:async || true,
        data:data || {},
        success: () => {

        },
        error: (err) => {
            if(err){
                alert('未知错误(┬＿┬)');
            }
        }
    })
};