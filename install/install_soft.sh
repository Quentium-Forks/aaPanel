#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

nodeAddr=`sort -V ping.pl|sed -n '1p'|awk '{print $2}'`
serverUrl=https://node.aapanel.com/install
mtype=$1
actionType=$2
name=$3
version=$4

if [ ! -f 'lib.sh' ];then
	wget -O lib.sh $serverUrl/$mtype/lib.sh --no-check-certificate
fi
wget -O $name.sh $serverUrl/$mtype/$name.sh --no-check-certificate
if [ "$actionType" == 'install' ];then
	sh lib.sh
fi
sh $name.sh $actionType $version
