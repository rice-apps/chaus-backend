# Chaus Scheduler Backend API



## After cloning repo, run the following:

1. npm install
2. Set up your .env file (look below)

---

## Setting up your local configurations:

1. You will need to create a .env file locally at the top level of your project folder
        |node_modules/
            - ./src/
            - ***.env***
            - .babelrc
            - .gitignore
            - ...
    ```
        ChausBackend/
        │   README.md
        │   **.env**
        │   ...
        └───node-Modules/
        │   │   ...
        └───src/
            │   ...
    ```
2. In your .env file, include the following things:
    ```
        secret = _____________
        db_uri = _____________
        CASValidateURL = __________________
        thisServiceURL = http://localhost:XXXX/auth
        frontendURL = http://localhost:XXXX
    ```
    - Keep in mind that your .env file will change depending on whether or not you are on dev or prod
3.  npm run start
4.  Access API at http://___________/api 

## Handy terminal commands
* To kill all node processes on a windows machine
    ```
        taskkill /im node.exe
    ```
