# Order System v0.01

[![React: Tools](https://img.shields.io/badge/Admin-React-blue)](https://reactjs.org/)
[![Types: Typescript](https://img.shields.io/badge/Types-Typescript-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![App: Flutter](https://img.shields.io/badge/App-Flutter-blue.svg?style=flat&logo=flutter)](https://flutter.dev/)
[![Code style: Prettier](https://img.shields.io/badge/Code_style-Prettier-ff69b4.svg?style=flat&logo=prettier)](https://prettier.io/)


Order System for local shop(Still Devloping)

---

## Quick Start For Development


### For Backend Developers


```sh
# clone repo
git clone https://github.com/p0937507934/order_system.git

# install dependency
cd order_system
yarn install 
cd server
yarn install
```

### For Frontend Developers


```sh
# clone repo
git clone https://github.com/p0937507934/order_system.git

# install dependency
cd order_system
yarn install 
cd admin
yarn install
```

## Usage

### Backend Server

```sh
# change directory to server
1. cd order_system/server

# run server using docker-compose on localhost:8000
2. docker-compose up -d

# try api healthcheck
3. http://localhost:8000/api/healthcheck

# migrate db
4. npm run migrate
```

### Frontend Server

```sh
# change directory to server
1. cd order_system/admin

# run server using docker-compose on localhost:3003
2. docker-compose up -d

# try api healthcheck
3. http://localhost:3003
```


## Developer Workflow

### Local Development

- **Clone**: [Click here](#Quick-Start-for-Development)
- **New Branch**: Create a new branch for your features.
```sh
# this command will create a new branch and checkout to it.

git checkout -B branch_name
```
- **Testing**: Push origin dev branch and test your function.
- **Pull Request**: Make a pull request and notify your partner for code review on slack or mention on github. 



### Pull Request Title

**Format**: `<Type>: <Description>`, where `Description starts with verb is preferred.

```
project: Add a new  API for x functionality
^--^     ^------------^
|        |
|        +-> Summary your works.
|
+-------> Type:Admin,Backend,App,DB,...etc
```




