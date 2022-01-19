DOCKER_NETWORK="order_net"

docker network create $DOCKER_NETWORK

docker run -p 3306:3306 \
    -e MYSQL_USER=$MYSQL_USER \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_PASSWORD=$MYSQL_PASSWORD \
    -e MYSQL_DATABASE=$MYSQL_DATABASE \
    --network=$DOCKER_NETWORK \
    -d \
    mysql

docker run -p 6379:6379 --network=$DOCKER_NETWORK -d


if npm list -g | grep yarn
then 
   echo "yarn already install";
else
   npm install -g yarn;
   echo "yarn install done"
fi

echo "start install node package"
cd ./server
yarn install

echo "install package done"
echo "start running test"
yarn test
