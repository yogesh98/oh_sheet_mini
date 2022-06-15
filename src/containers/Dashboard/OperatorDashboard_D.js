import React, {useState, useEffect} from 'react';
import { useDatabase } from 'hooks/useDatabase';
import { useParams } from 'react-router-dom';

import CueComponent from 'components/Cue/CueComponent';
import LoaderComponent from 'components/Loader/LoaderComponent';
import nextSound from 'assets/next.mp3';
import prevSound from 'assets/prev.mp3';
import resetSound from 'assets/reset.mp3';

const OperatorDashboard = () => {
    const [cueData, setCueData] = useState({});
    const {listenServerData} = useDatabase();
    const {uid, spreadsheetId, sheetName} = useParams();

    useEffect(() => {
        listenServerData(`${uid}/${spreadsheetId}/${sheetName}`, setCueData);
    }, [listenServerData, setCueData, uid, spreadsheetId, sheetName]);

    useEffect(() => {
        if(cueData.command === 'next'){
            var nextAudio = new Audio(nextSound);
            nextAudio.play();
        } else if (cueData.command === 'previous'){
            var prevAudio = new Audio(prevSound);
            prevAudio.play();
        } else if (cueData.command === 'reset'){
            var resetAudio = new Audio(resetSound);
            resetAudio.play();
        }
    }, [cueData]);

    if(cueData === {}) {
        return <LoaderComponent />;
    }

    return (
        <div>
            <CueComponent key={cueData.previous?.id} cue={cueData.previous} />
            <CueComponent key={cueData.current?.id} cue={cueData.current} />
            <CueComponent key={cueData.next?.id} cue={cueData.next} />
        </div>
    )
}

export default OperatorDashboard;