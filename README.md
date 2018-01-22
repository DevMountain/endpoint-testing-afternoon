<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we will practice the basics of endpoint testing in Postman. Using a provided Postman collection, we'll create tests for a server's endpoints.

If you need to refresh on Postman's documentation: <a href="https://www.getpostman.com/docs/postman/scripts/test_scripts">Click Me!</a>

## Setup

* `fork` and `clone` this repository.
* `cd` into the root of the project.
* Run `npm install`.
* Run `nodemon` to start up the server.
  * The server will run on port `3535`, do not change this port.

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/setup.png" />

## Step 1

### Summary

In this step, we'll import the Postman collection into Postman.

### Instructions

* Open Postman.
* Click on the `import` button located in the top left corner of Postman.
  * The file you are importing is inside of the `postman_collection` folder in this repo.
* After importing, you should have a collection called `Endpoint Testing Afternoon`.

### Solution

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/1.png" />

## Step 2

### Summary

In this step, we will create a Postman test for fetching all users.

### Instructions

* Click on the `GET - All Users` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status code is `200`.
* Create a test to verify the returned data is an `Array`.
* Create a test to verify the returned data has a length of `100`.

### Solution

<details>

<summary> <code> GET - All Users </code> </summary>

```js
const responseJSON = pm.response.json();

pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Returned data is an array", function () {
  pm.expect( Array.isArray( responseJSON ) ).to.eql( true );
});

pm.test("Returned data has a length of 100", function () {
  pm.expect( responseJSON.length ).to.eql( 100 ); 
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/2.png" />

## Step 3

### Summary

In this step, we will create a Postman test for fetching users by ID.

### Instructions

* Click on the `GET - User by ID` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status is `200`.
* Create a test to verify the returned data is an `Array` with a length of `1`.
* Create a test to verify the returned data has an object with the following properties:
  * `id` equal to `9`.
  * `first_name` equal to `"Tatum"`.
  * `last_name` equal to `"Vell"`.
  * `email` equal to `"tvell8@wisc.edu"`
  * `city` equal to `"Youngstown"`.
  * `state` equal to `"Ohio"`.
  * `phone` equal to `"(330) 6802507"`

### Solution

<details>

<summary> <code> GET - User by ID </code> </summary>

```js
const expectedObject = {
  id: 9,
  first_name: "Tatum",
  last_name: "Vell",
  email: "tvell8@wisc.edu",
  city: "Youngstown",
  state: "Ohio",
  phone: "(330) 6802507"
};

const responseJSON = pm.response.json();

pm.test("Status code is 200", function () {
  pm.response.to.have.status( 200 );
});

pm.test("Returned data is an Array with length of 1", function () {
  pm.expect( Array.isArray( responseJSON ) ).to.eql( true );
  pm.expect( responseJSON.length ).to.eql( 1 );
});

pm.test("Returned data is expected", function () {
  pm.expect( responseJSON[0] ).to.eql( expectedObject ); 
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/3.png" />

## Step 4

### Summary

In this step, we will create a Postman test for fetching a user by ID that returns an error.

### Instructions

* Click on the `GET - User by ID ( error )` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status is `400`.
* Create a test to verify the returned message is `"User id sent must be a number"`.

### Solution

<details>

<summary> <code> GET - User by ID ( error ) </code> </summary>

```js
pm.test("Status code is 400", function () {
  pm.response.to.have.status( 400 );
});

pm.test("Returned error message is expected", function () {
  pm.expect( pm.response.text() ).to.eql("User id sent must be a number");
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/4.png" />

## Step 5

### Summary

In this step, we will create a Postman test for fetching users with a query.

### Instructions

* Click on the `GET - User with Query` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status is `200`.
* Create a test to verify the return data set has a length greater than `0`.

### Solution

<details>

<summary> <code> GET - User with Query </code> </summary>

```js
const responseJSON = pm.response.json();

pm.test("Status code is 200", function () {
  pm.response.to.have.status( 200 );
});

pm.test("Return data has a length greator than 0", function () {
  pm.expect( responseJSON.length > 0 ).to.eql( true );
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/5.png" />

## Step 6

### Summary

In this step, we will create a Postman test for fetching users with a query that returns an error.

### Instructions

* Click on the `GET - User with Query ( error )` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status is `400`.
* Create a test to verify the returned message is `"Improper query sent in request: citty=new york"`.

### Solution

<details>

<summary> <code> GET - User with Query ( error ) </code> </summary>

```js
pm.test("Status code is 400", function () {
  pm.response.to.have.status( 400 );
});

pm.test("Returned error message is expected", function () {
  pm.expect( pm.response.text() ).to.eql("Improper query sent in request: citty=new york");
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/6.png" />

## Step 7

### Summary

In this step, we will create a Postman test for updating a user by ID.

### Instructions

* Click on the `PUT - Update user by ID` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status is `200`.
* Create a test to verify the returned data is an `Array` with a length of `1`.
* Create a test to verify the returned user has an updated object with the following properties:
  * `email` should equal `"garey@ilovecode.com"`.
  * `city` should equal `"Pittsburg"`.

### Solution

<details>

<summary> <code> PUT - Update user by ID </code> </summary>

```js
const responseJSON = pm.response.json();

pm.test("Status code is 200", function () {
  pm.response.to.have.status( 200 );
});

pm.test("Returned data is an Array with a length of 1", function () {
  pm.expect( Array.isArray( responseJSON ) ).to.eql( true );
  pm.expect( responseJSON.length ).to.eql( 1 );
});

const user = responseJSON[0];

pm.test("Returned email is 'garey@ilovecode.com'", function () {
  pm.expect( user.email ).to.eql( "garey@ilovecode.com" );
});

pm.test("Returned city is 'Pittsburg'", function () {
  pm.expect( user.city ).to.eql( "Pittsburg" );
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/7.png" />

## Step 8

### Summary

In this step, we will create a Postman test for updating a user by ID that returns an error.

### Instructions

* Click on the `PUT - Update User by ID ( error )` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned stats is `400`.
* Create a test to verify the returned message is `""`.

### Solution

<details>

<summary> <code> PUT - Update User by ID ( error ) </code> </summary>

```js
pm.test("Status code is 400", function () {
  pm.response.to.have.status( 400 );
});

pm.test("Returned error message is expected", function () {
  pm.expect( pm.response.text() ).to.eql("Error with user ID in request.");
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/8.png" />

## Step 9

### Summary

In this step, we will create a Postman test for creating a new user.

### Instructions

* Click on the `POST - Create user` request.
* Click on the `Send` button to see the returned data.
* Create a test to verify the returned status code is `200`.
* Create a test to verify the returned data is an `Array` with a length of `1`.
* Create a test to verify the returned user has the following data:
  * `first_name` equals `"Bruce"`.
  * `last_name` equals `"Wayne"`.
  * `email` equals `"bruce@scarybat.com"`.
  * `city` equals `"Gotham"`.
  * `state` equals `"New Jersey"`.
  * `phone` equals `"(856) 6044252"`.
* Create a test to verify the returned users has an `id` property that equals a `number`.

### Solution

<details>

<summary> <code> POST - Create user </code> </summary>

```js
const responseJSON = pm.response.json();

const user = responseJSON[0];

const expectedUser = {
  id: user.id,
  first_name: "Bruce",
  last_name: "Wayne",
  email: "bruce@scarybat.com",
  city: "Gotham",
  state: "New Jersey",
  phone: "(856) 6044252"
};

pm.test("Status code is 200", function () {
  pm.response.to.have.status( 200 ); 
});

pm.test("Returned data is an Array with a length of 1", function () {
  pm.expect( Array.isArray( responseJSON ) ).to.eql( true );
  pm.expect( responseJSON.length ).to.eql( 1 );
});

pm.test("Returned user is expected", function () {
  pm.expect( user ).to.eql( expectedUser );
});

pm.test("Returned user id is a number", function () {
  pm.expect( typeof( user.id ) ).to.eql('number'); 
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/9.png" />








#### POST - Create New User
New user information will be sent in the body of the request.

* Response: user that was created.

__Test for the following:__
* Status code should be 200.
* User created should have the following key/value pairs:
  ```
  {
    "first_name": "Bruce",
    "last_name": "Wayne",
    "email": "bruce@scarybat.com",
    "city": "Gotham",
    "state": "New Jersey",
    "phone": "(856) 6044252"
  }
  ```
* An ID should have been auto-generated for the new user created. Make sure the ID exists and is a valid number.

<details>
<summary><code>Solution</code></summary>

```
let res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('User was added with correct user info', function() {
    let newUser = {
    "first_name": "Bruce",
    "last_name": "Wayne",
    "email": "bruce@scarybat.com",
    "city": "Gotham",
    "state": "New Jersey",
    "phone": "(856) 6044252"
  }
  let correctUserInfo = true;
  for (let prop in newUser) {
      if (newUser[prop] !== res[0][prop]) correctUserInfo = false;
  }
    pm.expect(correctUserInfo).to.equal(true);  
})

pm.test('ID exists and is a valid number', function() {
    pm.expect( typeof res[0].id ).to.eql('number');
})
```
</details>

#### POST - Create New User (ERROR: Incomplete body)

Write tests for when a new user is being created and all needed information is *not* sent.

__Test for the following:__
* Status code should be 400.
* Error message: `All needed user info was not sent in the body of request.`

<details>
<summary><code>Solution</code></summary>

```
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Error message: All needed user info was not sent in the body of request.", function () {
    pm.expect(pm.response.text()).to.include("All needed user info was not sent in the body of request.");
});
```
</details>

#### DELETE - Remove User

The endpoint will remove a user by the given user ID.
* Response: the user object that was removed.

__Test for the following:__
* Status code should be 200.
* The ID of the object that was removed is 66 (ID that was sent in request).

<details>
<summary><code>Solution</code></summary>

```
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Removed user has ID of 66', function() {
    pm.expect(pm.response.json()[0].id).to.eql(66);
})
```
</details>

#### DELETE - Remove User (ERROR: User does not found)
Write tests for when an ID is used to remove a user and that ID does not match anyone in the database.

__Test for the following:__
* Status code should be 404.
* Error message: `No user with an ID of 508.`
  * Only test for part of the message: `No user with an ID of`. The ID in the message will change based on what ID is sent.

<details>
<summary><code>Solution</code></summary>

```
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Error message: No user with an ID of", function () {
    pm.expect(pm.response.text()).to.include("No user with an ID of");
});
```
</details>

#### DELETE - Remove User (ERROR)

This request is attempting to delete a user, but is sending `five` instead of the number 5 as the ID parameter.

__Test for the following:__
* Status code should be 400.
* Error message: `Error with user ID in request.`

<details>
<summary><code>Solution</code></summary>

```
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Error message: Error with user ID in request.", function () {
    pm.expect(pm.response.text()).to.include("Error with user ID in request.");
});
```
</details>


## Step 4

* Restart `nodemon`.
* Run the entire collection of requests and tests.
  * Click on the right arrow next to the collection name.
  * Click the blue `Run` button. The collection runner will open.
  * Select the correct collection from the list on the left. Then click the blue button in the bottom at the bottom of the left side-menu.

You should see all of your tests passing. Make sure you restart the server every time you re-run the collection runner.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>
