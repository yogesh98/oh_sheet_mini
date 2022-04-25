import { useCallback } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from "contexts/AuthContext";

export function useDatabase() {
    const { currentUser } = useAuth();

    const writeUserData = async (path, data) => {
      const db = getDatabase();
      const userId = currentUser.uid;
      set(ref(db, `users/${userId}/${path}`), data);
    };
    
    const readUserData = useCallback (async (path, updateFunction) => {
      const db = getDatabase();
      const userId = currentUser.uid;
      const userDataRef = ref(db, `users/${userId}/${path}`);
      onValue(userDataRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        updateFunction(data);
      });
    },[currentUser]);

  return {writeUserData, readUserData};
}