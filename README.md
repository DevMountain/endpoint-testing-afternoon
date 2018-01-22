<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we will learn about endpoint testing using Postman. Postman is a REST client that we will be making HTTP requests from. We will learn how to write Postman tests for the responses from the HTTP requests.

Postman docs: https://www.getpostman.com/docs/postman/scripts/test_scripts

## Setup

* `fork` and `clone` this repository.
* `cd` into the root of the project.
* Run `npm install`.
* Run `nodemon` to start up the server.
  * The server will run on port `3535`, do not change this port.

<img src="https://github.com/DevMountain/endpoint-testing-afternoon/blob/master/readme-assets/2.png" />

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







## Step 3

### Summary

In this step we will be writing tests to check the response that comes back from the server.

### Instructions

#### GET - All Users

* Click on the first request (`GET - All Users`). You will not need to change the method, request url, or the body of the request. All the needed request information has already been filled out.
* Click the blue `Send` button and look at the response that we get. The server will be sending back an array of all user objects.
* Select the `Tests` tab, located under the request url. We will be writing the tests in the box below.
* __Tests:__
  * Should be getting a status code of 200 if the request is successful. In the snippets section on the right, click on `Status code: Code is 200`. This will insert a snippet that tests whether or not the status code is 200.
    * Take a look at the snippet we just added. This is how we will structure and write most of our Postman tests.
    ```

    pm.test('description of test here', function() {
      // What we want tested here
      pm.expect( [data being tested] ).to.eql( [value] )
    })
    ```
  * Next, check if the data that came back as a response is an array.
  * *NOTE:* You will need to parse the response to check any values: `pm.response.json()`.


    <details>
    <summary><code>Solution</code></summary>

    ```
    pm.test('Response is array', function() {
        pm.expect(Array.isArray(pm.response.json())).to.eql(true);
    })
    ```
    </details>

  * We know that we have exactly 100 users right now. Test to make sure 100 user objects got returned.
  
    <details>
    <summary><code>Solution</code></summary>

    ```
    pm.test('100 user objects in reponse', function() {
        pm.expect(pm.response.json().length).to.eql(100)
    })
    ```
    </details>

#### GET - User By ID

Time to move on to the next request: `GET - User By ID`. Select the request and go to the `Tests` tab. This request hits an enpoint that returns a specific user by the user's ID.

__Write tests for the following__:
* Status should be 200.
* Should respond with an array of 1 user object.
* The user with an ID of 9 is a test user that was put in our database and will never be deleted by a user.
  * Response object should have values of:
  ```
      {
          "id": 9,
          "first_name": "Tatum",
          "last_name": "Vell",
          "email": "tvell8@wisc.edu",
          "city": "Youngstown",
          "state": "Ohio",
          "phone": "(330) 6802507"
      }
  ```

  <details>
  <summary><code>Solution</code></summary>

  ```
  const res = pm.response.json();

  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });

  pm.test('Length of respose should be 1', function() {
      pm.expect(res.length).to.eql(1)
  })

  pm.test('Correct user info returned for ID 9', function() {
      const tatum =     {
          "id": 9,
          "first_name": "Tatum",
          "last_name": "Vell",
          "email": "tvell8@wisc.edu",
          "city": "Youngstown",
          "state": "Ohio",
          "phone": "(330) 6802507"
      }
      let correctInfo = true;
      for (let prop in tatum) {
          if (tatum[prop] !== res[0][prop]) correctInfo = false;
      }
      pm.expect(correctInfo).to.eql(true);
  })
  ```
  </details>

#### GET - User By ID (ERROR)
This test is checking what gets returned when an ID is not correctly sent.

__Write tests for the following:__
* When text is sent instead of a valid ID, the status code should be 400.
* Message sent: `User id sent must be a number`
  * HINT: To check the text sent as the body of the response, use:
  ```
  pm.expect(pm.response.text()).to.include("String you expect");
  ```

  <details>
  <summary><code>Solution</code></summary>

  ```
  pm.test("Status code is 400", function () {
      pm.response.to.have.status(400);
  });

  pm.test('Message: User id sent must be a number', function () {
      pm.expect(pm.response.text()).to.include("User id sent must be a number");
  });
  ```
  </details>

#### GET -  Search W/ Query

You can search for any user objects using queries. You can search with as little as just one letter. Example:
* `?firstName=jo`
* `?lastName=R`
* `?email=jacey14@`
* `?city=new`
* `?state=ca`
* `?phone=801`

__Test for the following:__
* Status should be 200.
* Since we have a test user in the database with the letter 't' (Tatum Vell) in their first name, the response length should always be greater than zero (given the search query: `?firstName=t`).

  <details>
  <summary><code>Solution</code></summary>

  ```
  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });

  pm.test('Length of response > 0; given: firstName=t', function() {
      let greaterThanZero = true;
      if (pm.response.json().length < 1) greaterThanZero = false;
      pm.expect(greaterThanZero).to.eql(true);
  })

  ```
  </details>

#### GET - Search W/ Query (ERROR)

__Test for the following:__

When a query parameter is misspelled, an error message will be sent.

* Status should be 400.
* Message sent in body: `Improper query sent in request`

  <details>
  <summary><code>Solution</code></summary>

  ```
  pm.test("Status code is 400", function () {
      pm.response.to.have.status(400);
  });

  pm.test("Correct error message", function () {
      pm.expect(pm.response.text()).to.include("Improper query sent in request");
  });
  ```
  </details>

#### PUT - Update User By Id

This endpoint will update a user, by the given ID, with the information sent in the body. 

* Response: user object that was updated.

__Test for the following:__
* Status should be 200.
* User with ID 23 should have the following information updated:
  * email = 'garey@ilovecode.com'
  * city = 'Pittsburg'

<details>
<summary><code>Solution</code></summary>

```
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Email and city updated for user w/ ID 23', function() {
    let res = pm.response.json();
    let infoUpdated = true;
    if (res[0].email !== 'garey@ilovecode.com' || res[0].city !== 'Pittsburg') {
        infoUpdated = false;
    }
    pm.expect(infoUpdated).to.eql(true);
})
```
</details>

#### PUT - Update User By Id (ERROR: text)

Write tests for when text is sent instead of a number for the user ID.
 
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

#### PUT - Update User By ID (ERROR: User not found)

Write tests for when an ID is used that does not exist in the database.

__Test for the following:__

* Status code should be 404.
* Error message: `User not found.`

<details>
<summary><code>Solution</code></summary>

```
pm.test("Status code is 400", function () {
    pm.response.to.have.status(404);
});

pm.test("Error message: User not found.", function () {
    pm.expect(pm.response.text()).to.include("User not found.");
});
```
</details>

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
