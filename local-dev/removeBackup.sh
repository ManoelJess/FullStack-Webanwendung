docker rm -vf $(docker ps -aq);
docker rmi -f $(docker images -aq);

##Cache leeren
docker builder prune;