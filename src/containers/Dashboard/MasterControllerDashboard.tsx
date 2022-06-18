import {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useSheet } from 'hooks/useSheets';
import { useDatabase } from 'hooks/useDatabase';
import { useAuth } from "contexts/AuthContext";

import { BsChevronRight, BsChevronLeft} from "react-icons/bs";


import { CueCarouselComponent } from 'components/Cue/CueCarouselComponent';
import LoaderComponent from "components/Loader/LoaderComponent";

import {
  ICue,
  ICueData,
  isCueData,
} from "types/types";
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { DragHandleIcon, InfoIcon, LinkIcon, RepeatClockIcon, RepeatIcon } from '@chakra-ui/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useAppSelector } from 'hooks/hooks';
import { useAppDispatch } from 'hooks/hooks';
import { setLayouts } from 'store/cueLayoutsSlice';


export interface IMasterControllerDashboardProps {
}

export default function MasterControllerDashboard (props: IMasterControllerDashboardProps) {
  const { currentUser } = useAuth();
  const toast = useToast();
  const {spreadsheetId, sheetName} = useParams();
  const {sheet, loading} = useSheet(spreadsheetId, sheetName);
  const {writeServerData, getServerData} = useDatabase();
  const cueLayoutsSlice = useAppSelector(state => state.cueLayouts);
  console.log(cueLayoutsSlice);
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const [serverData, setServerData] = useState<ICueData>({
    header: "",
    title: "",
    subtitle: "",
    cues: [],
    currentPtr: 0,
  });

  const updateServerData = useCallback((data: ICueData) => {
    console.log("updateServerData", data);
    setServerData(data);
    writeServerData(spreadsheetId, sheetName, data);
  }, [spreadsheetId, sheetName, writeServerData]);

  const resetServerData = () => {
    let newServerData: ICueData = {
      header: "",
      title: "",
      subtitle: "",
      cues: [],
      currentPtr: 0,
    };

    if (sheet) {
      let values: any[] = sheet['values'];
      let headers = values[3];
      let cues: ICue[] = values.slice(4,-1).map((cue: any[]) => {
          let cueData: ICue = {};
          for (let i = 0; i < headers.length; i++) {
            cueData[headers[i]] = cue[i];
          }
          return cueData;
        }
      );


      newServerData = {
        header: values[0][0],
        title: values[1][0],
        subtitle: values[2][0],
        cues: cues,
        currentPtr: 0,
      }; 
    }
    updateServerData(newServerData);
  }

  const nextCue = () => {
    console.log("nextCue");
    let newServerData: ICueData = {...serverData};
    let nextCue = newServerData.cues[newServerData.currentPtr + 1];
    if (nextCue) {
      newServerData.currentPtr++;
    } else {
      newServerData.currentPtr = -1;
    }
    updateServerData(newServerData);
  }

  const prevCue = () => {
    console.log("prevCue");
    let newServerData: ICueData = {...serverData};
    let prevCue = newServerData.cues[newServerData.currentPtr - 1];
    if (prevCue) {
      newServerData.currentPtr--;
    } else {
      newServerData.currentPtr = 0;
    }
    updateServerData(newServerData);
  }

  useEffect(() => {
    getServerData(`${currentUser.uid}/${spreadsheetId}/${sheetName}`).then((data : ICueData) => {
      console.log("getServerData", data);
      if(isCueData(data)) {
        setServerData(data);
      } else {
        resetServerData();
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading) {
    return <LoaderComponent />
  }

  return (
    <>
      <Flex id='master_control_dashboard_box' m={2} h="100%" maxH={"100%"}  direction={'column'}>
        <Flex mb={2} justifyContent="space-between">
            <Box>
              <Tooltip label="Open Layout Builder">
                <Button mx={2} onClick={onToggle}><DragHandleIcon /></Button>
              </Tooltip>
              <Button mx={2} onClick={() => dispatch(setLayouts({}))}><RepeatIcon /></Button>
            </Box>
            <Box>
              <Button mx={2} onClick={resetServerData}><RepeatClockIcon /></Button>
              <CopyToClipboard text={window.location.origin+encodeURI(`/viewer/cues/${currentUser.uid}/${spreadsheetId}/${sheetName}`)}>
                  <Button mx={2} onClick={() => toast({
                      title: `Copied to clipboard`,
                      position: "top-right",
                      duration: 2000,
                      isClosable: true,
                  })}><LinkIcon /></Button>
              </CopyToClipboard>
            </Box>
        </Flex>
        <Flex maxH={"100%"} justifyContent="space-between" alignItems="center" flexGrow={1}>
            <Button mx={2} onClick={prevCue}><BsChevronLeft /></Button>
            <CueCarouselComponent cues={serverData.cues} currentPtr={serverData.currentPtr} />
            <Button mx={2} onClick={nextCue}><BsChevronRight /></Button>
        </Flex>
      </Flex>
      <Modal onClose={onToggle} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Layout Builder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            testing
          </ModalBody>
          <ModalFooter>
            <Button onClick={onToggle}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
