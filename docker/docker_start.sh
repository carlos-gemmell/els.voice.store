echo $RANDOM > rand_file.txt
docker build ./ -f Dockerfile -t els_inst
docker run --name els_server -it -p 5000:5000 -v $PWD/../:/my_shared/ -d els_inst
docker ps -a
docker exec -it els_server bash
docker stop els_server
docker rm els_server
