import { Box, Button, Link, Flex, Heading, Text, useBreakpointValue, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';

export interface IOhSheetMaxProps {
}

export default function OhSheetMax (props: IOhSheetMaxProps) {

    return (
        <>
            <Flex mt={10} alignItems={"center"} justifyContent="center">
                <Heading size={useBreakpointValue({ base: '2xl', md: '4xl' })}>
                    oh sheet.
                </Heading>
                <Text as='sup'>Max</Text>
            </Flex>
            <Flex 
                direction="column" 
                w="100%"
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Flex m={5} alignItems={'center'} justifyContent={'center'}>
                    <Link 
                        href='mailto:me@yogeshp.dev'
                    >
                        <Button
                            w={'full'}
                            bg={'gray.900'}
                            color={'white'}
                            rounded={'md'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}
                        >
                            Contact Support
                        </Button>
                    </Link>
                </Flex>
                <Accordion
                    w={'100%'}
                    defaultIndex={[0]} 
                    allowMultiple
                >
                    <AccordionItem>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                FAQ
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Comming Soon...
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
        </>

    );
}
