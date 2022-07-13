#Contact Info Importer
Simple and quick project test interview

**Quick Start**
first you need to clone this repository in your local machine.
`git clone https://www.github.com/Christian64/contact-info-importer`

install all dependecies
`npm install`

Now you need to setup some enveriments variables. (Create a `.env` file at the root)

| Variable | description | Required |
| ----------- | ------------------ | ------- |
| JWT_SECRECT_KEY | Secrect key for Json web token (JWT) | Yes |
| PORT | Server port  | Not |
| DATABASE_URL | Database conection URL (Mongodb) | Yes |

***Note***: I used [Mongodb Atlas](https://www.mongodb.com/) for the database & [Postman](https://www.postman.com/) for client request.

Run de server

`npm run dev`

##Api endpoints

***Note***: Each endpoint except ```/users/login``` & ```/users``` must to include Bearer token (```Bearer {myToken}```) in the head request

|  Method  | endpoint | description |
| ---------- |----------|--------------|
|     Post   |   `/users`    |   create new user |
|     Post   |   `/users/login`    | login to the app |
|     Post   |   `/contactInfo`    | create contacts based on a CSV file |
|     Get   |   `/contactInfo`    |  Contacts list  |
|     Get   |   `/files`    |   Files uploads list |

####/users - POST
```
{
    "email": String,
    "password": String,
    "username": String
}

```
####/users/login - POST
```
{
    "email": String,
    "password": String
}

```
####/contactInfo - POST
**form-data**
| name     | type |    description     |
|------    |------|--------------------|
|   csv    |   file   |   csv file  |
|   fields |   String[]   | Fields of the csv will be save in the database |

***example***: fields['Name', 'Date Of Birth', 'Phone']

####/contactInfo - GET

**Params**
|  Query  | Type | description |
| ---------- |----------|--------------|
|  limit  |  Number   |  limit (Pagination Porpuse)   |
|  page   |  Number   |  page (Pagination Porpuse)   |
|  actives|     Boolean    | return success created contacts or fail created contacts and their errors|

***Request example***: `GET - /contactInfo?limit=10&page=0&actives=true`   

####/files - GET
just send the token :)