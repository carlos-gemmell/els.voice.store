#/bin/bash

echo "STARTED UP"

cd /my_shared/frontend
npm install
npm run build

cd /my_shared
pm2 start server.py --interpreter=python3
