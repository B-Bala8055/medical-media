# medical-minds-network
A discussion forum made for allopathic practitioners. The application UI resembles Stack Overflow

## Technology Stack
* Next Js
* Bootstrap styling
* MongoDB

## External dependencies added
* Google SSO
* Facebook SSO
* Yandex SSO
* AWS S3

## Code configuration & customization

Refer [ENV EXAMPLE](./environmentVariableExample.txt) for all environment variables to be setup. Create a .env file inside [application folder](./application/).  

If you are planning to change the storage bucket provider, make changes to the file [cdn.js](./application/src/utils/helpers/cdn.js).  

If you are willing to add more methods for authentication, make changes to the file [auth.js](./application/src/utils/authentication/auth.js).  

To change Logo, edit logo.png in [static folder](./application/src/static/icons). Fix size and alignment issues in the [Navigation component](./application/src/components/Navigation.js)  

## Note
Once you start the application, first user must be verified manually by updating the database. This user can later access the community tab and approve other new users.  

Upvote and downvote button wont update the count in real time. Once the buttom is pressed, count will be updated when page is refreshed.  

## Issues/Pending
* Upvote and downvote dont update in realtime. Votes component to be made client side. Currently, the whole discussion page is rendered from server side with SEO in mind.
* Dynamic sitemap generation code is not yet implemented.
* Website is designed mobile friendly. However UI alignment is partially tested.