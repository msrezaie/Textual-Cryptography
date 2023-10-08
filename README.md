# Textcrypt - API & Frontend

A simple text based cryptography app that allows users to encrypt and decrypt text using various encryption algorithms. It uses a modular design that enables the addition of new ciphers with ease. The ciphers are implemented in python and the admin can add and remove them. The app is purely educational and made as a learning experience

### Access

App: https://text-crypt.netlify.app/
<br>
API Documentation (Swagger UI): https://textcrypt-api.onrender.com/api-docs/

### Feature Breakdown:

+: implemented
-: not yet implemented

- Regular users can encrypt/decrypt their input text with available ciphers (+)
- Users have the ability to sign up and use the app (+)
- Registered users get their own http only cookie to access thier individual usage history (+)
- Logged in users get to (view, add, remove, modify) upon encryption or decryption of text to their usage history (+, -update/modify)
- Admin user can login and manage (view, add, remove, modify) cipher files (+, -update/modify)
- Admin functionalites are only accessable to admin users (currnently only 1 registered admin on the initial load of the API) (+)
- Fully responsive (+)
- Theme change between light and dark mode (-)
- Users can use email address instead of just name for authentication/authorization (-)
- Forgot password feature for registered users (-)
- User profile page for managing their info (-)


## Technologies

### Backend

- MongoDB: is used for managing data models of the app
- Node.js: is used as the main environment for running the server
- Express.js: is used for building the architecture of the server
  - jsonwebtoken: is used as the main method of authenticating the users
  - bcrypt: is used for hashing the user passwords
  - child_process: is used for running python scripts in node environment as a sub process
  - multer: is used for managing file upload to the server
  - cookie-parser: is used for parsing cookie data
  - cors: is used as a browser security feature for restricting cross-origin HTTP requests
  - helmet: is used for protecting the server from some web vulnerabilities by setting HTTP response header to requests
  - xss-clean: is used for sanitizing user input coming from request body or URL params
  - express-rate-limit: is used for limiting the number of allowed requests in the API

### Frontend

- Pico.css: is used as the main css framework
- React.js: is used for building the architecture of the frontend
  - react-router: is used for providing navigation between internal components
  - styled-components: is used for allowing specific css styling to individual components 
  - axios: is used as the main library for HTTP requests
  - react-toastify: is used as the main package for pop up alert notifications