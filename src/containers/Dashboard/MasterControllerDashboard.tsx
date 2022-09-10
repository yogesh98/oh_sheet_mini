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
import { Box, Button, Flex, useToast, Tooltip } from '@chakra-ui/react';
import { LinkIcon, RepeatClockIcon, RepeatIcon, SmallCloseIcon, WarningIcon } from '@chakra-ui/icons';
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
  const dispatch = useAppDispatch();

  const [serverData, setServerData] = useState<ICueData>({
    header: "",
    title: "",
    subtitle: "",
    cues: [],
    currentPtr: 0,
    standBy: false,
  });

  const updateServerData = useCallback((data: ICueData) => {
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
      standBy: false,
    };

    if (sheet) {
      console.log(sheet);
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
        standBy: false,
      }; 
    }
    updateServerData(newServerData);
  }

  const nextCue = useCallback(() => {
    let newServerData: ICueData = {...serverData};
    newServerData.standBy = false;
    let nextCue = newServerData.cues[newServerData.currentPtr + 1];
    if (nextCue) {
      newServerData.currentPtr++;
    } else {
      newServerData.currentPtr = -1;
    }
    updateServerData(newServerData);
  }, [serverData, updateServerData]);

  const prevCue = useCallback(() => {
    let newServerData: ICueData = {...serverData};
    newServerData.standBy = false;
    let prevCue = newServerData.cues[newServerData.currentPtr - 1];
    if (prevCue) {
      newServerData.currentPtr--;
    } else {
      newServerData.currentPtr = 0;
    }
    updateServerData(newServerData);
  }, [serverData, updateServerData]);

  const standBy = useCallback(() => {
    let newServerData: ICueData = {...serverData};
    newServerData.standBy = !newServerData.standBy;
    updateServerData(newServerData);
  }, [serverData, updateServerData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "d") {
        nextCue();
      } else if (event.key === "ArrowLeft" || event.key === "a") {
        prevCue();
      } else if (event.key === "ArrowUp" || event.key === "w") {
        standBy();
      }
    };
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextCue, prevCue, standBy]);

  useEffect(() => {
    if(sheet){
      getServerData(`${currentUser.uid}/${spreadsheetId}/${sheetName}`).then((data : ICueData) => {
        if(isCueData(data) && data.cues) {
          setServerData(data);
        } else {
          resetServerData();
        }
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheet]);

  if(loading) {
    return <LoaderComponent />
  }

  return (
    <>
      <Flex id='master_control_dashboard_box' m={2} h="100%" maxH={"100%"}  direction={'column'}>
        <Flex mb={2} justifyContent="space-between">
            <Box>
              <Tooltip label="Reset Layout">
                <Button mx={2} onClick={() => dispatch(setLayouts({}))}><RepeatIcon /></Button>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip label="Reset Cues">
                <Button mx={2} onClick={resetServerData}><RepeatClockIcon /></Button>
              </Tooltip>
              <Tooltip label="Copy Operator Dashboard">
                <Button mx={2} onClick={() => {
                  navigator.clipboard.writeText(window.location.origin+encodeURI(`/viewer/cues/${currentUser.uid}/${spreadsheetId}/${sheetName}`));
                  toast({
                      title: `Copied to clipboard`,
                      position: "top-right",
                      duration: 2000,
                      isClosable: true,
                  });
                }}>
                    <LinkIcon />
                </Button>
              </Tooltip>
            </Box>
        </Flex>
        <Flex maxH={"100%"} justifyContent="space-between" alignItems="center" flexGrow={1}>
            <Button mx={2} onClick={prevCue}><BsChevronLeft /></Button>
            <CueCarouselComponent cues={serverData.cues} currentPtr={serverData.currentPtr} standBy={serverData.standBy} />
            <Flex direction={"column"}>
              <Tooltip label="Stand By">
                <Button mx={2} onClick={standBy}>{serverData.standBy ? <SmallCloseIcon /> : <WarningIcon />}</Button>
              </Tooltip>
              <Button m={2} onClick={nextCue}><BsChevronRight /></Button>
            </Flex>
        </Flex>
      </Flex>
    </>
  );
}
