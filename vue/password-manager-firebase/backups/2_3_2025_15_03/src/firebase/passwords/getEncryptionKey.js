import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config'

export const getEncryptionKey = async (userId) => {
    const q = query(collection(db, 'encryptionKey'), where("userId", "==", userId))
  const querySnapshot = await getDocs(q)
  console.log('Query snapshot size: ' + querySnapshot.size)
//   console.log(querySnapshot.docs[0].data())
  return querySnapshot.docs ? querySnapshot.docs[0].data().encryptionKey : null
}