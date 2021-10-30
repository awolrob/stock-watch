# Stock Watch Life
![Badge for GitHub](https://img.shields.io/github/languages/top/awolrob/stock-watch?style=flat&logo=appveyor) 

- Deployed: https://www.stockwatch.life/
- Github: https://github.com/awolrob/stock-watch
  
## Description 
  
Stock Watch is a convenient app for the potential investor on the go.  After initial sign up and log in, the user navigates to the search bar and enters either the company name, or stock symbol to find and save that stock to their watchlist.  The user can view current performance and closing prices, as well as performance over the span of the watch.  Stock data will be accompanied by app logo, corporate headquarter location, and ticker symbol

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Concepts](#concepts)
* [Planning](#planning)
* [Contributors](#questions)

  
## Installation
  
To run locally

* Clone repository
* `Run npm install`
* `npm run start:dev`

## Usage 

Below is a demonstration of the app functionality

![working-project](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/app-in-use-gif.gif)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/homepage-capture.PNG)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/login-capture.PNG)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/search-capture.PNG)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/saved-to-watchlist-capture.PNG)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/watch-list-display-capture.PNG)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/filled-out-watchlist-capture.PNG)

![image](https://raw.githubusercontent.com/awolrob/stock-watch/main/Assets/images/price-point-capture.PNG)

## License
  
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) (https://raw.githubusercontent.com/awolrob/stock-watch/main/LICENSE)

## concepts
Original framing idea

![sample single page app layout for logged on user.](./Assets/sample-screen.jpg)

## Planning

- Apollo Server

    1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data.

    2. Install an authentication middleware so that it works in the context of a GraphQL API and persists throughout the 
       user's on-line experience.

    3. Use Apollo Client to create an Apollo Provider so that requests can communicate with an Apollo Server.

    4. Deploy the application to Heroku using a MongoDB database hosted at MongoDB Atlas.

    5. Create a working API which will pull the previous day's closing prices for every stock in every user's watch list in the
       system ( server side 8AM automated routine? ) https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=* tickers? = A comma separated list of tickers to get snapshots for.

    6. Allow users to sign up and create a stock watch list

-  Technical Layout

    Application Technical Layout

    Keep it simple!

### Back-End Specifications

* `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.

* `auth.js`: Update the auth middleware function to work with the GraphQL API.
	
* `Schemas` directory:
		
    * `User` type:
    <!-- Stores data of signed up user -->

    	* `_id`

    	* `username`

    	* `email`

    	* `watchList` (This will be an array of the `Stock` type.)

    * `Stock` type:
    <!-- bare min. data needed for watchList -->

    	* `_id`

    	* `ticker`

    	* `dateAdded`

    * `Auth` type:
    <!-- bare min. data to share authenticated user -->

    	* `token`

    	* `user` (References the `User` type.)


### Front-End Specifications

We will need to create the following front-end files :


* `queries.js`: This will hold the queries.

* `mutations.js`:

	* `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.

	* `ADD_USER` will execute the `addUser` mutation.

	* `SAVE_TICKER` will execute the `` mutation.  (add a ticker to a user's watchList)

	* `REMOVE_TICKER` will execute the `` mutation. (remove a ticker to a user's watchList)

  ---
  
## Questions?
  
For any questions, please contact me with the information below:
 
GitHub:

* [@awolrob](https://api.github.com/users/awolrob)
* [@fausnightm](https://github.com/fausnightm)
* [@ehajek](https://github.com/ehajek)
* [@GinleyP87](https://github.com/GinleyP87)
* [@Mason021](https://github.com/Mason021)