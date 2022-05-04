import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useSheet } from 'hooks/useSheets';
import { useDatabase } from 'hooks/useDatabase';
import { useAuth } from "contexts/AuthContext";

import CueComponent from 'components/Cue/CueComponent';
import LoaderComponent from "components/Loader/LoaderComponent";
import { Button } from "react-bootstrap";


const CueController = () => {
    const { currentUser } = useAuth();
    const {spreadsheetId, sheetName} = useParams();
    const {sheet, loading} = useSheet(spreadsheetId, sheetName);
    const {writeCueData, getCueData} = useDatabase();

    const [cueData, setCueData] = useState(null);

    
    const resetCueData = useCallback(() => {
        let cueData = {};
        cueData['headers'] = sheet.values[0];
        cueData['previous'] = {};
        /* eslint-disable no-sequences */
        cueData['current'] = cueData['headers'].reduce((r, e, i) => (r[e]= sheet.values[1][i], r), {});
        cueData['next'] = cueData['headers'].reduce((r, e, i) => (r[e]= sheet.values[2][i], r), {});
        cueData['currentPtr'] = 1;
        cueData['command'] = 'reset';
        setCueData(cueData);
        // writeCueData(spreadsheetId, sheetName, cueData);
    }, [sheet]); //, writeCueData, spreadsheetId, sheetName]);

    useEffect(() => {
        getCueData(`${currentUser.uid}/${spreadsheetId}/${sheetName}`).then(data => {
            if(data){
                setCueData(data);
            } else if(sheet) {
                resetCueData();
            }
        });
    }, [spreadsheetId, sheetName, getCueData, sheet, currentUser.uid, resetCueData]);

    useEffect(() => {
        writeCueData(spreadsheetId, sheetName, cueData);
    }, [cueData, writeCueData, spreadsheetId, sheetName]);

    const nextCue = () => {
        let newCueData = {...cueData};
        newCueData['previous'] = cueData['current'];
        newCueData['current'] = cueData['next'];
        newCueData['currentPtr'] = cueData['currentPtr'] + 1;
        newCueData['command'] = 'next';
        newCueData['next'] = cueData['headers'].reduce((r, e, i) => (r[e]= sheet.values[newCueData['currentPtr'] + 1][i], r), {});
        if(typeof newCueData['next'].id === 'undefined') {
            newCueData['next'] = {};
        }
        setCueData(newCueData);
        // writeCueData(spreadsheetId, sheetName, cueData);
    }

    const prevCue = () => {
        let newCueData = {...cueData};
        newCueData['next'] = cueData['current'];
        newCueData['current'] = cueData['previous'];
        newCueData['currentPtr'] = cueData['currentPtr'] - 1;
        newCueData['command'] = 'previous';
        newCueData['previous'] = cueData['headers'].reduce((r, e, i) => (r[e]= sheet.values[newCueData['currentPtr'] - 1][i], r), {});
        if(typeof newCueData['previous'].id === 'undefined' || newCueData['currentPtr'] - 1 === 0) {
            newCueData['previous'] = {};
        }
        setCueData(newCueData);
        // writeCueData(spreadsheetId, sheetName, cueData);
    }


    if(loading || cueData === null) {
        return <LoaderComponent />
    }
    
    return (
        <div>
            <CueComponent key={cueData.previous?.id} cue={cueData.previous} />
            <CueComponent key={cueData.current?.id} cue={cueData.current} />
            <CueComponent key={cueData.next?.id} cue={cueData.next} />
            <Button onClick={() => resetCueData()}>Reset</Button>
            <Button onClick={() => prevCue()}>Prev</Button>
            <Button onClick={() => nextCue()}>Next</Button>
        </div>
    );
};

export default CueController;