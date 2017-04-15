#!/bin/bash
procstatus=` /usr/local/bin/supervisorctl status moe`
if [[ ${procstatus} != *"RUNNING"* ]];then
   echo "Starting app frm supervisord"
   /usr/local/bin/supervisorctl start moe
else

   echo "Stopping node processes, letting supervisord restart"
   pkill -f node
fi
