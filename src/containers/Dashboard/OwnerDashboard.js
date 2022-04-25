import React, {useState} from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useSheets } from "hooks/useSheets";
import ModalComponent from "components/Modal/ModalComponent";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSheetUrl, setNewSheetUrl] = useState(null);
  const { sheets, addNewSheet, removeSheet } = useSheets();

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

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Button onClick={() => setShowAddModal(true)} variant="primary">Add New</Button>
        <div className="d-flex align-items-center justify-content-center h-100 flex-wrap">
          {sheets ? sheets.map((sheet, index) => {
              return (
                <Card key={sheet.id}>
                  <Card.Body>
                    <Card.Title>{sheet.title}</Card.Title>
                    <Card.Text>{sheet.description}</Card.Text>
                    <Button onClick={removeSheet(index)} variant="primary">remove</Button>
                  </Card.Body>
                </Card>
              );
            })
          : null}
          {/*<Card>
            <Card.Body>
                Under Construction
            </Card.Body>
        </Card>*/}
        </div>
      </div>
      <ModalComponent show={showAddModal} onClose={() => setShowAddModal(false)} title="Enter public google sheets link" body={renderGoogleSheetsInput()} onAction={parseGoogleSheet}/>
    </>
  )
}