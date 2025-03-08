import CryptoJS from 'crypto-js'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

const updatePassword = async (passwordId, newPassword, encryptionKey) => {
    // console.log(encryptionKey)
    
    // Encrypt password with AES encryption.
    const encryptedPassword = CryptoJS.AES.encrypt(newPassword, encryptionKey).toString();

    // console.log(encryptedPassword)

    // Store the password to Firestore database.
    const passwordRef = doc(db, 'passwords', passwordId)

    updateDoc(passwordRef, {
        password: encryptedPassword
    }).then(() => console.log('Password updated successfully!'))
}

export default updatePassword