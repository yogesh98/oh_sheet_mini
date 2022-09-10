import {useRef, useState} from "react";
import { useSheets } from "hooks/useSheets";

import LoaderComponent from "components/Loader/LoaderComponent";
import CardComponent from "components/Card/CardComponent";
import { 
  Box,
  Button, 
  Container, 
  Flex, 
  Icon, 
  Input, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

import {BooleanMap} from "types/genericTypes";
import { Link } from "react-router-dom";


export interface IOwnerDashboardProps {
}

export default function Dashboard (props: IOwnerDashboardProps) {
  const newSheetUrl = useRef<HTMLInputElement>(null);
  const [openSheets, setOpenSheets] = useState<BooleanMap>({});
  const { 
    isOpen: showAddModal, 
    onOpen: openAddModal, 
    onClose: closeAddModal, 
  } = useDisclosure();

  const { sheets, addNewSheet, removeSheet, loading } = useSheets();

  const parseGoogleSheet = () => {
    addNewSheet(newSheetUrl?.current?.value);
    closeAddModal();
  }

  const toggleSheeet = (spreadsheetId: string) => () => {
    if(openSheets[spreadsheetId]) {
      setOpenSheets({...openSheets, [spreadsheetId]: false});
    } else {
      setOpenSheets({...openSheets, [spreadsheetId]: true});
    }
  }

  if(loading){
    return <LoaderComponent />
  }

  return (
    <Box m={2}>
      <Flex justifyContent="end">
        <Button mx={2} onClick={() => window.open("https://docs.google.com/spreadsheets/d/1JgIruQzCnb0RwIHjSZIkH_9cO_w8sNDozXp0FKNPHFE/template/preview")}>Create From Template</Button>
        <Button mx={2} onClick={openAddModal}><Icon as={BsPlusLg} /></Button>
      </Flex>
      <Container maxW="container.lg" >
        {sheets.length > 0 ? sheets.map((sheet, index) => {
          const key: string = sheet['spreadsheetId'];
          const title: string = sheet['properties']['title'];
          const open: boolean = openSheets[key] || false;
          const pages: any[] = sheet['sheets'];
          return (
            <CardComponent 
              isCollapsible
              key={key} 
              title={title}
              onClick={toggleSheeet(key)}
              isOpen={open}
              onDelete={removeSheet(index)}
            >
              <Flex direction="column" >
                {pages.map((page) => {
                  const pageTitle: string = page['properties']['title'];
                  if(pageTitle === "Instructions") {
                    return null;
                  }
                  return (
                    <Box key={pageTitle}>
                        <Link to={`/owner/master/${key}/${pageTitle}`}>{pageTitle}</Link>
                    </Box>
                  )
                })}
              </Flex>
            </CardComponent>
          );
        }):
          <Flex m={4} justifyContent="center" alignItems="center" direction="column" grow={1} borderWidth={"2px"} borderRadius={"lg"}> 
              <Text m={2} textAlign="center" fontSize={"3xl"}>Add or create a new sheet to start.</Text>
              <Box m={4}>
                <Button mx={2} onClick={() => window.open("https://docs.google.com/spreadsheets/d/1JgIruQzCnb0RwIHjSZIkH_9cO_w8sNDozXp0FKNPHFE/template/preview")}>Create From Template</Button>
                <Button mx={2} onClick={openAddModal}><Icon as={BsPlusLg} /></Button>
              </Box>
          </Flex>
        }
      </Container>
      <Modal isOpen={showAddModal} onClose={closeAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter public google sheets link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Sheet URL" ref={newSheetUrl} />
          </ModalBody>
          <ModalFooter>
            <Button variant='solid' onClick={parseGoogleSheet}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
