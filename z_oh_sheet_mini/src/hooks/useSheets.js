import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import {useDatabase} from './useDatabase';

export function useSheets() {
    const [sheets, setSheets] = useState([]);
    const { writeUserData, listenUserData } = useDatabase();
    const [loading, setLoading] = useState(true);
    const [sheetIds, setSheetIds] = useState([]);
    const toast = useToast();


    useEffect(() => {
        listenUserData('sheets', (ids) => setSheetIds(ids ? ids : []) );
    }, [listenUserData]);

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
            setLoading(false);
        }
    }, [sheetIds]);

    const removeSheet = (index) => () => {
        const s = [...sheets];
        s.splice(index, 1);
        writeUserData('sheets', s.map(sheet => sheet.spreadsheetId));
    }

    const addNewSheet = async (sheetUrl) => {
        if(sheetUrl){
            let spreadsheetId = sheetUrl.match(/[-\w]{25,}/);
            if(spreadsheetId === null){
                toast({
                    title: 'Invalid URL',
                    description: 'Please enter a valid Google Sheets URL',
                    position: "top-right",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            } else if (!sheetIds.includes(spreadsheetId[0])){
                spreadsheetId = spreadsheetId[0];
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z1000?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
                fetch(url).then(response => {
                    return response.json();
                }).then(data => {
                    if(data.error){
                        toast({
                            title: "Error fetching sheet.",
                            description: "Please check your url and be sure the sheet is public",
                            position: "top-right",
                            status: 'error',
                            duration: 2000,
                            isClosable: true,
                        })
                    } else {
                        writeUserData('sheets', sheetIds ? [...sheetIds, spreadsheetId] : [spreadsheetId]);
                        toast({
                            title: "Sheet Added.",
                            position: "top-right",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        })
                    }
                });
            } else {
                toast({
                    title: `Sheet already exists`,
                    position: "top-right",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
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
            const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:Z1000?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
            fetch(sheetUrl).then(response => {
                return response.json();
            }).then(data => {
                const spreadsheetDataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
                fetch(spreadsheetDataUrl).then(response => {
                    return response.json();
                }).then((spreadsheetData) => {
                    const sheetMergeData = spreadsheetData?.sheets?.find(sheet => sheet.properties.title === sheetName)?.merges;
                    let values = [...data.values];
                    if(sheetMergeData){
                        sheetMergeData.forEach((merges) => {
                            const {startRowIndex, endRowIndex, startColumnIndex, endColumnIndex} = merges;
                            for (let i = startRowIndex; i < endRowIndex; i++) {
                                for (let j = startColumnIndex; j < endColumnIndex; j++){
                                    let numDelete = 1;
                                    if(typeof values[i][j] === 'undefined'){
                                        numDelete = 0; 
                                    }
                                    values[i].splice(j, numDelete, data.values[startRowIndex][startColumnIndex]);
                                }
                            }
                        });
                    }
                    data.values = values;
                    setSheet(data);
                    setLoading(false);   
                });
            });
        }
        return () => setSheet(null);
    }, [spreadsheetId, sheetName]);

    return {sheet, loading};
}