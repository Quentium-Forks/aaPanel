#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
LANG=en_US.UTF-8
public_file=/www/server/panel/install/public.sh

if [ ! -f $public_file ];then
	wget -O $public_file https://download.bt.cn/install/public.sh -T 5;
fi
. $public_file
download_Url=$NODE_URL

Centos8Check=$(cat /etc/redhat-release | grep ' 8.' | grep -i centos)
if [ "${Centos8Check}" ];then
	dnf config-manager --set-enabled PowerTools
fi
extPath(){
	case "${version}" in 
		'54')
		extFile='/www/server/php/54/lib/php/extensions/no-debug-non-zts-20100525/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp54/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp54/lib/php/20100525/imagick.so'
		;;
		'55')
		extFile='/www/server/php/55/lib/php/extensions/no-debug-non-zts-20121212/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp55/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp55/lib/php/20121212/imagick.so'
		;;
		'56')
		extFile='/www/server/php/56/lib/php/extensions/no-debug-non-zts-20131226/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp56/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp56/lib/php/20131226/imagick.so'
		;;
		'70')
		extFile='/www/server/php/70/lib/php/extensions/no-debug-non-zts-20151012/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp70/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp70/lib/php/20151012/imagick.so'
		;;
		'71')
		extFile='/www/server/php/71/lib/php/extensions/no-debug-non-zts-20160303/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp71/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp71/lib/php/20160303/imagick.so'
		;;
		'72')
		extFile='/www/server/php/72/lib/php/extensions/no-debug-non-zts-20170718/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp72/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp72/lib/php/20170718/imagick.so'
		;;
		'73')
		extFile='/www/server/php/73/lib/php/extensions/no-debug-non-zts-20180731/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp73/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp73/lib/php/20180731/imagick.so'
		;;
		'74')
		extFile='/www/server/php/74/lib/php/extensions/no-debug-non-zts-20190902/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp74/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp74/lib/php/20190902/imagick.so'
		;;
		'80')
		extFile='/www/server/php/80/lib/php/extensions/no-debug-non-zts-20200930/imagick.so'
		ols_ext_file='/usr/local/lsws/lsphp80/lib64/php/modules/imagick.so'
		ols_ub_ext_file='/usr/local/lsws/lsphp80/lib/php/20200930/imagick.so'
		;;
	esac
}
Install_imagemagick()
{
	if [ ! -f "/etc/redhat-release" ];then
		ols_ext_file=$ols_ub_ext_file
		ini_path="/usr/local/lsws/lsphp$version/etc/php/${version:0:1}.${version:1:2}/mods-available/imagick.ini"
		apt install -y lsphp$version-dev
	else
		ini_path="/usr/local/lsws/lsphp$version/etc/php.d/imagick.ini"
		yum install -y lsphp$version-devel
	fi
	
	if [ ! -f "/www/server/php/$version/bin/php-config" ];then
		echo "php-$vphp not install, Plese select other version!"
		return
	fi
	
	isInstall=`cat /www/server/php/$version/etc/php.ini|grep 'imagick.so'`
	if [[ "${isInstall}" != "" ]] && [[ -f "${ols_ext_file}" ]];then
		echo "php-$vphp not install, Plese select other version!"
		return
	fi
	
	if [ "${PM}" == "yum" ] || [ "${PM}" == "dnf" ];then
		Pack="ImageMagick ImageMagick-devel"
	elif [ "${PM}" == "apt-get" ];then
		Pack="imagemagick libmagickwand-dev libmagick++-dev"
	fi
	${PM} install ${Pack} -y

	if [ "${PM}" == "yum" ];then
		centos7Check=$(cat /etc/redhat-release | grep ' 7.' | grep -i centos)
		if [ "${centos7Check}" ] || [ ! -f "/usr/bin/MagickWand-config" ];then
			if [ ! -f "/usr/local/ImageMagick-7.0.10/bin/MagickWand-config" ];then
				ImageMagickVer="7.0.10-47"
				wget -O ImageMagick-${ImageMagickVer}.tar.gz ${download_Url}/src/ImageMagick-${ImageMagickVer}.tar.gz
				tar -xvf ImageMagick-${ImageMagickVer}.tar.gz
				cd ImageMagick-${ImageMagickVer}
				./configure --prefix=/usr/local/ImageMagick-7.0.10
				make
				make install
				cd ..
				rm -rf ImageMagick-${ImageMagickVer}*
			fi
			ImageMagick_DIR="--with-imagick=/usr/local/ImageMagick-7.0.10"
		fi
	fi

	if [ ! -f "$extFile" ];then
		rm -rf imagick*
		if [ "${version}" = "80" ];then
			wget $download_Url/src/imagick-git.tar.gz
			tar -xvf imagick-git.tar.gz
			cd imagick
		else
			wget $download_Url/src/imagick-3.4.4.tgz -T 5
			tar -zxf imagick-3.4.4.tgz
			cd imagick-3.4.4
		fi
		/www/server/php/$version/bin/phpize
		./configure --with-php-config=/www/server/php/$version/bin/php-config ${ImageMagick_DIR}
		make && make install
		if [[ ! -f "${ols_ext_file}" ]] && [[ -f "/usr/local/lsws/lsphp$version/bin/php" ]];then
			/usr/local/lsws/lsphp$version/bin/phpize
			./configure --with-php-config=/usr/local/lsws/lsphp$version/bin/php-config
			make && make install
		fi
	fi
	
	if [ ! -f "$extFile" ];then
		echo 'error';
		exit 0;
	fi
	
	echo -e "\n[ImageMagick]\nextension = \"imagick.so\"\n" >> /www/server/php/$version/etc/php.ini
	
	if [ ! -f $ini_path ];then
			echo "extension=imagick.so" >> $ini_path
	fi
	cd ../
	rm -rf imagick*
	/etc/init.d/php-fpm-$version reload
	/usr/local/lsws/bin/lswsctrl reload
}


Uninstall_imagemagick()
{
	if [ -f "/usr/local/lsws/lsphp$version/bin/php" ];then
		ini_path="/usr/local/lsws/lsphp$version/etc/php.d/imagick.ini"
		if [ ! -f "/etc/redhat-release" ];then
			ols_ext_file=$ols_ub_ext_file
			ini_path="/usr/local/lsws/lsphp$version/etc/php/${version:0:1}.${version:1:2}/mods-available/imagick.ini"
		fi
		rm -f $ini_path
		rm -f $ols_ext_file
		/usr/local/lsws/bin/lswsctrl restart
	fi
	if [ ! -f "/www/server/php/$version/bin/php-config" ];then
		echo "php-$vphp not install, Plese select other version!"
		return
	fi
	
	isInstall=`cat /www/server/php/$version/etc/php.ini|grep 'imagick.so'`
	if [ "${isInstall}" = "" ];then
		echo "php-$vphp not install imagemagick, Plese select other version!"
		return
	fi
	
	sed -i '/imagick.so/d' /www/server/php/$version/etc/php.ini
	sed -i '/ImageMagick/d' /www/server/php/$version/etc/php.ini
	/etc/init.d/php-fpm-$version reload
	echo '==============================================='
	echo 'successful!'
}


actionType=$1
version=$2
vphp=${version:0:1}.${version:1:1}
extPath
if [ "$actionType" == 'install' ];then
	Install_imagemagick
elif [ "$actionType" == 'uninstall' ];then
	Uninstall_imagemagick
fi
