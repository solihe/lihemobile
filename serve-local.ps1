# 检查是否已构建项目
if (-not (Test-Path -Path "./dist")) {
    Write-Host "未发现构建产物，正在执行构建..." -ForegroundColor Yellow
    npm run build
}

# 启动服务
Write-Host "正在启动本地服务..." -ForegroundColor Green
Write-Host "访问 http://localhost:8080 预览网站" -ForegroundColor Cyan
serve -s dist -l 8080 