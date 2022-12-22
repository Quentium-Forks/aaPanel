#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
LANG=en_US.UTF-8
public_file=/www/server/panel/install/public.sh
if [ ! -f $public_file ];then
	wget -O $public_file https://download.bt.cn/install/public.sh -T 5;
fi
. $public_file

serverUrl=$NODE_URL/install

mtype=$1
actionType=$2
name=$3
version=$4

if [ ! -f 'lib.sh' ];then
	wget $serverUrl/$mtype/lib.sh
fi
wget $serverUrl/$mtype/$name.sh
sh lib.sh
sh $name.sh $actionType $version