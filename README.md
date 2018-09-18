![Veery Logo](/design/branding-attempt-2.png)

## Find open mics, open jams and karaoke nights when you're feeling impulsive.

[Website.](http://veery.cool/#/)

[Check out the wiki for the long-winded description of the project.](https://github.com/mweslander/veery/wiki)

[The Old Repo.](https://github.com/mweslander/veery) I have recently moved over to a fork on my GitHub account to make it easier to manage Heroku.

## Table of Contents

- [Installation](#installation)
- [Important](#important)
- [Stack](#stack)
- [Git Workflow](#git-workflow)
- [View the App](#view-the-app)
  - [Environments](#environments)
  - [Servers](#servers)
  - [Domains](#domains)
- [Users And Logins](#users-and-logins)
  - [Admin](#admin)
  - [Venue Admin](#venue-admin)
- [Testing](#testing)
  - [API Tests](#api-tests)
  - [Client Tests](#client-tests)
- [Local Development](#local-development)
  - [How to Get Started?](#how-to-get-started)
- [Map Styling](#map-styling)

### Installation

* Fork the repository
* Clone & `cd veery`
* `npm install`
* Install mongo. Instructions can be found [here](https://treehouse.github.io/installation-guides/mac/mongo-mac.html).

### Important

* Looking to deploy your work? Skip on down to [Git Workflow](#git-workflow)

### Stack

* React 16
* Express 4
* Webpack 4

### Git Workflow

1. Do you work locally on its own branch.
2. Push it up and open a PR with `staging` as the base branch.
3. Heroku will run CI (`npm run lint && npm run test`) on the PR and inform you on GitHub if it can be merged.
    - In the meantime, go to the Veery pipeline on Heroku. You'll see that by opening the PR, a deploy automatically happened. Once it is deployed, you can open the PR as its own [review] app and see if your changes worked!
4. After everything looks good and CI gives you the okay, merge it into staging. Heroku will automatically deploy your work again.
5. If everything looks good on staging, open a PR for `staging` with `master` as the base branch. Let CI and the review apps do their thing. Once they're ready, QA the review app and ensure it's good.
6. Finally, merge in the PR and Heroku will automatically deploy your work.

### View the App

#### Environments

- Staging - Where we QA things
- Production - Live app

#### Servers

* Staging: [https://veery--staging.herokuapp.com/](https://veery--staging.herokuapp.com/)
* Production: [https://veery--production.herokuapp.com/#/](https://veery--production.herokuapp.com/#/)

#### Domains

* Staging: [https://veery--staging.herokuapp.com/](https://veery--staging.herokuapp.com/)
* Production: [veery.cool](https://veery.cool)

- [Users And Logins](#users-and-logins)
  - [Admin](#admin)
  - [Approvers](#approvers)
  - [DMs and TSRs (basic users)](#dms-and-tsrs-basic-users)
  - [Business Side](#business-side)

### Users and logins

#### Admin

* `admin@veery.cool` / `password`

##### Production

To add an admin user, you'll need to go into `/src/api/database/seeds/users` (in the server) and change the password field to your password. Then run `npm run db:seed:admins`. Do not commit a password change to Git.

We have to use the seed feature because I have not been able to hash passwords from the Mongo console tool.

#### Venue Admin

* `venueadmin-1@example.com` / `password`

### Testing

`npm run test`

#### API tests

`npm run server:test`

#### Client tests

`npm run client:test`

### Local Development

#### How to get started?

1. Run `cp env.example .env`
1. In its own terminal, run `mongod`
1. In its own terminal, run `heroku local`
1. Run `npm run db:furnish`
1. In its own terminal, run `npm run client:start`
1. Visit `localhost:8080`

### Map Styling
Made easy with [snazzy maps](https://snazzymaps.com/editor)
