import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSheet } from 'hooks/useSheets';
import LoaderComponent from "components/Loader/LoaderComponent";

const CueController = () => {
    const {spreadsheetId, sheetName} = useParams();
    const {sheet, loading} = useSheet(spreadsheetId, sheetName);
    console.log(sheet);

    if(loading){
        return <LoaderComponent />
    }
    
    return (
        <div>
            <h1>Cue Controller</h1>
        </div>
    );
};

export default CueController;