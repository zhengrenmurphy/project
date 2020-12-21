# [KOSH and Link to the deployed URL](https://kosh-team-peach.herokuapp.com/)		 
## Project setup
## [Team Peach]		
### Purpose and Functionality		 
Kosh is an application that helps local businesses and residents stay informed and in touch. By providing a platform that businesses can use to update their availability and rules in terms of Covid, they can stay in touch with their customers. They can also manage timeslots, where a resident can claim a timeslot on Kosh to designate when they will visit the business.
 
### Instructions to Run Locally:
In command line:
```console
$ npm i
$ npm run serve
```
In a separate shell:
```console
$ npm start
```
then you will find the application at `localhost:8080` in the browser


### Database:

* Users Table
  * "business_type" INTEGER (0, 1)
  * "username" TEXT NOT NULL UNIQUE PRIMARY KEY
  * "password" TEXT NOT NULL
  * "email" TEXT NOT NULL
  * "firstName" TEXT NOT NULL
  * "lastName" TEXT NOT NULL
 
* Business table
  * "username" TEXT NOT NULL UNIQUE PRIMARY KEY
  * "businessName" TEXT NOT NULL
  * "street" TEXT NOT NULL
  * "city" TEXT NOT NULL
  * "state" TEXT NOT NULL
  * "zip" INTEGER NOT NULL
  * "open" INTEGER (0, 1)
  * "takeout" INTEGER (0, 1)
  * "delivery" INTEGER (0, 1)
  * "outdoor" INTEGER (0, 1)
  * "indoor" INTEGER (0, 1)
  * "indoorShopping" INTEGER (0, 1)
  * "curbside" INTEGER (0, 1)
  * "safety" INTEGER (0, 1)
  * "parking" INTEGER (0, 1)
  * "mask" INTEGER (0, 1)
  * "capacity" INTEGER
  * "hourFrom" TEXT
  * "hourTo" TEXT 
  * "description" TEXT

* Customer_reservations table
  * "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
  * "username" TEXT NOT NULL 
  * "time" TEXT NOT NULL
  * "businessName" TEXT NOT NULL
 
* Business_reservations table
  * "username" TEXT NOT NULL UNIQUE PRIMARY KEY
  * "capacity" INTEGER NOT NULL
  * "length" INTEGER NOT NULL
  * "timeFrom" TEXT NOT NULL
  * "timeTo" TEXT NOT NULL
  * "monday" TEXT NOT NULL
  * "tuesday" TEXT NOT NULL
  * "wednesday" TEXT NOT NULL
  * "thursday" TEXT NOT NULL
  * "friday" TEXT NOT NULL
  * "saturday" TEXT NOT NULL
  * "sunday" TEXT NOT NULL
 


 
 



