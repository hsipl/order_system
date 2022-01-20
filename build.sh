branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ -z $BRANCH ] || [ $BRANCH != "master" ]; then
   MODE=dev;
else
   MODE=main
fi

echo "local mode = ${MODE}"
echo "running node on ${MODE}"

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
echo "run seed to mysql..."
yarn migrate
echo "start running test"
yarn test
