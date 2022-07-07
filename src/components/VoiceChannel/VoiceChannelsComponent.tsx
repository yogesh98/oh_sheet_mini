import React, { useRef, useState } from 'react'


import { Avatar, Box, Button, Flex, FormControl, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'

import {
    IVoiceChannel,
} from "types/types";
import { AddIcon } from '@chakra-ui/icons';
import { BsFillVolumeMuteFill } from 'react-icons/bs';

export default function VoiceChannelsComponent(){
    const [vcs, setVcs] = useState<IVoiceChannel[]>([]);
    const {isOpen, onToggle } = useDisclosure();
    const [newVcName, setNewVcName] = useState("");
    const initialRef = useRef(null);
    const toast = useToast();


    const buttonHoverColor = useColorModeValue("gray.100", "blue.800");
    
    const muteVc = (index: number) => () => {
        console.log("muteVc");
        const newVcs = [...vcs];
        newVcs[index].mute = !newVcs[index].mute;
        setVcs(newVcs);
    }

    const addVc = () => {
        console.log("addVc");
        // only add new VC if name is not empty and not already in list
        if(newVcName.length > 0 && !vcs.some(vc => vc.name === newVcName)){
            const newVcs = [...vcs];
            newVcs.push({name: newVcName, mute: false});
            setVcs(newVcs);
            setNewVcName("");
            onToggle();
        } else {
            toast({
                title: "Could not add VC",
                description: "Please check the name and try again",
                position: "top-right",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    return (
    <>
        <Flex h={"100%"} w="100%" justifyContent="center" alignItems="center" overflow="auto">
            {vcs.map((vc, index) => {
                return (
                    <Box w={"6rem"} borderRadius="lg" onClick={muteVc(index)} _hover={{ bg: buttonHoverColor }}>
                        <VStack m={2} spacing={1}>
                            <Avatar name={vc.name} />
                            <HStack spacing={1}>
                                <Box>{vc.name}</Box>
                                <Box>{vc.mute ? <BsFillVolumeMuteFill /> : ""}</Box>
                            </HStack>
                        </VStack >
                    </Box>
                );
            })}
            <Box w={"6rem"} borderRadius="lg" onClick={onToggle} _hover={{ bg: buttonHoverColor }}>
                <VStack m={2} spacing={1}>
                    <Avatar name="+" icon={<AddIcon />} />
                    <Box>Add New</Box>
                </VStack >
            </Box>
        </Flex>
        <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onToggle}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new channel</ModalHeader>
                <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input 
                                ref={initialRef} 
                                placeholder='label' 
                                value={newVcName} 
                                onChange={(e) => setNewVcName(e.target.value)} 
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' colorScheme='blue' mr={3} onClick={addVc}>
                            Save
                        </Button>
                        <Button onClick={onToggle}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}
