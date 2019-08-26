#/bin/bash

echo "STARTED UP"
cd /my_shared
pm2 start server.py --interpreter=python3