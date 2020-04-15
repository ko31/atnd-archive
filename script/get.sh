#!/bin/bash

# This script downloads the ATND events and users from https://api.atnd.org/
# 
# Usage:
# ./get.sh
# 

# Endpoints
# Event Search API
URI_API_EVENTS="https://api.atnd.org/events/?format=json&event_id="
# Users API
URI_API_USERS="https://api.atnd.org/events/users/?format=json&event_id="

# ID from start to end
ID_FROM=1
ID_TO=112300

# Save directory
SAVE_DIR_EVENT=./json/events
SAVE_DIR_USER=./json/users

# Temporary file
TMP_FILE=response.tmp

for i in `seq ${ID_FROM} ${ID_TO}`
do
    # 
    # Get event api
    # 
    URL="http://api.atnd.org/events/?format=json&event_id=${i}"

    status_code=`curl -sS -o ${TMP_FILE} -w "%{http_code}" ${URL}`
    if [ $status_code != 200 ]; then
        echo "Error #${i} status: ${status_code}"
        continue;
    fi
    
    json=`curl -sS ${URL}`
    results=`echo ${json} | jq '.results_returned'`
    if [ $results -eq 0 ]; then
        echo "Error #${i} results_returned: 0"
        continue;
    fi
    
    mv ${TMP_FILE} ${SAVE_DIR_EVENT}/${i}.json
    echo "Downloaded event data: ${SAVE_DIR_EVENT}/${i}.json"
    
    # 
    # Get user api
    # 
    URL="https://api.atnd.org/events/users/?format=json&event_id=${i}"
    
    curl -sS "${URL}" -o ${SAVE_DIR_USER}/${i}.json
    echo "Downloaded user data: ${SAVE_DIR_USER}/${i}.json"
done

echo "Done!"

exit
