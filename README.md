# textcrypt - api & frontend

A simple text based cryptography app that allows users to encrypt and decrypt text using various encryption algorithms. It uses a modular design that enables the addition of new ciphers with ease. The ciphers are implemented in python and the admin can add and remove them. The app is purely educational and made as a learning experience

## functions

### role: admin

- admin logs in, and adds, updates, or removes cipher files and specification about the cipher and its keys
- the cipher information gets added to the model, and the file (written in python) itself goes to an uploads directory in the server

### role: user

- can access the main page and use any of the available ciphers to encrypt/decrypt text
- user can also choose to sign up and get their usage history be saved in their account

### feature breakdown:
+: implemented
-: not yet implemented

- admin cipher add/remove (+)
- encryption/decryption with available ciphers (+)
- user interface for selecting cipher of choice and inputting text & key[s] for cryptography (+)
- user authentication / authorization (+)
- admin authentication & securing admin routes (+)
- user session/cookies to secure individual users' usage history (+)
- user interface for viewing their usage history (+)
- admin dashboard interface for managing ciphers (partely implemented)

## technologies

### backend

- nodejs, expressjs, mongodb, jwt, bcrypt, child_process, multer, cookie-parser

### frontend

- reactjs, react-router, styled-components, picocss, axios, react-toastify

swagger documentation: *coming soon*

## known bugs
### frontend
- The state of the app is currnetly managed through two global contexts, and on different components these global contexts are being directly changed and updated using various hooks on the intial load. This causes the app to not properly function upon first access. This will be fixed with the implemention of the useReducer hook to manage the state of the app in a better way.**Only current work-around is to refreash the app a few times**
- The app currently is only partially responsive. On different components table element is used, and those elements are not yet made responsive.
