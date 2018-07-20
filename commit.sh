#!/bin/bash
currDir=$(pwd)
remark=$1
if [ ${remark}x = ""x ];then
        remark=$(date +"%Y-%m-%d %H:%M:%S")
fi
echo ${currDir}
git add .
git commit -m "\"${remark}\""
git push
