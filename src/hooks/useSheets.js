import { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import {useDatabase} from './useDatabase';

export function useSheets() {
    const [sheets, setSheets] = useState([]);
    const { writeUserData, readUserData } = useDatabase();
    const [loading, setLoading] = useState(true);
    const [sheetIds, setSheetIds] = useState(null);

    useEffect(() => {
        readUserData('sheets', setSheetIds);
    }, [readUserData]);

    useEffect(() => {
        if(sheetIds){
            setLoading(true);
            const s = sheetIds.map( spreadsheetId  => {
                const infoUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
                return fetch(infoUrl).then(response => {
                    return response.json();
                })
                .then(data => {
                    return data;
                });
            });
            Promise.all(s).then(values => {
                setSheets(values);
                setLoading(false);
            });
        } else {
            setSheets([]);
        }
    }, [sheetIds]);

    const removeSheet = (index) => () => {
        const s = [...sheets];
        s.splice(index, 1);
        writeUserData('sheets', s.map(sheet => sheet.spreadsheetId));
    }

    const addNewSheet = async (sheetUrl) => {
        if(sheetUrl){
            try {
                const spreadsheetId = sheetUrl.match(/[-\w]{25,}/)[0];
                if(!sheetIds.includes(spreadsheetId)){
                    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z1000?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
                    fetch(url).then(response => {
                        return response.json();
                    }).then(data => {
                        writeUserData('sheets', sheetIds ? [...sheetIds, spreadsheetId] : [spreadsheetId]);
                    });
                } else {
                    toast.error('Sheet already exists');
                }
            } catch (exception) {
                console.error(exception);
                toast.error("error fetching sheet, please check your url");
            }
        }
    };

  return {sheets, addNewSheet, removeSheet, loading};
}


export function useSheet(spreadsheetId, sheetName) {
    const [sheet, setSheet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(spreadsheetId && sheetName){
            setLoading(true);
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:Z1000?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
            fetch(url).then(response => {
                return response.json();
            }).then(data => {                
                setSheet(data);
                setLoading(false);
            });
        }
    }, [spreadsheetId, sheetName]);

    return {sheet, loading};
}