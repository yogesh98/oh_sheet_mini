import React from "react";
import { Card, Button } from "react-bootstrap";
// import { useSheets } from "hooks/useSheets";

export default function Dashboard() {
  // const { sheets } = useSheets('1JQge7XYA8Mfe6yDhhwhSdUaYyOpwIv03FQOeHHJ9C3g');
  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex align-items-center justify-content-center h-100 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Card>
          <Card.Body>
              Under Construction
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}