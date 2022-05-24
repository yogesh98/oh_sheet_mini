import { useCallback } from 'react';
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { useAuth } from "contexts/AuthContext";

export function useDatabase() {
    const { currentUser } = useAuth();

    const writeUserData = async (path, data) => {
      const db = getDatabase();
      const userId = currentUser.uid;
      set(ref(db, `users/${userId}/${path}`), data);
    };
    
    const listenUserData = useCallback (async (path, updateFunction) => {
      const db = getDatabase();
      const userId = currentUser.uid;
      const userDataRef = ref(db, `users/${userId}/${path}`);
      onValue(userDataRef, (snapshot) => {
        const data = snapshot.val();
        updateFunction(data);
      });
    },[currentUser]);

    const writeServerData = async (spreadsheetId, path, data) => {
      const db = getDatabase();
      const userId = currentUser.uid;
      set(ref(db, `server/${userId}/${spreadsheetId}/${path}`), data);
    };

    const listenServerData = useCallback (async (path, updateFunction) => {
      const db = getDatabase();
      const cueDataRef = ref(db, `server/${path}`);
      onValue(cueDataRef, (snapshot) => {
        const data = snapshot.val();
        updateFunction(data);
      });
    },[]);

    const getServerData = useCallback (async (path) => {
      const db = getDatabase();
      const cueDataRef = ref(db, `server/${path}`);
      return get(cueDataRef).then(snapshot => {
        return snapshot.val();
      });
    },[]);



  return {writeUserData, listenUserData, writeServerData, listenServerData, getServerData};
}