import {useState, useEffect} from 'react';
import { useDatabase } from 'hooks/useDatabase';
import { useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { CueCarouselComponent } from 'components/Cue/CueCarouselComponent';
import {
  ICueData,
} from "types/types";

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

  useEffect(() => {
    listenServerData(`${uid}/${spreadsheetId}/${sheetName}`, setServerData);
}, [listenServerData, setServerData, uid, spreadsheetId, sheetName]);


  return (
    <Flex id='viewer_dashboard_box' m={2} h="100%" maxH={"100%"}  direction={'column'}>
        <Flex maxH={"100%"} justifyContent="space-between" alignItems="center" flexGrow={1}>
            <CueCarouselComponent cues={serverData.cues} currentPtr={serverData.currentPtr} />
        </Flex>
    </Flex>
  );
}
