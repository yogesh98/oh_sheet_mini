import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from "contexts/AuthContext";

export function useDatabase() {
    const { currentUser } = useAuth();
    const [db, setDb] = useState(null);

    useEffect(() => {
        setDb(getDatabase());
    }, []);

    const writeUserData = async (data) => {
        const userId = currentUser.uid;
        set(ref(db, `users/${userId}`), data);
    };
    
    const readUserData = async (path, updateFunction) => {
        const userDataRef = ref(db, path);
        onValue(userDataRef, (snapshot) => {
          const data = snapshot.val();
          updateFunction(data);
        });
    };

  return {writeUserData, readUserData};
}