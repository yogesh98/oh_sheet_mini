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
        // console.log(data);
        updateFunction(data);
      });
    },[currentUser]);

    const writeCueData = async (spreadsheetId, path, data) => {
      const db = getDatabase();
      const userId = currentUser.uid;
      set(ref(db, `cues/${userId}/${spreadsheetId}/${path}`), data);
    };

    const listenCueData = useCallback (async (path, updateFunction) => {
      const db = getDatabase();
      const cueDataRef = ref(db, `cues/${path}`);
      onValue(cueDataRef, (snapshot) => {
        const data = snapshot.val();
        updateFunction(data);
      });
    },[]);

    const getCueData = useCallback (async (path) => {
      const db = getDatabase();
      const cueDataRef = ref(db, `cues/${path}`);
      return get(cueDataRef).then(snapshot => {
        return snapshot.val();
      });
    },[]);



  return {writeUserData, listenUserData, writeCueData, listenCueData, getCueData};
}