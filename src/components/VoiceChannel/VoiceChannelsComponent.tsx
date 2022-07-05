import React, { useState } from 'react'


import { Avatar, Box, Flex, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'

import {
    IVoiceChannel,
} from "types/types";
import { AddIcon } from '@chakra-ui/icons';
import { BsFillVolumeMuteFill } from 'react-icons/bs';

export default function VoiceChannelsComponent(){
    const [vcs, setVcs] = useState<IVoiceChannel[]>([{name: "VC1 super long name", mute: false}]);
    const {isOpen, onToggle } = useDisclosure();
    const buttonHoverColor = useColorModeValue("gray.100", "blue.800");
    
    const muteVc = (index: number) => () => {
        console.log("muteVc");
        const newVcs = [...vcs];
        newVcs[index].mute = !newVcs[index].mute;
        setVcs(newVcs);
    }

    return (
        <Flex w="100%" justifyContent="center" alignItems="center" overflow="auto">
            {vcs.map((vc, index) => {
                return (
                    <Box w={"6rem"} borderRadius="lg" onClick={muteVc(index)} _hover={{ bg: buttonHoverColor }}>
                        <VStack m={2} spacing={1}>
                            <Avatar name={vc.name} />
                            <Box>{vc.name}</Box>
                        </VStack >
                        {vc.mute ? <BsFillVolumeMuteFill /> : null}
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
    )
}
