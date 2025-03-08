import { compare } from 'bcryptjs'
import CryptoJS from 'crypto-js'

import { collection, getDocs, query, where } from 'firebase/firestore'

import { colRef, db } from '../config'
import setEncryptionKey from './setEncryptionKey'
import { getEncryptionKey } from './getEncryptionKey'

const loadPasswords = async (encryptionKey, userId) => {
    // Get passwords from Firebase Firestore and try to decrypt the passwords.
    // console.log('loadPasswords(' + encryptionKey + ')')

    // Check if the encryption key is correct. 
    // Encryption key is stored in Firestore collection called "encryptionKey" 
    // in hashed form so the stored encryption key is itself encrypted for improved security. So to check if 
    // the encryption key is correct we must first get the encryption key data from Firestore and then use
    // the compareSync function of the "bcryptjs" library to check if the encryption key is correct. 
    let snapshot = await getDocs(collection(db, 'encryptionKey'))

    //console.log(snapshot)

    if(snapshot.docs.length === 0) {
        // console.log('Encryption key is not set! Setting it now.')
        setEncryptionKey(encryptionKey)
    } else {
        // console.log('Encryption key is set!')
        const hashedEncryptionKey = await getEncryptionKey(userId)

        // Check if the encryption key is correct.
        if(await compare(encryptionKey, hashedEncryptionKey)) {
            // alert('Encryption key is correct.')
        } else {
            alert('Encryption key is wrong.')
            return null
        }
    }

    // Get the user's passwords from the database and store them in a variable named "passwords"
    const q = query(collection(db, 'passwords'), where('owner', '==', userId))

    snapshot = await getDocs(q)
    // console.log(snapshot)

    let passwords = []

    // Store Firebase documents (passwords) to the passwords array.
    snapshot.docs.forEach(doc => passwords.push({ ...doc.data(), id: doc.id }))

    // Cycle through each password and try to decrypt them.
    for (let i = 0; i < passwords.length; i++) {
        // console.log('Decrypting password', i)

        // Decrypt the password field.
        const decryptedPassword =
            CryptoJS.AES.decrypt(passwords[i].password, encryptionKey).toString(CryptoJS.enc.Utf8)

        passwords[i].password = decryptedPassword
    }

    //console.log(passwords)

    return passwords
}

export default loadPasswords