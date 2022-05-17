import React, { useEffect, useState } from 'react';

import { Button, InputGroup, FormControl } from "react-bootstrap";


import { useVoiceChannel } from 'hooks/useVoiceChannel';

export default function VoiceChannelComponent() {
    const { myVideo, userVideo, stream, callAccepted, callEnded, me, callUser, answerCall, call } = useVoiceChannel();
    const [idToCall, setIdToCall] = useState('');

    return (
        <div>VoiceChannelComponent <div> {me} </div>
            {stream ? <video autoPlay muted playsInline ref={myVideo} /> : null}
            {callAccepted && !callEnded ? <video autoPlay playsInline ref={userVideo} /> : null}
            <Button onClick={() => {
                callUser(idToCall);
                console.log(idToCall);
            }}>Call</Button>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setIdToCall(e.target.value)}
                />
            </InputGroup>
            {!callAccepted && call.isReceivingCall ? <Button onClick={answerCall}>Answer</Button> : null}
        </div>
    )
}
