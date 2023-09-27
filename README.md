# textcrypt - api & frontend

A simple text based cryptography app that allows users to encrypt and decrypt text using various encryption algorithms. It uses a modular design that enables the addition of new ciphers with ease. The ciphers are implemented in python and the admin can add and remove them. The app is purely educational and made as a learning experience

## functions

### role: admin

- admin logs in, and adds, updates, or removes cipher files and description (authentication not yet implemented)
- the cipher information gets added to the model, and the file (written in python) itself goes to an uploads directory in the server

### role: user

- can access the main page and use any of the available ciphers to encrypt/decrypt text
- user can also choose to sign up and their usage history be saved (not yet implemented)

### rough breakdown:

- admin cipher add/remove (+)
- open usage of encryption/decryption with available ciphers (+)
- admin dashboard interface for managing ciphers (partely implemented)
- user interface for selecting cipher of choice and inputting text & key[s] for cryptography (+)
- user authentication / authorization ()
- admin authentication & securing admin routes ()
- user session/cookies to secure individual users' usage history ()
- user interface for viewing their usage history ()

## technologies

### backend

- nodejs, expressjs, mongodb, jwt, bcrypt, child_process, multer

### frontend

- reactjs, react-router, styled-components, picocss, axios, react-toastify
