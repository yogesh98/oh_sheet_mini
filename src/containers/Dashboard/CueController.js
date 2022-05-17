import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useSheet } from 'hooks/useSheets';
import { useDatabase } from 'hooks/useDatabase';
import { useAuth } from "contexts/AuthContext";

import { Button } from "react-bootstrap";

import CueComponent from 'components/Cue/CueComponent';
import LoaderComponent from "components/Loader/LoaderComponent";
// import VoiceChannelComponent from 'components/VoiceChannel/VoiceChannelComponent';


const CueController = () => {
    const { currentUser } = useAuth();
    const {spreadsheetId, sheetName} = useParams();
    const {sheet, loading} = useSheet(spreadsheetId, sheetName);
    const {writeServerData, getServerData} = useDatabase();

    const [serverData, setServerData] = useState(null);

    
    const resetServerData = useCallback(() => {
        let newServerData = {};
        newServerData['headers'] = sheet.values[0];
        newServerData['previous'] = {};
        /* eslint-disable no-sequences */
        newServerData['current'] = newServerData['headers'].reduce((r, e, i) => (r[e]= sheet.values[1][i], r), {});
        newServerData['next'] = newServerData['headers'].reduce((r, e, i) => (r[e]= sheet.values[2][i], r), {});
        newServerData['currentPtr'] = 1;
        newServerData['command'] = 'reset';
        setServerData(newServerData);
        // writeServerData(spreadsheetId, sheetName, serverData);
    }, [sheet]); //, writeServerData, spreadsheetId, sheetName]);

    useEffect(() => {
        getServerData(`${currentUser.uid}/${spreadsheetId}/${sheetName}`).then(data => {
            if(data){
                setServerData(data);
            } else if(sheet) {
                resetServerData();
            }
        });
    }, [spreadsheetId, sheetName, getServerData, sheet, currentUser.uid, resetServerData]);

    useEffect(() => {
        writeServerData(spreadsheetId, sheetName, serverData);
    }, [serverData, writeServerData, spreadsheetId, sheetName]);

    const nextCue = () => {
        let newServerData = {...serverData};
        newServerData['previous'] = serverData['current'];
        newServerData['current'] = serverData['next'];
        newServerData['currentPtr'] = serverData['currentPtr'] + 1;
        newServerData['command'] = 'next';
        newServerData['next'] = serverData['headers'].reduce((r, e, i) => (r[e]= sheet.values[newServerData['currentPtr'] + 1][i], r), {});
        if(typeof newServerData['next'].id === 'undefined') {
            newServerData['next'] = {};
        }
        setServerData(newServerData);
        // writeServerData(spreadsheetId, sheetName, serverData);
    }

    const prevCue = () => {
        let newCueData = {...serverData};
        newCueData['next'] = serverData['current'];
        newCueData['current'] = serverData['previous'];
        newCueData['currentPtr'] = serverData['currentPtr'] - 1;
        newCueData['command'] = 'previous';
        newCueData['previous'] = serverData['headers'].reduce((r, e, i) => (r[e]= sheet.values[newCueData['currentPtr'] - 1][i], r), {});
        if(typeof newCueData['previous'].id === 'undefined' || newCueData['currentPtr'] - 1 === 0) {
            newCueData['previous'] = {};
        }
        setServerData(newCueData);
        // writeServerData(spreadsheetId, sheetName, serverData);
    }


    if(loading || serverData === null) {
        return <LoaderComponent />
    }
    
    return (
        <div>
            <CueComponent key={serverData.previous?.id} cue={serverData.previous} />
            <CueComponent key={serverData.current?.id} cue={serverData.current} />
            <CueComponent key={serverData.next?.id} cue={serverData.next} />
            <Button onClick={() => resetServerData()}>Reset</Button>
            <Button onClick={() => prevCue()}>Prev</Button>
            <Button onClick={() => nextCue()}>Next</Button>
            <Button onClick={() => nextCue()}>Countdown</Button>
            <div>{serverData.countdown}</div>
            {/* <VoiceChannelComponent /> */}
        </div>
    );
};

export default CueController;