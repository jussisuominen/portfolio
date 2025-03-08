import CryptoJS from 'crypto-js'
import { addDoc } from 'firebase/firestore';
import { colRef } from '../config';

const addPassword = async (owner, passwordName, username, password, encryptionKey) => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();

    //console.log(encryptedPassword)

    const addedDoc = await addDoc(colRef, {
        passwordName,
        username,
        password: encryptedPassword,
        owner
    })
    // .then(() => console.log('Password added successfully!'))
    // .catch((error) => console.log(error))

    return addedDoc
}

export default addPassword