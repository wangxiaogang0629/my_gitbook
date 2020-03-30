##	一／安装brew
#####	前提Xcode已经安装
####	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

####	安装所需依赖：brew install FORMULA

brew tap 增加一个程序源

##二／安装PHP（FPM方式）
首先：加入Homebrew官方的几个软件源

#####	brew tap homebrew/dupes
#####	brew tap homebrew/versions
#####	brew tap homebrew/php

PHP如果采用默认配置安装，会编译 mod_php 模块并只运行在Apache环境下，为了使用Nginx，这里需要编译php-fpm并且禁用apache，主要通过参数 --without-snmp --without-apache 来实现。完整的安装指令为

>	brew install php56 \
>
>	--without-snmp \
>
>	--without-apache \
>
>	--with-debug \
>--with-fpm \
>
>--with-intl \
>
>--with-homebrew-curl \
>
>--with-homebrew-libxslt \
>
>--with-homebrew-openssl \
>
>--with-imap \
>
>--with-mysql \
>
>--with-tidy

------------------------------
由于OSX已经自带了PHP环境，因此需要修改系统路径，优先运行brew安装的版本，在 ~/.bashrc 里加入：

export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

*****

下面是一些扩展，可以支持 Phalcon框架 ：

brew install php56-gearman php56-msgpack php56-memcache php56-memcached php56-mongo  php56-phalcon php56-redis php56-xdebug

--------------------
PHP-FPM的加载与启动

安装完毕后可以通过以下指令启动和停止php-fpm

php-fpm -D

killall php-fpm

--------------------------
同时可以将php-fpm加入开机启动

ln -sfv /usr/local/opt/php56/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.php56.plist

sodo php-fpm -D 权限启动（处理user，groun没有root报错）

---------------

##安装Nginx
brew install nginx

使用root 权限启动：sudo nginx

开机启动：ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist

-----------
####	Nginx + PHP-FPM配置

Nginx一般都会运行多个域名，因此这里参考了 @fish的方法 ，按Ubuntu的文件夹结构来存放Nginx的配置文件

mkdir -p /usr/local/var/logs/nginx

mkdir -p /usr/local/etc/nginx/sites-available

mkdir -p /usr/local/etc/nginx/sites-enabled

mkdir -p /usr/local/etc/nginx/conf.d

mkdir -p /usr/local/etc/nginx/ssl

--------------

编辑Nginx全局配置：

vim  /usr/local/etc/nginx/nginx.conf

配置
vim /usr/local/etc/nginx/conf.d/php-fpm


##安装Mysql

brew install mysql

最后将MySQL加入开机启动

cp /usr/local/Cellar/mysql/5.6.22/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/

##Memcache

brew install memcached

#####启动/停止指令

memcached -d

killall memcached

#####加入开机启动

cp /usr/local/Cellar/memcached/1.4.20/homebrew.mxcl.memcached.plist ~/Library/LaunchAgents/

##Redis

brew install redis

Redis默认配置文件不允许以Deamon方式运行，因此需要先修改配置文件

vim /usr/local/etc/redis.conf

将daemonize修改为yes，然后载入配置文件即可实现后台进程启动

redis-server /usr/local/etc/redis.conf

#####加入开机启动

cp /usr/local/Cellar/redis/2.8.19/homebrew.mxcl.redis.plist ~/Library/LaunchAgents/ 

