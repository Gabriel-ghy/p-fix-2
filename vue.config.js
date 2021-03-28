module.exports = {
    publicPath: './',
    //nginx build这么配置，直接替换usr/nginx/html下的所有文件
    //service nginx stop
    //nginx -c /etc/nginx/nginx.conf
    //端口占用就先重启吧。。
    //还不知道怎么转发后端接口
    outputDir: 'p-fix', // 打包输出的文件夹名
    indexPath: 'index.html',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        proxy: 'http://localhost:8081'
    }
}