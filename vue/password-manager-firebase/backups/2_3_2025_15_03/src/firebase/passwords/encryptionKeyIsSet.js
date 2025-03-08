import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config'

export const encryptionKeyIsSet = async (userId) => {
    console.log('Checking if user with id ' + userId + ' has an encryption key set')
    const q = query(collection(db, 'encryptionKey'), where("userId", "==", userId))
  const querySnapshot = await getDocs(q)
  console.log('Query snapshot size: ' + querySnapshot.size)
//   console.log(querySnapshot.docs[0].data())
  return querySnapshot.size > 0
}