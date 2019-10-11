<div align='center'>

[![Build Status](https://travis-ci.org/elvisiraguha/Teamwork.svg?branch=develop)](https://travis-ci.org/elvisiraguha/Teamwork)
[![Coverage Status](https://coveralls.io/repos/github/elvisiraguha/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/elvisiraguha/Teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/7876705da70013697d24/maintainability)](https://codeclimate.com/github/elvisiraguha/Teamwork/maintainability)
[![Known Vulnerabilities](https://snyk.io//test/github/elvisiraguha/Teamwork/badge.svg?targetFile=package.json)](https://snyk.io//test/github/elvisiraguha/Teamwork?targetFile=package.json)

# TEAMWORK

## Teamwork UI

<img src='./UI/images/description.gif'>

</div>

### Project Overview

Teamwork is an ​ internal social network for organizations employees. The goal of this
application is to facilitate more interaction between colleagues and facilitate team bonding.

### How can Teamwork UI be accessed

#### Accessing it on the web

You can click [here](https://elvisiraguha.github.io/Teamwork/UI/html/)

or just run the link below into your browser

<https://elvisiraguha.github.io/Teamwork/UI/html/>

#### Accessing it locally

- Download this repository
- In the project directory open UI/html/index.html into your browser

### How to use Teamwork?

- After landing on the first page you will be asked to register, click on REGISTER button.
- This button will take you to the registration page. If you alread have a Teamwork user account you can sign in, otherwise you will need to create a Teamwork user account.
- After successfully signing in you will be taken to the home page under "All Articles" tab where you can see all articles seeing the most recent articles first.
- You can browse to "My Articles" tab to write and share your article with other collegues, you can also edit or delete your articles under this tab.
- Switching back to "All Articles" tab where we started you can search for a specific article, or search article that belongs to a specific category or tag.
- On the top right corner there is a button to sign out and another button to take you to admin page.
- On admin page additionally to functionalities described above for normal users there is additional tab "Flagged Articles" where admin can delete flagged articles or comments.

<div align='center'>

## Teamwork Server

</div>

### Introduction

Teamwork is an ​ internal social network for organizations’ employees. The goal of this application is to facilitate more interaction between colleagues and facilitate team bonding.

### Overview

all requests must be given in json format

### Success Codes

200: Ok

201: Created

204: Deleted

### Error Codes

400: Bad request

401: Unothorized

403: Forbidden

404: Not found

405: Method not allowed

409: Conflict

### API Endpoints

| Path                                    | Method | Description             |
| --------------------------------------- | ------ | ----------------------- |
| /api/v2/auth/signup                     | POST   | create a user account   |
| /api/v2/auth/signin                     | POST   | sign in existing user   |
| /api/v2/articles                        | POST   | create article          |
| /api/v2/aritcles/\<articleId\>          | PATCH  | edit article            |
| /api/v2/aritcles/\<articleId\>          | DELETE | delete article          |
| /api/v2/aritcles/\<articleId\>/comments | POST   | add comment on article  |
| /api/v2/aritcles/                       | GET    | view all articles       |
| /api/v2/aritcles/\<articleId\>          | GET    | view a specific article |
| /api/v2/myarticles | GET | veiw articles belonging the author |

### Read Full API Documentation on [Postman](https://documenter.getpostman.com/view/8269028/SVn2Nvfh?version=latest)
### Hosted App on Heroku <https://teamworkapi.herokuapp.com/>
### Tools Used

#### UI:

- html
- css
- javascript

#### Backend:

##### Linting Library:

Eslint

##### Javascript Style:

Airbnb

##### Framework:

NodeJs

##### Library:

ExpressJs

##### Testing Library:

Mocha
