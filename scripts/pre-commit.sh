# echo "[pre-commit] Start pre-commit check"
# # Check for eslint
# which yarn &> /dev/null
# if [[ "$?" == 1 ]]; then
#     echo "Please install Yarn"
#     exit 1
# fi
# echo "Pass for checking Yarn"
# # Eslint check all files under server/src
# echo "Eslint check all files under server/src/..."
# cd ./server
# yarn prettier
# if [[ "$?" == 1 ]]; then
#     echo "[failed]ESlint check fail, please fix your code format."
#     echo "[Hint]Maybe you should use npm run format"
#     exit 1
# fi
# echo "Pass for Eslint check"
# echo "[pre-commit] successfully"