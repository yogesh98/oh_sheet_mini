import React from 'react';
import { Card } from "react-bootstrap";


const CueComponent = ({cue, displayHeaders}) => {
    if(typeof cue === 'undefined') {
        return (
            <div className="m-2 d-flex align-items-center justify-content-center">
                <Card >
                    <Card.Title>No Cue</Card.Title>
                </Card>
            </div>
        );
    }
    const headers = displayHeaders ? displayHeaders : Object.keys(cue);
    return (
        <div className="m-2 d-flex align-items-center justify-content-center">
            <Card >
                <Card.Title>{cue.id}: {cue.name}</Card.Title>
                <Card.Body>
                    {headers.map((header, index) => {
                        return (
                            <div key={index}>
                                <span>{header}: {cue[header]}</span>
                            </div>
                        )
                    })}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CueComponent;