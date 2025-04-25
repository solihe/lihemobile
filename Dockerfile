# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 首先只复制依赖相关文件，以利用缓存
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码和静态资源
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 安装必要的安全更新
RUN apk update && \
    apk upgrade && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# 使用非 root 用户运行 nginx
RUN addgroup -g 1000 appgroup && \
    adduser -u 1000 -G appgroup -h /home/appuser -D appuser && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物和静态资源
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/src/assets /usr/share/nginx/html/assets

# 设置正确的权限
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 切换到非 root 用户
USER appuser

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"] 