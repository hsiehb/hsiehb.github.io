#!/bin/bash
set -e

STATUS="/home/bicuser/.bootstrapcomplete"

function beforeInstall {
    echo "beforeInstall service"
  	#cd /home/bicuser/workspace/www/moe/
    #cd ..
    #rm -rf /home/bicuser/workspace/www/moe/*
    exit 0
}

# Wait up to 10 minutes to see if  stack is ready anytime soon.
i=0
while [ $i -lt 60 ]; do
    if [ -f $STATUS ] ; then
        echo "bootstrapComplete exists, proceed with deploy"
        beforeInstall
    else
        echo "file does not exist"
        sleep 1
        ((i+=1))
    fi
done

exit 1
