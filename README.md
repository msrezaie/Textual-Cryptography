# TextCrypt - API & Frontend

A simple text based cryptography app that allows users to encrypt and decrypt text using various encryption algorithms. It uses a modular design that enables the addition of new ciphers with ease. The ciphers are implemented in python and only the root admin can add and remove them.

## Access

App: https://text-crypt.netlify.app/
<br>
API Documentation (Swagger UI): https://textcrypt-api.onrender.com/api-docs/

Read-only Admin Email: readonlyadmin@textcrypt.msr
<br>
Read-only Admin Password: readOnlyAdmin123

## Feature Breakdown

#### Encryption/Decryption
Visitors (not signed up users) can encrypt/decrypt their input text with available ciphers

#### Sign in/Login
Users who sign in:
- Have their usage history saved and accessible whenever they login
- From their saved usage history they get to select and work again on a record
- Get their own dashboard with options

#### Root Admin Role
Root Admin users have access to the admin dashboard to:
- Manage (view, add, remove, modify) cipher information.
- Manage (view, add, remove, modify) other users who have registered

#### Read-only Admin Role
Read-only admins can only access the admin dashboard but cannot add, remove, or modify any of the resources in the app

#### Responsiveness
The app is fully responsive and functional on any screen size

#### Theme Switch
The can change between light and dark mode

#### Forgot Password
Users who have forgotten their password can reset their password using a One Time Password (OTP) sent to their email

## Technologies

### Backend

- MongoDB: is used for managing data models of the app
- Node.js: is used as the main environment for running the server
- Express.js: is used for building the architecture of the server
  - jsonwebtoken: is used as the main method of authenticating the user
  - bcrypt: is used for hashing the user passwords
  - child_process: is used for running python scripts in node environment as a sub process
  - multer: is used for managing file upload to the server
  - cookie-parser: is used for parsing cookie data
  - cors: is used as a browser security feature for restricting cross-origin HTTP requests
  - helmet: is used for protecting the server from some web vulnerabilities by setting HTTP response header to requests
  - xss-clean: is used for sanitizing user input coming from request body or URL params
  - express-rate-limit: is used for limiting the number of allowed requests in the API
  - express-async-errors: is used for handling backend errors
  - validator: is used for validating correct email formating
  - swagger-ui-express: is used for serving and providing an interactive interface for the API
  - sendGrid: is used to sending an email containing a randomly generated OTP to users requesting password reset

### Frontend

- Pico.css: is used as the main css framework
- React.js: is used for building the architecture of the frontend
  - react-router: is used for providing navigation between internal components
  - styled-components: is used for allowing specific css styling to individual components 
  - axios: is used as the main library for HTTP requests
  - react-toastify: is used as the main package for pop up alert notifications

## Known Issues
After a user signs up and generates some history, the select button on a history record at times don't work. This is due to improperly managed local state of the history context. Will be refactored and fixed in a future commit.
