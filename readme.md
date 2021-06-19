
# Blup

Blup is a web app to find public drinking fountains.
A community-driven platform where users can contribute by spotting and adding new fountains, verifying existing ones, reporting problems or malfunctions.

Try a deployed prototype with fake data here: https://blup-stg.herokuapp.com/

Currently a work in progress for a full-fledged, production-ready app.

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/v1624095154/github/NUOVO2_ngtqm8.jpg)

## Features
### Find a fountain
Use the main map to see if there are fountains near you.

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/c_scale,w_700/v1624095064/github/mapFull_ltiy7n.png)

Click on the map pointer to know more about a fountain. 
In this case there are three verifications, which means that at least 3 people have  indeed either seen the fountain or have stopped by it.
There are also two active reports, clicking on the "Show" button will take you to the fountain page where you'll find more details.

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/c_scale,w_700/v1624096732/github/blupMap_btyg5w.png)

### Know more about a fountain thanks to community contributed data
On a fountain page you can look at its photos,  find out verifications' authors (by clicking on the verifications count button), read comments and reports. 

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/c_scale,w_800/v1624097662/github/blupPage_emvtxh.png)

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/c_scale,w_800/v1624097845/github/blupReports_gyb86h.png)

### Sign up and contribute
Create an account to be able to add a fountain, comment, send verifications, add reports or mark them as solved.

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/c_scale,w_800/v1624099146/github/blupAdd_zwtmhp.png)

![enter image description here](https://res.cloudinary.com/dpx4ehb92/image/upload/c_scale,w_800/v1624099426/github/blupLoggedin_foyi07.png)

## Built with:

#### Backend
<ul>
<li><a  href="https://nodejs.org/en/">Node.js</a></li>
<li><a  href="https://expressjs.com/">Express.js</a></li>
<li><a  href="https://mongoosejs.com/">Mongoose.js</a></li>
<li><a  href="https://www.mongodb.com/">MongoDB</a></li>
<li><a  href="https://ejs.co/">EJS</a></li>
<li><a  href="https://www.npmjs.com/package/joi">Joi</a></li>
<li><a  href="https://www.npmjs.com/package/multer">Multer</a></li>
<li><a  href="https://www.npmjs.com/package/cloudinary">Cloudinary</a></li>
<li><a  href="https://helmetjs.github.io/">Helmet</a></li>
<li><a  href="http://www.passportjs.org/">Passport</a></li>
</ul>

####  Frontend
<ul>
<li><a  href="https://bulma.io/">Bulma</a></li>
<li><a  href="https://www.mapbox.com/mapbox-gljs">Mapbox GL JS</a></li>
<li><a  href="https://glidejs.com/">Glide.js</a></li>
<li><a  href="https://www.npmjs.com/package/@creativebulma/bulma-collapsible">bulma-collapsible</a></li>
</ul>

## To do
#### Backend
- Find fix for upload size limit problem  (see [this issue](https://github.com/expressjs/multer/issues/344) ) or an alternative to  using Multer altogether
- Avoid repeating geocoding if address doesn't change when editing a fountain
- Fix redirect to favicon 404 bug
- Remove images operations from fountains controller, add images specific routes instead
- Add retry logic to api calls (e.g. cloudinary)
- Add user profile view (user fountains etc...)
- Add users reputation system

#### Frontend
- Use mapbox cdn only where needed
- Find fix for Glide.js touchscreen bug (see [this issue](https://github.com/glidejs/glide/issues/33)) or even better develop your own image carousel
- Improve form validation rules
- Add "file is uploading" animation
- Add a visual enanchement to new comments or reports when they are posted
- Add search by address function
- Add function to select point on a map to add a new fountain (get address and autocomplete form)

## Acknowledgments


- [YelpCamp](https://github.com/Colt/YelpCamp) from <a href='https://www.udemy.com/share/101W9CBEcacllXRXw=/'>The Web Developer Bootcamp 2021</a> by Colt Steele, which I took as a starting point for the project after attending the course
- [Bulletproof node.js project architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/) article by Sam Quinn, for insights on software architecture

