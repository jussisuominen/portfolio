# Password Vault Vue/Firebase demo app

*Please do not store real passwords, usernames or any sensitive data in this app. This app is only for demonstration purposes. I have tried to make the app as secure as possible but I can not guarantee the security of this app. If you store real passwords, usernames or any sensitive data in this app, you do so at your own risk.*

*This app is a work in progress. It contains bugs and lags features and is not meant for production use.*

## Description
This is a password manager demo app built with Vue.js and Firebase. The main purpose of this app is to demonstrate my coding skills and to showcase my experience with Vue.js and Firebase. It can also be used for educational purposes and as a reference for building a password manager app. 

## Features
- User authentication using Firebase
- Password encryption and decryption using AES
- Password storage and retrieval from Firebase Firestore
- Password management features such as adding, editing, and deleting passwords
- Ability to generate passwords

## How to use
1. Clone the repository to your local machine
2. Install the required dependencies by running `npm install`
3. Set up a Firebase project and obtain the configuration object. If you don't know how to do this here is a Youtube video that will help you: https://www.youtube.com/watch?v=13eja_RYimU
4. Update the `src/firebase/config.js` file with your Firebase configuration.
5. Remember to enable authentication with email and password in your Firebase project.
6. Run the app using `npm run serve`

## Contributing
Contributions are welcome! If you contribute to this project I will add your name to the list of people that have contributed to this project. Please fork the repository, make your changes, and submit a pull request. You may also contribute to this project by reporting an issue.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
