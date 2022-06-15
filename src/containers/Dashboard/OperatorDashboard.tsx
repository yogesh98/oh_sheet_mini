import React, {useState, useEffect} from 'react';
import { useDatabase } from 'hooks/useDatabase';
import { useParams } from 'react-router-dom';
import { Collapse, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { CueCarouselComponent } from 'components/Cue/CueCarouselComponent';
import {
  ICueData,
} from "types/types";
import { IoCall } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

export interface IOperatorDashboardProps {
}

export default function OperatorDashboard (props: IOperatorDashboardProps) {
  const [serverData, setServerData] = useState<ICueData>({
    header: "",
    title: "",
    subtitle: "",
    cues: [],
    currentPtr: 0,
  });  
  const {listenServerData} = useDatabase();
  const {uid, spreadsheetId, sheetName} = useParams();
  const { isOpen: isVCTrayOpen, onToggle: onToggleVCTray } = useDisclosure();

  useEffect(() => {
    listenServerData(`${uid}/${spreadsheetId}/${sheetName}`, setServerData);
}, [listenServerData, setServerData, uid, spreadsheetId, sheetName]);


  return (
    <Flex id='viewer_dashboard_box' m={2} h="100%" maxH={"100%"}  direction={'column'}>
        <Flex maxH={"100%"} justifyContent="space-between" alignItems="center" flexGrow={1}>
            <CueCarouselComponent flex={1} cues={serverData.cues} currentPtr={serverData.currentPtr} />
        </Flex>
        <Flex maxH="150" justifyContent="space-between" alignItems="center">
            <Collapse startingHeight={20} in={isVCTrayOpen}>
                <Flex w="100vw" h="100" justifyContent="center" alignItems="center">
                    PUT VC COMPONENT HERE
                </Flex>
            </Collapse>
            <IconButton aria-label='toggle VC bar' onClick={onToggleVCTray} icon={ !isVCTrayOpen ? <Icon as={IoCall} /> : <CloseIcon /> } />
        </Flex>
    </Flex>
  );
}
