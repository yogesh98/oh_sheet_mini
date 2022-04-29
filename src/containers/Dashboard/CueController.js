import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

const CueController = () => {
    const params = useParams();
    const [password, setPassword] = useState(null);
    console.log(params);
    return (
        <div>
            <h1>Cue Controller</h1>
        </div>
    );
};

export default CueController;