# REST-APIs-of-Weather-data-using-node-Express

## Overview: 
This project is one of my fun projects. The purpose of this project is to make Rest APIs which provide weather data.

## Description:
The idea is that the user has to register first and then he can login and make requests to the APIs. For authorization **JWT** is implemented. So, when the user login he will get back token is response header and every time he wants to request APIs, he must send that toke. The server will check the token and will give him the resource that he wants to access. The database used is mongo db.

So, there are different APIs which are given bellow. 

-	Register API
-	User Login API
-	Admin login API
-	Get all day’s weather data
-	Get specific day weather data
-	Create new day weather data
-	Update specific weather day data
-	Delete specific weather day data
### Register API: url(localhost:5000/api/weather/User/register)
Method : Post
The user has to send username, password and email id in body of request. There is also validation check so the user has to send all these field and the email id should be email id.

### Login API: url(localhost:5000/api/weather/User/login)
Method : **Post**
The user has to send username and password in header. The API response will send access token in response header and in the body, there will be success message. If the authentication failed msg will be showed in body that invalid creds.
### Admin login: url (localhost:5000/api/weather/admin/login)
Method : **Post**

This route will only authenticate admin.
### Get all weather data API: url(localhost:5000/api/weather)
Method : **GET**
This route will give all days weather data
### Get specific day weather data API: url(localhost:5000/api/weather/:day)
Method : **GET**
This route will give specific day data but you have to enter the number of the day in url 
### Create new day weather data: url(localhost:5000/api/weather) 
The method of this API is **post**. **Only admin** can use this API. Admin has to enter day, precipitation, humidity, wind and temperature and all strings.
### Update specific weather day data: url(localhost:5000/api/weather/:day)
The method of this API is **put**. **Only admin** can use this API. Admin needs to provide specific day that he want to update If that day does not exist he will get error that this day is not exist. The admin has to enter day, precipitation, humidity, wind and temperature and all strings.

### Delete specific weather day data: : url(localhost:5000/api/weather/:day)
The method of this API is **delete**. **Only admin** can use this API. Admin needs to provide specific day that he want to delete  If that day does not exist he will get error that this day is not exist.

