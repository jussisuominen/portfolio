onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in.')
        loginForm.style.display = 'none'
        encryptionKeyForm.style.display = 'block'
    } else {
        console.log('User is signed out.')
        loginForm.style.display = 'block'
        encryptionKeyForm.style.display = 'none'
        passwordsView.style.display = 'none'
    }
})