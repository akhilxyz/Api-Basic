# Api-Basic
About the Project

This Project requires an intermediate knowledge of JavaScript and Node.JS along with basic knowledge of, JSON, NPM, MongoDB (a No-SQL database), and Express.JS. This Project is geared toward back-end web development as we will not discuss HTML, CSS or Angular. Click here to download the .zip project file for this tutorial. Click here to see its live demo.

# Project Overview

In this Project, we walk you through seven steps for developing a RESTFul API using popular JavaScript frameworks such as Node.JS and Express.JS. In doing so, we learn how to integrate our API with the MongoDB database. Here are the main steps:

1. Project Initialization
2. Install Application Dependencies
3. Run the Application
4. Test the Application
5. Establish Connection with MongoDB
6. Build REST API Endpoints
7. Put Things Together

## RESTful API Overview

REST stands for REpresentational State Transfer. When a RESTful API is called, the server will transfer to the client a representation of the state of the requested resource. For example, when a developer calls OpenWeather API to fetch weather for a specific city (the resource), the API will return the state of that city, including the temperature, humidity, wind speed, current forecast, extended forecast, and more. The representation of the state can be in a JSON format, and for most web APIs, this is indeed the case. Other possible data formats include XML or HTML. What does the server does when you call it depends on two things that you need to provide to the server:
1. An identifier for the resource. – This is the URL for the resource, also known as the endpoint. In fact, URL stands for Uniform Resource Locator.
2. The operation you want the server to perform on that resource, in the form of an HTTP method. The common HTTP methods are GET, POST, PUT, and DELETE.
Prerequisites:

    Install Node.js by following the appropriate guidelines for your local machine given here.
    You may use Node Version Manager to install multiple versions of Node.js on your local machine.
    Signup for MongoDB Atlas which is a cloud database as a service. We’re using MongoDB Atlas which offers us a free sandbox environment so that we can focus on building our REST API.
    Code Editor like Visual Studio Code or Sublime Text
