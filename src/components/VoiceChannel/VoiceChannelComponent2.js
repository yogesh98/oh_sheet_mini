/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"

import { Button, InputGroup, FormControl } from "react-bootstrap";


const socket = io.connect(process.env.REACT_APP_SIGNALING_SERVER);

export default function VoiceChannelComponent() {
	const [ id, setId ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const localStreamRef = useRef()
	const remoteStreamRef = useRef()
	const connectionRef= useRef()

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				localStreamRef.current.srcObject = stream
		})

		socket.on("id", (id) => {
			setId(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = () => {
		console.log("callUser");
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			console.log("signal");

			socket.emit("callUser", {
				userToCall: idToCall,
				signalData: data,
				from: id,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			console.log("stream");
			remoteStreamRef.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			console.log("callAccepted");
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		console.log("answer call");
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			console.log("signal")
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			console.log("stream");
			remoteStreamRef.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={localStreamRef} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={remoteStreamRef} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<CopyToClipboard text={id} style={{ marginBottom: "2rem" }}>
					<Button>
						Copy ID
					</Button>
				</CopyToClipboard>

				<InputGroup className="mb-3">
					<FormControl
					placeholder="Recipient's id"
					aria-label="Recipient's id"
					aria-describedby="basic-addon2"
					onChange={(e) => setIdToCall(e.target.value)}
					/>
				</InputGroup>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<Button onClick={callUser}>
							Call
						</Button>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</>
	)
}