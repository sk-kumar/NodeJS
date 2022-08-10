NodeJS
======
# Node One

In this lecture we talk about Node.

## HTTP Review

HTTP stands for Hyper Text Transfer Protocol and it is the protocol we follow when making requests and receiving responses from a client to a server.

### Client 

This is usually a personal computer that talks to a server through internet.

The client is also known as the `front-end` part of our application.

We will be using `React` for our front-end.

### Server

This is usually a computer that has clients that will talk to to request information from.

The server is also known as the `back-end` of the application.

We will be building our servers with `Node`.

![Client and Servers](images/clientstoserver.png)

## Node

Node is a `javascript runtime environment`.

Javascript has been around since 1995 and for a while it was only used inside of a browser environment, meaning that was the only place we could use it.

This meant that developers were having to code in multiple languages to create a front-end and back-end to their applications.

When Node came out, it allowed developers to write Javascript code that runs directly on the a computer process itself,rather than being confined to a browser environment. This means that Node can be used to write server-side applications that have full access to the operating system, file system, etc.

Node was written in `C`, `C++`, and `Javascript`. It was built on top of the `V8 Javascript` engine. This is the same engine that browsers like `Google Chrome` uses.

### Node In The Terminal

We can run node in the Terminal by typing the command:

```bash
$ node
```

This will turn the terminal into an interactive javascript environment.

![node terminal](images/terminal.png)

### Running A Javascript File

We can also execute a JS file by running the terminal command

```bash
$ node "name of file to execute"
```

It's important to keep note that this works similar to `REPL` where only the last item will be return, unless we are to console log values.

### Nodemon

We can use to `nodemon` to constantly watch our file to execute it when theres a resfresh.

Install nodemon globally:

```bash
$ npm install -g nodemon
```

Run `nodemon` on a file instead of `node`.

## NPM

NPM stands for `Node Package Manager`.

This is where we can get access to a bunch of great libraries to use inside of our code.

To use it we just need to have `node` installed onto our machine and then we need to initialize our applicaiton to use it.

When in the project directory, run the terminal command:

```bash
$ npm init -y
```

This command will initialize a `package.json` file for us so we can install packages from `npm` into our project.

This file will look something like this:

```json
{
  "name": "node-one",
  "version": "1.0.0",
  "description": "In this lecture we talk about Node.",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## Express

One of the primary uses of Node is to act as a `server`. 

A server is will receive a request then perform some logic and return a response.

`Express` is the most popular framework we can use to build a server with node.

It will make it easier to matchup HTTP methods to by using `endpoints` to control what data a front end application can send and ask for.

### Getting Started

First we need to install express into our project to use it.

```bash
$ npm install express
```

REFER TO THE `serverSetup.js` FILE FOR MORE INFORMATION ABOUT SETTING UP EXPRESS

### Endpoints

Endpoints are what we use to create a way for a front end application to make requests to our server.

To create an endpoint, we will use the object returned from `express()`. This object will have the methods we can use to receieve specifc `RESTful Requests`.

Let's look at the syntax for one:

```javascript
app.get('/api/users', handlerFunc);
```

The endpoint is comprised of three parts:

The Method: - this is where we declare what type of request we are expecting. For example: `get`, `post`, `put`, `delete`.

The Path - this is easy to think about as an entrance to our server or a "gate".

The Handler Function - the handler function is the function that will be executed when a request hits this end point.

## Handler Functions

`Handler Functions` are the functions that we use to handle a request that is made to our server.

This function receives two objects as default arguments. These objects are the `request` and `response` object.

```javascript
app.get('/api/users', (req, res) => {
    // logic here to handle the req
})
```

> Note: req will always be before res

### Request Object

The `req` object is an object that will contain information about the incoming request. This where we can access information from the `query`, and the `params` of the request.

`req.params` This is the object that we can use to get the data from the params of a request.

We declare the param variable to use in the `path` of our endpoint. We will prefix the param with a colon.

```javascript
app.get('/api/users/:id, (req, res) => {
    // we can access what ever info is sent through the id param
    console.log(req.params.id)
});
```

Using the colon is like telling javascript to treat it as a placeholder, and what ever is sent through we can access it on the `req.params` object.

`req.query` This is the object that we can use to get data from the queries of a request.

We will not add any extra information to our `path` when using a query, unlike params.

```javascript
// front end request w/ query
axios.get('/api/users/?name=tayte)

// back end endpoint
app.get('/api/users', (req, res) => {
    // notice how we dont set anything special in our path

    // we can access the name tayte from the query using the query obj
    console.log(req.query.name) // this will log tayte
})

```


### Response Object

The `res` object is an object that we will use to set information about the response and send it back.

This object will have built in methods that we can use to add information to the response that we will send back.

#### Sending A Response

`res.send()` is a function that we can use so what ever is passed in as an argument to function will be sent back as the `response`.

```javascript
res.send('Hello');
```

Above, we are sending a string of hello back. This is what will fill the `response.data` object on the front end.

#### Setting A Status Code For The Response

We can set custom status codes for the response by using the `.status()` method before we send back a response. We will pass in the status code that we want this end point to respond with.

```javascript
res.status(200).send(users);
```

# Node Two

In this lecture we talk about Top Level Middleware, Using Postman, and using Axios in our API.

Examples can be found inside the `.js` files of this repo.

## Top Level Middleware

`Top Level Middleware` is the term we use to refer to some logic that will be executed upon every request that is made to our API.

We can set up that logic inside of the built method `.use()` that comes from the object that is return from invoking `express`.

```javascript
app.use(/* some function to execute here */);
```

## Req Body

Sometimes we need to send some complex data to our API. Using the `req.query` or `req.params` just might not be suffuciant enough to use to send this data. This is where the `body` comes into play.

`req.body` is the object we can use to receive the complex data. However, the data that comes from the body of the request is received as `JSON` so we need to parse it into a Javascript Object.

We can do this by using a special function from `express` called `express.json()`. This function will parse the JSON that comes as the `body` from the request and turn it into a useable object for us.

We want to invoke this function as `Top Level Middleware` so that it is invoked upon every connection made to our API.

We will pass it into our `app.use()` function to run it as top level middleware.

```javascript
app.use(express.json());
```

## CORS

CORS stands for `Cross Origin Resource Sharing`. This is a security protocol that we can use to safely allow other origins talk to our origin. This means that we can make a request from one server to another server.

We first need to install `CORS` as a dependency for our project. In the terminal, run:

```bash
$ npm install cors
```

Then require it at the top of the `index.js` file for our API.

```javascript
const cors = require('cors`)
```

Then we need this function to be invoked as top level middleware.

```javascript
app.use(cors())
```

Now your API is setup to follow the `CORS` protocol.

## Postman

`Postman` is a suite that we can use to act as a `client` to interact with the `API` that we build.

The browser, by default, will only let us make `get` requests from the URL. So we can use `postman` to test out a `full CRUD API`.

## Full CRUD API

So far we have built an API that has only allowed `get` requests to be made. We need to also allow `post`, `put`, and `delete` requests to be made to become a `full CRUD API`.

POST:
```js
app.post('path for the endpoint', handlerFunc)
```

PUT:
```js
app.put('path for the endpoint', handlerFunc)
```

DELETE:
```js
app.delete('path for the endpoint', handlerFunc)
```

We now have a "fully funcitonal" API because are following the full CRUD pattern.

## Controller

A `controller` is what we can use to store all of our functions that we use to handle the requests being made.

We usually will create a seperate javascript file that will hold the controller functions.


# Node Three

In this lecture, we will talk more about node, setting up our database using Heroku, and how to interact with our databases using SQLtabs.

## Heroku Database

We used to install PostgreSQL locally and create databases on our local machine, but it would start to take up a ton of memory and really slow down some students computers. We now will create our database on Heroku's cloud platform.

Visit https://www.heroku.com/ and create your heroku account. After creating your account and verifying it through your email, you should now be able to login and you will see a dashboard like this.

![Landing Heroku](images/landing.png)

Click on the purple `Create new app` button to start creating your first app. Give your app a name and select the region that it will be hosted in. Just keep it to the US.

After creating a new app, your dashboard should look like this.

![new app](images/appdash.png)

Now, click on the `Resources` tab in the top left. We will be adding on a PostgreSQL database to our app.

Now in the `Resources` page, click on the `add-ons` search field and look for `Heroku Postgres` and provision it as `Hobby Dev - Free`.

![provision](images/provision.png)

Now you will see that Postgres has been provisioned to our app so we can click on it to access our database. When you access the database, it will open in a new window for you and you will be looking at the dashboard interface for information about our postgres database.

![database gui](images/database.png)

Now click on the `Settings` tab in the top left, then click on the purple button on the right of the screen that says `View Credentials...`.

You should now see information about our databse regarding the `host`, `database`, `user`, `port`, `password`, `uri`, and `heroku cli`. This is sensitive information that we do not want anyone getting a hold of. We need to make sure that we keep this secure.

The `URI` is what will really matter to us, so keep this page open so we can reference it later.

## SQL Tabs

SQL tabs is the cross-platform interface that we will use to interact with our database directly.

Download your OS version at this link: http://www.sqltabs.com.

![SQLtabs](images/SQLtabs.png)

After installing the correct files, you will need to configure it.

### Mac

Unzip the download and put it into your applications. You may get a security warning, so you will need to hop into `system preferences` and it will you ask you if trust the third party publisher, then select `Open Anyways`.

### Windows

Unzip the folder then place the application somewhere easy to access like your desktop or a folder that's easy to get to (I recommend desktop).

### Linux

Gunzip the tarbell files then execute then execute `./sqltabs`.

## Connecting SQL Tabs to Heroku Postgres

After installing SQL Tabs, go ahead an open it up. We will need to connect our interface with our database that's hosted on Heroku.

Now head back to your settings for your heroku database and copy the `URI` string. Then go ahead and paste that string in the search bar at the top os SQL Tabs.

![sql tabs ui](images/sqltabsui.png)

Now once the URI has been pasted, we need to append a query onto it. At the end, add `?ssl=true`.

### SSL

SSL stands for `Secure Sockets Layer`. It is the standard security technology for establishing an encrypted link between a web server and a browser. This will allow our SQL Tabs to securely interact with our Heroku Database.

Viola! You now have established a connection. Test it out by creating some tables.

## .ENV

We want make sure that we are trying to stay secure with our sensitive information that we will be using within our code. We can create a `.ENV` file to house environment variables. The variables that are created in this file will be stored on the Node servers `process`.

We can then store the variables that we want to keep private inside of this file. These variables will be things such as `API Keys`, `Database Connections`, `etc`. We DO NOT want to push this information to Github to be stolen.

We need to make sure that we include the `.ENV` file in the `.gitignore` file so that that the file will not be pushed up to Github.

> Note: I have not ignored my .ENV file just so you can refer to it. I deleted the db that the connection string uses, so it will not be harmful for me.

## DOTENV

`dotenv` is the module of code we can use to bring our variables declared in the `.ENV` into our Node server.

We first need to install this module from NPM, in your terminal run:

```bash
$ npm install dotenv
```

Now at the top of our server file, typically called `index.js` we will require this module and invoke the `config` method from it.

```js
require('dotenv').config();
```

We now have access to our environment variables.

## Massive JS

`massive` is a data mapper that we will use to have our server interact with our database.

We first need to install it to our application from NPM, in your terminal run:

```bash
$ npm install massive
```

Once it's installed, require it in to the file that we will use it (index.js).

```js
const massive = require('massive');
```

Now we can invoke the `massive` function passing in our connection string to get connected to our db and return an instance of it.

```js
massive(CONNECTION_STRING).then((dbInstance) => {
    app.set('db', dbInstance);
});
```

Massive has now set an instance of the heroku postgres database as an object in our application. We can use this object to use the custom SQL statements that we write or the built in methods that come from Massive to interact with our database to create, read, update, and delete the data stored there.

## DB Folder

We will create a folder called `db` at the root of our project. Massive will be able to pick up on this and put our custom SQL statements on the db instance that it returns.

This folder is where we will write our own SQL commands.

### Seed Folder

When ever I create a table, I like to make a copy of the schema and save it as it's own file inside of the `seed folder` that will be nested inside the `db` folder. This way, if I ever have to drop a table I can use the seed file to reference how the `schema` was setup for that table.

## Interacting With The Database In The Controller Functions

We can interact with our database inside of our controller functions that handle the request that is made to our API. We first just need to get the instance of the database that lives on the request object. Since we used a `setter` method to add the database to our `app` object, we need to use a `getter` method to get that object.

An example of the controller function would look like the following

```js
const getRacers = (req, res) => {
    // Get the db instance
    const db = req.app.get('db');
    // use the getRacers sql statement
    db.get_racers()
        .then(racers => {
            // racers will be an array with our racers from the db
            // send the racers back
            res.status(200).send(racers);
        });
};
```

We first get the instance of the database using a `getter` method. Then we use our custom sql statement `get_racers` to interact with our database. Since it returns a promise, we use a `.then()` to handle the response (which will always be an array), then we send a response back to the client from the server.

## Follow The Code

Take a look at the code examples inside this repo to understand the syntax and structure for creating a full CRUD API that interacts with a database.

# Node Four

In this lesson we talk about middleware, cookies, and sessions in our Node server.

## Middleware

A middleware function is a function that is executed between an endpoint being hit and the handler function that sends a response. They will act like the `middle man` in our requests.

A middleware function expects three arguments, `req`, `res`, and `next`.

```js
function middleware(req, res, next){}
```

`req` - This is the object of the request, we can use this to access data such as the body, params, and query.

`res` - This is the response object for the request, we can use this to send bacl data.

`next` - This is a function that we will need to invoke to move onto the function.

### Top Level Middleware

Top level middleware is a middleware function that is executed upon each request made to our server.

We can create a top level middlware function by passing the function into `app.use()`. It's important to make sure that these are around the top of the server so they are hit before the endpoints.

```js
app.use((req, res, next) => {
    console.log('custom tlm hit!')
    // invoke next to move onto the next funciton in the req
    next();
});
```

In the example above we are just passing in an annonymous function, however we can declare that function elsewhere and pass it in.

We can pass an optional path as an argument to our `app.use()` function to specify what end points to use the midleware function on.

```js
app.use('/api/users', (req, res, next) => {
    console.log('user route hit!')
    next();
})
```

### Request Level

On an endpoint we can setup a middlware function that is only invoked when a specific enpoint is hit. This is referred to as `request level middleware`.

We can chain multiple request level middleware functions onto an endpoint before we hit the handler function. This works just like the TLM function that we wrote above. The RLM function will take in `req`, `res`, and `next` as arguments.

```js
app.get('/api/test', function(req,res,next){
    console.log('callback one')
    next();
}, function(req,res,next){
    console.log('callback two')
    next();
}, function(req,res){
    console.log('callback three')
    res.send('Send a response!');
});
```

Above we have two RLM functions being executed before we hit our handler function and send b ack a response to our front end.

These middleware functions are great because we can use it to check for specific conditions to allow a user to keep moving on in the end point. A great example of this is setting up a middleware function to authenticate a user to login.

```js
// Dummy Data
let user = {
    username: 'tayte123',
    password: 'password123',
    full_name: 'Tayte Stokes',
    color: 'black'
};

// Custom Middleware Functions
const authenticateUser = (req, res, next) => {
    const {username, password} = req.body;
    if(username === user.username && password === user.password){
        // if username and password matches
        // invoke next and pass in the user and move onto the next function in the end point
        next()
    } else {
        res.status(403).send('Invalid username or password');
    };
};

// End Point to login
app.post('/api/login', authenticateUser, (req, res) => {
    // send back user object
    res.status(200).send(user);
});
```

## Cookies

A `cookie` is a small little file that will be stored onto your browser with some information. These are very small and are limited to 4kb of data.

HTTP requests are `stateless` meaning they do not remember data from previous requests. In this case, if we wanted to log our user in, they would need to send their login information upon every request so we know who they are. This is terrible for a website and we don't want to have it like this.

How do we get around this so we can just send our data one time and be remembered? We will create a `session` to keep track of their data by using a `cookie`.

### Session

Imagine that you go to a cafe to order a drink and then next week you back, the workers will most likely not remember you or what your ordered so you'll have to reorder. But what if they created a system where you can save your order based off of your personal ID, so now when you go to the cafe you just give them your id and they remember everything else about your order.

* The personal ID is the cookie in your browser storing your order

* The cafe is the server

* The information keeping track of your id and others id will be the session

We will be using a library called `express-session` to create the session store. Then we will use middleware to create a session for the user in our server and send back a `cookie` that will be stored to the browser with a `session id`.

![sessions](images/session.png)

Go ahead and install the library in our project by running the terminal command

```bash
$ npm install express-session
```

Then we will require it at the top of the file

```js
const session = require('express-session');
```

Then we will be using this as Top Level Middleware

```js
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 60000}
}));
```

The object that we passed in is known as the `configuration` object. We will configure the `resave`, `saveUninitialized`, and `secret`.

`secret` - This will be a random string to keep our session secret. This will ensure intregity of the cookie.

`saveUninitialized` - This will say when a session is created and no data is changed or added if we still want to save it to the store. Set it to true by default.

`resave` - This means that if nothing on the session was changed or modified do we want to save it to the store. Set it to false by default.

`cookie` - This will be an object that we can set an expiration in milliseconds to the cookie session.

We can now access any information from the session on the `req.session` object. We can put any information that we want to on to the session.

```js
const express = require('express');
const cors = require('cors');
const session = require('express-session');

app.use(express.json());
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat yo',
    cookie: {maxAge: 60000}
}));

let user = {
    username: 'tayte123',
    password: 'password123',
    full_name: 'Tayte Stokes',
    color: 'black'
};

const authenticateUser = (req, res, next) => {
    const {username, password} = req.body;
    if(username === user.username && password === user.password){
        req.session.user = user;
        next()
    } else {
        res.status(403).send('Invalid username or password');
    }
};

app.post('/api/login', authenticateUser, (req, res) => {
    console.log(req.session)
    res.status(200).send(user);
});

app.listen(8080, () => {
    console.log('Server Running!');
});
```

### Destroying A Session

We can destroy a server session by using the built in `destroy` method from the session.

```js
app.get('/api/logout' (req, res) => {
    req.session.destroy();
    res.status(200).send('user has been logged out');
});
```

# Node Five

In this lecture we talk about setting up authentication in our node / express server.

## Authentication

`Authentication` is the process of verifying that an individual, entity, or website are who they say they are.

When authenticating users in a web application, it's common practice to require some sort of username or email and password. Passwords are information that only the owner of the password should know so it's important we keep that data safe and secure.

### Why Authentication?

There are many different reasons why we would setup an authentcation process in our applications. We will use it whenever we want to create a unique experience for the user based off of their own personal information, whenever or servers need to know exactly who is accessing that data because different users will have different permissions to what data they can access, we also need to protect the user information.

There are two ways that we can go about setting up `authentication` into our web applications.

### Basic Authentication Built Into HTTP

Basic authentication is an authentication scheme that's built into http requests. This is a very simple way to set access restricitions for specific web resources.

Credentials are `encoded` and sent through the header of the http request.

![basic auth](images/basicauth.png)

`encoding` is where we transform data into another format using a publicly available scheme and is easily reversible. All you need to decode the encoding is by using the algorithim used to encode it.

![encoding](images/encoding.png)

Basic authentication provides no confidentiality to the transmitted credentials, so if someone were to intercept the transmitted data, it would be insanely easy to decode.

This is great for sending API keys for example.

### Form Based Authentication

This is the most common form of authentication that you will see over the web. This is where a user will enter their credentials into a form on your site and those credentials will be sent through the `body` of the request.

Anytime we are sending personal data like credentials or payment information, we want to make sure the info is being sent over with an `https` request.

We need make sure we are using `https` with basic and form authentication. Https will provide `encryption` to our request.

`Encryption` will transform the data being sent with the goal of keeping things secret. 

The data being sent will be encrypted with an ecryption algorithim and will be provided a key. This will transform the data into `ciphertext`.

Ciphertext can only be decrypted with the encryption algorithim and the key.

![enryption](images/encryption.png)

Encryption is great for end to end messaging.

Now what do we do when we recieve that information on our server?

* We DO NOT store plain passwords in the database

* We DO NOT store encoded passwords in the database

* We DO NOT store encypted passwords in the database

We need to add another level complexity by `hashing` the password before storing it. 

### Hashing

Hashing is another way that we can protect data. We will `hash` user passwords before storing them.

Hashed password will become a random string of characters that is intended to never be un-hashed.

![hashed pattern](images/hashed.png)

A hash is pretty much impossible to reverse enginer and un-hash. This provides another very strong layer of security.

So we will be storing the `hashed` passwords into our database.

When we recieve the same input from a user and run the same hash algortihim on it, we will receive that same hash value so we can use that hash value to find the stored hash value in our db.

#### Salt 

When we are hashing our passwords, we also want to add a `salt`. This will add some more complexity to the security layer to create an even more secure way to store passwords.

The salt is just another set of characters that are completely random that will make the hashed string even more crazy.

![salt pattern](images/salt.png)

### Bcrypt

We will be using `bcrypt` to generate the hashed and salted passwords. Bcrypt is an awesome library that we can us the tools from to increase the security in our applications.

#### Create A Hashed Password

Below is an example to create a hashed and salted password

```js
    // Require bcrypt
    const bcrypt = require('bcryptjs');
    // Unhashed password
    let password = 'thisisapassword';
    // Create a salt
    let salt = bcrypt.genSaltSync(15);
    // Create a hash with the password and salt
    let hash = bcrypt.hashSync(password, salt)
    // Store hash into db
```

#### Reading A Hashed Password

Below is an example to compare a password to hashed password

```js
    // Require bcrypt
    const bcrypt = require('bcryptjs');
    // Unhashed password
    let password = 'thisisapassword';
    // Load hashed password from db
    let hashedPassword = db.get_password();
    // compare the password and hashedPassword
    let authenticated = bcrypt.compareSync(password, hashedPassword); // this will return true or false
    // use the authenticated variable to check if user is logged in successfully
```
