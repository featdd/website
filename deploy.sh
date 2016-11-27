#!/usr/bin/env bash

REMOTE_HOST=$(cat deployment_config.txt)

if [ -z ${REMOTE_HOST} ]; then
    echo "Enter a valid rsync path in deploy_host.txt"
    exit 0
fi

command rsync -avz -e ssh --exclude-from 'rsync_exclude.txt' . ${REMOTE_HOST} --dry-run

while true; do
    echo "Confirm deployment (yes or no)"
    read -p "" yn
    case ${yn} in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no";;
    esac
done

command rsync -avzP -e ssh --exclude-from 'rsync_exclude.txt' . ${REMOTE_HOST}
