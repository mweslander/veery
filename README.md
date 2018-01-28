![Veery Logo](/design/branding-attempt-2.png)

## Find open mics, open jams and karaoke nights when you're feeling impulsive.
[Website](http://veery.cool/#/)
[Check out the wiki for the long-winded description of the project.](https://github.com/mweslander/veery/wiki)

### Background
We're doing this as a project to learn a little more Node & React. We'll be following [Zach Kuhn's tutorial](https://medium.com/@zacharykuhn/a-gentle-intro-to-react-part-1-82ef6b16973c).

### Installation

* Fork the repository
* Clone & `cd veery`
* `npm install`

### Admin user

To add an admin user, you'll need to go into `/src/api/database/seeds/users` and change the password field to your password. Then run `npm run db:seed`. Do not commit the password change to Git.

We have to use the seed feature because I have not been able to hash passwords from the Mongo console tool.

### Serving locally

* `npm start`
* [http://localhost:7665](http://localhost:7665)

### Testing

* `npm test`

### Contributing
I'm going to try to remember to follow [these git rules](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

### Map Styling
Made easy with [snazzy maps](https://snazzymaps.com/editor)
