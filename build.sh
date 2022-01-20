export MODE="dev"
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
