import { genSalt, hash } from 'bcryptjs'
import { collection, addDoc } from 'firebase/firestore'
// import { colRef } from '../config'
import { store } from '../../store'

import { db } from '../config'

const setEncryptionKey = async (encryptionKey, userId) => {
    try {
        if (!encryptionKey) {
            throw new Error('Encryption key is required')
        }

        // const salt = await genSalt()
        const hashedEncryptionKey = await hash(encryptionKey, 10)

        addDoc(collection(db, 'encryptionKey'), {
            encryptionKey: hashedEncryptionKey,
            userId
        })

        // const colRef = collection(db, 'encryptionKey')
    } catch (error) {
        console.log(error)
        throw new Error('Error setting encryption key: ' + error.message)
    }

    // console.log('Password salt ', salt)

    // console.log(hashedEncryptionKey)
}

export default setEncryptionKey