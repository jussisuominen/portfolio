import { doc, deleteDoc } from "firebase/firestore";

import { db } from "../config";

const deletePassword = async (passwordId) => {
    await deleteDoc(doc(db, "passwords", passwordId))
}

export default deletePassword