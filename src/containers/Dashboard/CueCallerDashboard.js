import React, {useState} from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useSheets } from "hooks/useSheets";
import ModalComponent from "components/Modal/ModalComponent";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [sheetsUrl, setSheetsUrl] = useState(null);
  const { sheets } = useSheets();

  const parseGoogleSheet = () => {
    //1JQge7XYA8Mfe6yDhhwhSdUaYyOpwIv03FQOeHHJ9C3g
    sheets.setSheetsId(sheetsUrl);
    console.log(sheets);
    setShowAddModal(false);
  }
  
  const renderGoogleSheetsInput = () => {
    return (
      <div>
        <Form.Control 
          type="text" 
          placeholder="Sheets url" 
          onChange={e => setSheetsUrl( e.target.value)}
        />
      </div>
    );
  }
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Button onClick={() => setShowAddModal(true)} variant="primary">Add New</Button>
        <div className="d-flex align-items-center justify-content-center h-100 flex-wrap">
          <Card>
            <Card.Body>
                Under Construction
            </Card.Body>
          </Card>
        </div>
      </div>
      <ModalComponent show={showAddModal} onClose={() => setShowAddModal(false)} title="Enter public google sheets link" body={renderGoogleSheetsInput()} onAction={parseGoogleSheet}/>
    </>
  )
}