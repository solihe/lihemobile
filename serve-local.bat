@echo off
echo 正在检查构建产物...

if not exist ".\dist" (
    echo 未发现构建产物，正在执行构建...
    call npm run build
)

echo 正在启动本地服务...
echo 访问 http://localhost:8080 预览网站
serve -s dist -l 8080 