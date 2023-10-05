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
- Admin functionalites are only accessable to admin users (currnently only 1 registered admin on the intial load of the API) (+)
- Fully responsive (+)
- Theme change between light and dark mode (-)

## Technologies

### Backend

- MongoDB, Node.js:
  - Express.js, jwt, bcrypt, child_process, multer, cookie-parser, cors, helmet, xss-clean, express-rate-limit

### Frontend

- Pico.css, React.js:
  - react-router, styled-components, axios, react-toastify

## Known Issues

### Frontend

- The state of the app is currnetly managed through two global contexts, and on different components these global contexts are being directly changed and updated using various hooks on the intial load. This causes the app to not properly function upon first access. This will be fixed with the implemention of the useReducer hook to manage the state of the app in a better way. **Only current work-around is to refreash the app a few times**
- The css framework used for designing the app comes with built-in light and dark themes. Currently the theme is set to client's system default preference. A switch will be added in order to toggle between the light and dark themes.
