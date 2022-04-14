import { useState, useEffect } from 'react';

export function useSheets(spreadsheetId) {
    const [sheets, setSheets] = useState(null);

    useEffect(() => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z1000?key=${process.env.REACT_APP_SHEETS_API_KEY}&alt=json`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            setSheets(data.values);
        });
    }, [spreadsheetId]);

  return {sheets};
}