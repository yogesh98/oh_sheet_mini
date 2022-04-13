import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap"

export default function Dashboard() {

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex align-items-center justify-content-center h-100 flex-wrap" fluid>
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