import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type LogAction = 'CREATE_PRODUCT' | 'DELETE_PRODUCT' | 'UPDATE_PRODUCT' | 'LOGIN' | 'UPDATE_SETTINGS'| 'REGISTER';

export const saveLog = async (action: LogAction, details: string) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "logs"), {
      userId: user.uid,
      userName: user.displayName || user.email,
      action: action,
      details: details,
      ip: "internal", 
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Log kaydı başarısız:", error);
  }
};