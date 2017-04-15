#!/bin/bash
/usr/local/bin/supervisorctl stop moe
pkill -f node
rm -rf /home/bicuser/workspace/www/moe/*