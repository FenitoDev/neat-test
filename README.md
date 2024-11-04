# NeatTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Environment variables

Create a `.env` file under `src/environments/` before building the project.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## The app

### Installing dependencies

Run `npm install` in the project's root directory to install dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Usage

Once in the landing url (localhost:4200 for local development and https://neat-test-f0035.web.app/ for web), you'll get prompted to login or register. Once authenticated, you will be redirected to the home page, where you'll see three columns of data:
- The prices for the main cryptocurrencies as fetched from coingecko's API.
- The user's balance for the cryptocurrencies and their value in USD.
- The net worth of the user in USD, their available money in USD and the list of transactions they've made.

Also, on the header bar, there will be a logout button and a button for trading. Pressing this last button will open a dialog prompting the user for buying or selling a cryptocurrency. This dialog makes a request for the mock Neat Crypto Exchange API, throwing an error on 10% of the requests.

## Security

The environment variable file is generated during build, so that they are not public.
If an unauthenticated user tries to navigate to `/home` they will be kicked out and prompted to login or register.

## Next steps

- Being a crypto exchange service, the user should be able to `schedule` transactions with target price and stop-loss, instead of having to trade the moment they get their desired price
- To increase security, the user should be automatically logged out after 10 minutes
- Add multi-factor-authentication to increase users' account security
- Add trading among cryptocurrencies (currently is just USD-crypto)
- Add a profit module, in which the user can see how much their money has grown (or shrunk)
- Add embedded graphics for currency pairs to see market tendencies
- Store in the database the crypto currencies prices as fetched in the coingecko API, to avoid errors from too many requests from the API
