![Veery Logo](/design/branding-attempt-2.png)

## Find open mics, open jams and karaoke nights when you're feeling impulsive.

[Website.](http://veery.cool/#/)

[Check out the wiki for the long-winded description of the project.](https://github.com/mweslander/veery/wiki)

[The Old Repo.](https://github.com/mweslander/veery) I have recently moved over to my GitHub to make it easier to manage Heroku.

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
  - [Approvers](#approvers)
  - [DMs and TSRs (basic users)](#dms-and-tsrs-basic-users)
  - [Business Side](#business-side)
- [Deployments](#deployments)
- [Run API Tests](#run-api-tests)
- [API Docs](#api-docs)
- [Using SAML](#using-saml)
  - [Changing a User's Role](#changing-a-users-role)

### Installation

* Fork the repository
* Clone & `cd veery`
* `npm install`

### Important

* Looking to deploy your work? Skip on down to [Git Workflow](#git-workflow)

### Stack

* React 16
* Express 4
* Webpack 4

### Git Workflow

1. Do you work locally on its own branch.
2. Push it up and open a PR with `staging` as the base branch.
3. Heroku will run CI on the PR and inform you on GitHub if it can be merged.
  - In the meantime, go to the Veery pipeline on Heroku. You'll see that by opening the PR, a deploy automatically happened. Once it is deployed, you can open the PR as its own [review] app and see if your changes worked!
4. After everything looks good and CI gives you the okay, merge it into staging. Heroku will automatically deploy your work again.
5. If everything looks good on staging, open a PR for `staging` with `master` as the base branch. Let CI and the review apps do their thing. Once they're ready, QA the review app and ensure it's good.
6. Finally, merge in the PR and Heroku will automatically deploy your work.



# WORK IN PROGRESS. STOP HERE.


### Background
We're doing this as a project to learn a little more Node & React. We'll be following [Zach Kuhn's tutorial](https://medium.com/@zacharykuhn/a-gentle-intro-to-react-part-1-82ef6b16973c).

### Admin user

To add an admin user, you'll need to go into `/src/api/database/seeds/users` and change the password field to your password. Then run `npm run db:seed`. Do not commit the password change to Git.

We have to use the seed feature because I have not been able to hash passwords from the Mongo console tool.

### Serving locally

* `npm start`
* [http://localhost:7665](http://localhost:7665)

### Testing

* `npm test`

### Map Styling
Made easy with [snazzy maps](https://snazzymaps.com/editor)
