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

- MongoDB, Node.js:
  - Express.js, jwt, bcrypt, child_process, multer, cookie-parser, cors, helmet, xss-clean, express-rate-limit

### Frontend

- Pico.css, React.js:
  - react-router, styled-components, axios, react-toastify

## Known Issues

### Frontend

- The css framework used for designing the app comes with built-in light and dark themes. Currently the theme is set to client's system default preference. A switch will be added in order to toggle between the light and dark themes.
