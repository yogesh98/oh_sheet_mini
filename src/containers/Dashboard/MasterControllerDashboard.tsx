import {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useSheet } from 'hooks/useSheets';
import { useDatabase } from 'hooks/useDatabase';
import { useAuth } from "contexts/AuthContext";

import { Button } from "react-bootstrap";
import { BsChevronRight, BsChevronLeft} from "react-icons/bs";


import { CueCarouselComponent } from 'components/Cue/CueCarouselComponent';
import LoaderComponent from "components/Loader/LoaderComponent";

import {
  ICue,
  ICueData,
  isCueData,
} from "types/types";

export interface IMasterControllerDashboardProps {
}

export default function MasterControllerDashboard (props: IMasterControllerDashboardProps) {
  const { currentUser } = useAuth();
  const {spreadsheetId, sheetName} = useParams();
  const {sheet, loading} = useSheet(spreadsheetId, sheetName);
  const {writeServerData, getServerData} = useDatabase();

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
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-12">
          <div className="h-100 d-flex flex-column">
            <div className="row justify-content-center">
              <div className='col-sm-1'>
                {/* PUT COUNTDOWN COMPONENT HERE */}
              </div>
              <div className='col-sm-10'>
                <div className='row justify-content-center'>
                  {/* {<div className='row justify-content-center fw-bold'>{serverData.header}</div>} */}
                  <h1 className='row justify-content-center'>{serverData.title}</h1>
                  {/* {<h2 className='row justify-content-center'>{serverData.subtitle}</h2>} */}
                </div>
              </div>
              <div className='col-sm-1'>
                <div className='row justify-content-center p-2'>
                  <Button onClick={() => resetServerData()}>Reset</Button>          
                </div>
              </div>
            </div>
            <div className="row justify-content-center align-items-center flex-grow-1">
              <div className='col-sm-1'>
                <div className='row justify-content-center p-2'>
                  <Button onClick={() => prevCue()}><BsChevronLeft/></Button>
                </div>
              </div>
              <div className='col-sm-10'>
                <CueCarouselComponent className='row align-items-center justify-content-center' cues={serverData.cues} currentPtr={serverData.currentPtr} />
              </div>
              <div className='col-sm-1'>
                <div className='row justify-content-end p-2'>
                  <Button onClick={() => nextCue()}><BsChevronRight/></Button>
                </div>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-sm-12'>
                {/* PUT VC COMPONENT HERE */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
