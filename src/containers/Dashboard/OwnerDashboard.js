import React, {useState} from "react";
import { useSheets } from "hooks/useSheets";

import { Card, Button, Form } from "react-bootstrap";
import ModalComponent from "components/Modal/ModalComponent";
import { Link } from "react-router-dom";
import LoaderComponent from "components/Loader/LoaderComponent";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSheetUrl, setNewSheetUrl] = useState(null);
  const [openSheets, setOpenSheets] = useState({});

  const { sheets, addNewSheet, removeSheet, loading } = useSheets();

  const parseGoogleSheet = () => {
    addNewSheet(newSheetUrl);
    setShowAddModal(false);
  }
  
  const renderGoogleSheetsInput = () => {
    return (
      <div>
        <Form.Control
          type="text" 
          placeholder="Sheets url" 
          onChange={e => setNewSheetUrl(e.target.value)}
        />
      </div>
    );
  }

  const toggleSheeet = (spreadsheetId) => () => {
    if(openSheets[spreadsheetId]) {
      setOpenSheets({...openSheets, [spreadsheetId]: false});
    } else {
      setOpenSheets({...openSheets, [spreadsheetId]: true});
    }
  }

  if(loading){
    return <LoaderComponent />
  }


  return (
    <div className="m-2">
      <div className="d-flex mb-2 justify-content-end">
        <Button className="mx-2" onClick={() => window.open("https://docs.google.com/spreadsheets/d/1JgIruQzCnb0RwIHjSZIkH_9cO_w8sNDozXp0FKNPHFE/template/preview")}>Create From Template</Button>
        <Button className="mx-2" onClick={() => setShowAddModal(true)}>Add new sheet</Button>
      </div>
      <div className="overflow-auto">
        {sheets.length > 0 ? sheets.map((sheet, index) => {
          return (
            <Card onClick={toggleSheeet(sheet.spreadsheetId)} className="mb-2" key={sheet.spreadsheetId}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title>{sheet.properties.title}</Card.Title>
                  <div>
                    <Button onClick={toggleSheeet(sheet.spreadsheetId)} variant="primary">{openSheets[sheet.spreadsheetId] ? 'Close' : 'Open' }</Button>
                    <Button onClick={removeSheet(index)} variant="Danger">remove</Button>
                  </div>
                </div>
                {/* openSheets[sheet.spreadsheetId] && <iframe src={`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}/edit#gid=0`} width="100%" height="500px" frameBorder="0"></iframe> */}
                {openSheets[sheet.spreadsheetId] ? 
                  <div className="d-flex flex-column"> 
                    {sheet.sheets.map((page, index) => {
                      if(page.properties.title === "Instructions") {
                        return null;
                      }
                      return (
                        <div key={index}>
                          <Link to={`/owner/master/${sheet.spreadsheetId}/${page.properties.title}`}>{page.properties.title}</Link>
                        </div>
                      )
                    })}
                  </div>
                : null}
              </Card.Body>
            </Card>
          );
        })
        : <div>Add sheets to begin</div>}
      </div>
      <ModalComponent show={showAddModal} onClose={() => setShowAddModal(false)} title="Enter public google sheets link" body={renderGoogleSheetsInput()} onAction={parseGoogleSheet}/>
    </div>
  )
}