# Project 2 - Party Planner Company Website
## A party planner website built using **Node.js, Mongoose, Express and EJS**
* Adhere to the **MVC** file structure: Models, Views, Controllers
* All 7 **RESTful routes** and full **CRUD** incorporated.
* CSS framework Materialize used.
* Used EJS Partials
* Include sign up/log in functionality, with encrypted passwords & an authorization flow
* **Site deployed online** and accessible to the public via **Heroku**

## Site structure
* A landing page with a full width carousel.
* Packages page:
  * That displays all the available packages for purchase.
  * Each package has a title, price, description, image, highlights and Disclaimers.
  * By default a customer can only view a package and send online Enquiry
* Gallery page that displays images of past events.
* A contact us page - with a form to send enquiry

## CURD path:
* An packages index page that displays all Packages.
* Each package has a show page.
* Login/Signup option for owner.
* Only after successfully signing in, user can add new packages (Seed Route also created).
* User can edit and delete packages.

##  Technical details:
* Main mongo db : eve_party
* Two separate collections:
  * 1 for party Packages
  * 1 for user
* Live site: https://eves-party-planner.herokuapp.com/
##  Technical challenges:
* secret keyword store in dot env file is not working properly on heroku.
* bcrypt version issues when deployed to heroku.
* There were some issues with express sessions when initially deployed to Heroku.
* Show page is still giving some error in terminal which i wasn't able to troubleshoot. This does not affect the site on browser.
* Sub pages does not render ejs partials correct for some unknown reasons.

##  Key Learning:
* I learned how to capture date for an array within an object defined in models root.
* Create a logo from a free logo creation website.
* How to use css frame work Materialize. I took a lot of time styling the gallery and making it pop out on click.
* use express session through out the site and checking if there is a signed in user.
* I learned how easy it is to create a standard website template.
* I have put together a word document summarizing unit 2 and step by step guide to follow when creating a project.
