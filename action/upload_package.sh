#!/bin/bash

# Set variables

url="$1"
apiKey="$2"
file="$3"

function call_api {
  response=$(curl -i -s -X POST $url \
    -H "Umbraco-Api-Key: $apiKey" \
    -H "Content-Type: multipart/form-data" \
    --form "file=@$file")

  echo "$response"
}

call_api
