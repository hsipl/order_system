echo "[pre-commit] Start pre-commit check"
which yarn &> /dev/null
if [[ "$?" == 1 ]]; then
    echo "Please install Yarn"
    exit 1
fi
echo "Pass for checking Yarn"
cd ./server
echo "[prettier] Start Prettier Format"
yarn prettier