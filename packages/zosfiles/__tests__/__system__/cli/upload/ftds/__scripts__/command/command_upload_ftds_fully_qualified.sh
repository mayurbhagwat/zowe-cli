#!/bin/bash
dir=$1
pds=$2
HOST=$3
PORT=$4
USER=$5
PASS=$6
zowe zos-files upload file-to-data-set "$dir" "$pds" --host $HOST --port $PORT --user $USER --pass $PASS --ru=false
exit $?