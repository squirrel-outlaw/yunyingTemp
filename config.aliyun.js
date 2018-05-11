//SSH配置文件，用来进行项目在阿里云服务器的自动部署
var appName = 'yunyingTemp';
var serverRootDir = '/usr/share/nginx/html';
module.exports = {
    version: '1.0.0',
    env: 'aliyun server',
    //上传配置
    ssh: {
        host: '39.106.161.227',
        port: 22,
        username: 'root',
        password: '5843344520yyY',
    },
    remoteDir: `${serverRootDir}/${appName}`,
    commands: [
        //删除现有文件
        `rm -rf ${serverRootDir}/${appName}/*`
    ]
};
