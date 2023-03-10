import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack,
    RadioGroup,
    Link
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useRadio, useRadioGroup } from '@chakra-ui/react'
// import { Select } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Box, useColorModeValue, Icon } from "@chakra-ui/react";
// import { SimpleGrid } from "@chakra-ui/react";
// import TotalSpent from "./components/TotalSpent";
// import WeeklyRevenue from "./components/WeeklyRevenue";
// import MiniStatistics from "./components/MiniStatistics";
// import IconBox from "./components/IconBox";
// import { MdBarChart, MdAttachMoney } from "react-icons/md";
// import ComplexTable from "./components/ComplexTable";
// import tableDataComplex from "./variables/tableDataComplex.json";
// import tableData from "./variables/tableDataComplex.json";
import { Flex, Spacer } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import Usa from "assets/img/dashboards/usa.png";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from "@chakra-ui/react"
import { Dispatch } from "react";
import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    Input,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
// Custom components
import { useRef, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FaCube } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const columnsDataComplex = [
    {
        Header: "NAME",
        accessor: "name",
    },
    {
        Header: "STATUS",
        accessor: "status",
    },
    {
        Header: "DATE",
        accessor: "date",
    },
    {
        Header: "ACTIONS",
        accessor: "progress",
    },
];
const CustomRadio = React.forwardRef((props, ref) => {
    const { isChecked, isDisabled, value, ...rest } = props;
    return (
        <Button
            ref={ref}
            variantColor={isChecked ? "red" : "gray"}
            aria-checked={isChecked}
            role="radio"
            isDisabled={isDisabled}
            {...rest}
        />
    );
});

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    // bg: "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
                    bg: "teal.300",
                    color: 'white',
                    borderColor: 'white',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}


export default function Stepper({ projectData, setProjectData, onCloseAdd, joinNode, setIsReady }) {
    const textColor = useColorModeValue("gray.700", "white");
    const bgPrevButton = useColorModeValue("gray.100", "gray.100");
    const iconColor = useColorModeValue("gray.300", "gray.700");
    const [activeBullets, setActiveBullets] = useState({
        about: true,
        account: false,
        address: false
    });
    const [isConfig, setIsConfig] = useState(true);
    const [start, setStart] = useState(false)
    const [checkboxes, setCheckboxes] = useState({
        design: false,
        code: false,
        develop: false
    });

    const [input, setInput] = useState("");

    const aboutTab = useRef();
    const accountTab = useRef();
    const addressTab = useRef();
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    function handleFile(input) {
        let files = input.target.files;
        // let file = files.files[0];
        // let files = file.target.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);


        reader.onload = function () {
            console.log(reader.result);
            setInput(reader.result);
        };

        reader.onerror = function () {
            console.log(reader.error);
        };

    }
    const options = ['Lite', 'Normal', 'Pro']
    const { isOpen: isOpenReq, onOpen: onOpenReq, onClose: onCloseReq } = useDisclosure()
    const { isOpen: isOpenUp, onOpen: onOpenUp, onClose: onCloseUp } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure()
    const { isOpen: isOpenSelect, onOpen: onOpenSelect, onClose: onCloseSelect } = useDisclosure()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    });
    const [configStatus, setConfigStatus] = useState("Loading...")
    const [projectName, setProjectName] = useState("");
    const [date, setDate] = useState("");
    function getDate() {
        var today = new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
        setDate(today);

    }
    const group = getRootProps()

    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    return (
        <Box paddingTop={{ xl: "130px" }}>
            <Flex
                direction="column"
                minH="70vh"
                align="center"
                pt={{ sm: "125px", lg: "75px" }}
            >
                <Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
                    <TabList
                        display="flex"
                        align="center"
                        alignSelf="center"
                        justifySelf="center"
                    >
                        <Tab
                            ref={aboutTab}
                            _focus="none"
                            w={{ sm: "120px", md: "250px", lg: "300px" }}
                            onClick={() =>
                                setActiveBullets({
                                    about: true,
                                    account: false,
                                    address: false
                                })
                            }
                        >
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                position="relative"
                                _before={{
                                    content: "''",
                                    width: { sm: "120px", md: "250px", lg: "300px" },
                                    height: "3px",
                                    bg: activeBullets.account ? textColor : "gray.200",
                                    left: { sm: "12px", md: "26px" },
                                    top: { sm: activeBullets.about ? "6px" : "4px", md: null },
                                    position: "absolute",
                                    bottom: activeBullets.about ? "40px" : "38px",
                                    zIndex: -1,
                                    transition: "all .3s ease"
                                }}
                            >
                                <Icon
                                    as={BsCircleFill}
                                    color={activeBullets.about ? textColor : "gray.300"}
                                    w={activeBullets.about ? "16px" : "12px"}
                                    h={activeBullets.about ? "16px" : "12px"}
                                    mb="8px"
                                />
                                <Text
                                    color={activeBullets.about ? { textColor } : "gray.300"}
                                    fontWeight={activeBullets.about ? "bold" : "normal"}
                                    display={{ sm: "none", md: "block" }}
                                    fontSize="sm"
                                >
                                    Configuration Test
                                </Text>
                            </Flex>
                        </Tab>
                        <Tab
                            ref={accountTab}
                            _focus="none"
                            w={{ sm: "120px", md: "250px", lg: "300px" }}
                            onClick={() =>
                                setActiveBullets({
                                    about: true,
                                    account: true,
                                    address: false
                                })
                            }
                        >
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                position="relative"
                                _before={{
                                    content: "''",
                                    width: { sm: "120px", md: "250px", lg: "300px" },
                                    height: "3px",
                                    bg: activeBullets.address ? textColor : "gray.200",
                                    left: { sm: "12px", md: "28px" },
                                    top: { sm: activeBullets.account ? "6px" : "4px", md: null },
                                    position: "absolute",
                                    bottom: activeBullets.account ? "40px" : "38px",
                                    zIndex: -1,
                                    transition: "all .3s ease"
                                }}
                            >
                                <Icon
                                    as={BsCircleFill}
                                    color={activeBullets.account ? textColor : "gray.300"}
                                    w={activeBullets.account ? "16px" : "12px"}
                                    h={activeBullets.account ? "16px" : "12px"}
                                    mb="8px"
                                />
                                <Text
                                    color={activeBullets.account ? { textColor } : "gray.300"}
                                    fontWeight={activeBullets.account ? "bold" : "normal"}
                                    transition="all .3s ease"
                                    fontSize="sm"
                                    _hover={{ color: textColor }}
                                    display={{ sm: "none", md: "block" }}
                                >
                                    Settings
                                </Text>
                            </Flex>
                        </Tab>
                        <Tab
                            ref={addressTab}
                            _focus="none"
                            w={{ sm: "120px", md: "250px", lg: "300px" }}
                            onClick={() =>
                                setActiveBullets({
                                    about: true,
                                    account: true,
                                    address: true
                                })
                            }
                        >
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                position="relative"
                                _before={{
                                    content: "''",
                                    width: { sm: "120px", md: "250px", lg: "300px" },
                                    height: "3px",
                                    // bg: activeBullets.profile ? textColor : "gray.200",
                                    left: { sm: "12px", md: "32px" },
                                    top: { sm: activeBullets.address ? "6px" : "4px", md: null },
                                    position: "absolute",
                                    bottom: activeBullets.address ? "40px" : "38px",
                                    zIndex: -1,
                                    transition: "all .3s ease"
                                }}
                            >
                                <Icon
                                    as={BsCircleFill}
                                    color={activeBullets.address ? textColor : "gray.300"}
                                    w={activeBullets.address ? "16px" : "12px"}
                                    h={activeBullets.address ? "16px" : "12px"}
                                    mb="8px"
                                />
                                <Text
                                    color={activeBullets.address ? { textColor } : "gray.300"}
                                    fontWeight={activeBullets.address ? "bold" : "normal"}
                                    transition="all .3s ease"
                                    fontSize="sm"
                                    _hover={{ color: textColor }}
                                    display={{ sm: "none", md: "block" }}
                                >
                                    Checkout
                                </Text>
                            </Flex>
                        </Tab>
                    </TabList>
                    <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
                        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                            <Box>
                                <Flex mb="40px">
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        textAlign="center"
                                        w="80%"
                                        mx="auto"
                                    >
                                        <Text
                                            color={textColor}
                                            fontSize="lg"
                                            fontWeight="bold"
                                            mb="4px"
                                        >
                                            Run Configuration Test
                                        </Text>
                                        <Text color="gray.400" fontWeight="normal" fontSize="sm">
                                            Give us more details about your device
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex direction="column" w="100%">
                                    <Flex direction="column" align="center">
                                        <FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
                                            <Flex
                                                w="100%"
                                                h="100%"
                                                borderRadius="12px"
                                                justify="center"
                                                transition=".5s all ease"
                                                border="1px solid lightgray"
                                                align="center"
                                                bg={checkboxes.design ? "teal.300" : "#fff"}
                                                _hover={{ opacity: "0.8" }}
                                            >
                                                <Button
                                                    variant="no-hover"
                                                    bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                    alignSelf="flex-end"
                                                    mt="24px"
                                                    // w={{ sm: "75px", lg: "100px" }}
                                                    // h="300px"
                                                    w="150px" h="150px"
                                                    onClick={() => {
                                                        setOverlay(<OverlayOne />)
                                                        onOpenUp()

                                                    }}
                                                >
                                                    {/* <Icon
                                as={AiFillSetting}
                                w="54px"
                                h="54px"
                                color={checkboxes.design ? "#fff" : iconColor}
                              /> */}
                                                    <Text
                                                        color="gray.400"
                                                        fontSize="lg"
                                                        fontWeight="bold"
                                                        mb="4px"
                                                    >
                                                        Run
                                                    </Text>
                                                </Button>
                                                <Modal isCentered isOpen={isOpenUp} onClose={onCloseUp}>
                                                    {overlay}
                                                    <ModalContent>
                                                        <ModalHeader>Run Configuration Test</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {/* <Input
                                                                placeholder="Select Date and Time"
                                                                size="md"
                                                                type="file"
                                                                onChange={(file) => {
                                                                    handleFile(file)
                                                                }
                                                                }
                                                            /> */}
                                                            {
                                                                setTimeout(() => {
                                                                    setIsConfig(false)
                                                                    setConfigStatus("Passed")
                                                                }, 5000)
                                                            }
                                                            <Flex direction="column" justifyContent="center">
                                                                <Button
                                                                    isLoading={isConfig}
                                                                    loadingText='Running Configuration Test'
                                                                    colorScheme='teal'
                                                                    variant='outline'
                                                                >Configuration Test Passed</Button>
                                                                <Flex alignItems="center" justifyContent="center">
                                                                    <Text
                                                                        mt="20px"
                                                                        color="black"
                                                                        fontSize="lg"
                                                                        fontWeight="bold"
                                                                        mb="4px"
                                                                    >
                                                                        {configStatus}
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                            {/* <Select
                                    cursor="pointer"
                                    bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                    borderColor="gray.400"
                                    color='white'
                                    placeholder='Choose a Server'
                                  >
                                    <option value='option1'>Server 1</option>
                                    <option value='option2'>Server 2</option>
                                    {/* <option value='option3'>Option 3</option> */}
                                                            {/* </Select> */}
                                                            {/* <Text>Custom backdrop filters!</Text> */}
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            {/* <Button onClick={() => {
                                                                onCloseUp()
                                                            }}>Upload</Button> */}
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                                {/* <Checkbox
                              onChange={() =>
                                setCheckboxes((prevCheckboxes) => {
                                  return {
                                    ...prevCheckboxes,
                                    design: !prevCheckboxes.design
                                  };
                                })
                              }
                              display="none"
                            /> */}

                                            </Flex>
                                        </FormLabel>
                                        {/* <Text color={textColor} fontWeight="bold" fontSize="md">
                        Upload the Project
                      </Text> */}
                                    </Flex>
                                    <Button
                                        variant="no-hover"
                                        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                        alignSelf="flex-end"
                                        mt="24px"
                                        w={{ sm: "75px", lg: "100px" }}
                                        h="35px"
                                        onClick={() => accountTab.current.click()}
                                    >
                                        <Text fontSize="xs" color="#fff" fontWeight="bold">
                                            NEXT
                                        </Text>
                                    </Button>
                                </Flex>
                            </Box>
                        </TabPanel>
                        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                            <Box>
                                <Flex mb="40px">
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        textAlign="center"
                                        w="80%"
                                        mx="auto"
                                    >
                                        <Text
                                            color={textColor}
                                            fontSize="lg"
                                            fontWeight="bold"
                                            mb="4px"
                                        >
                                            Settings
                                        </Text>
                                        <Text color="gray.400" fontWeight="normal" fontSize="sm">
                                            When can you contribute?
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Box>
                                    <Flex direction="column" w="100%">
                                        <Flex
                                            direction={{ sm: "column", md: "row" }}
                                            w="100%"
                                            mb="24px"
                                        >
                                            {/* <Box
                                                position="relative"
                                                minW={{ sm: "110px", xl: "150px" }}
                                                h={{ sm: "110px", xl: "150px" }}
                                                mx={{ sm: "auto", md: "40px", xl: "85px" }}
                                                mb={{ sm: "25px" }}
                                            >
                                                <Avatar w="100%" h="100%" borderRadius="12px" />
                                            </Box> */}
                                            <Stack direction="column" spacing="20px" w="100%">
                                                <FormControl>
                                                    <FormLabel
                                                        color={textColor}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        Start Time
                                                    </FormLabel>
                                                    <Input
                                                        borderRadius="15px"
                                                        placeholder="eg. Michael"
                                                        fontSize="xl"
                                                        type="time" />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel
                                                        color={textColor}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        End Time
                                                    </FormLabel>
                                                    <Input
                                                        borderRadius="15px"
                                                        placeholder="eg. Jackson"
                                                        fontSize="xl"
                                                        type="time"
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel
                                                        color={textColor}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        Number of Day per Week
                                                    </FormLabel>
                                                    <Input
                                                        borderRadius="15px"
                                                        placeholder="Number of Days per Week"
                                                        fontSize="sm"
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Button
                                                variant="no-hover"
                                                bg={bgPrevButton}
                                                alignSelf="flex-end"
                                                mt="24px"
                                                w={{ sm: "75px", lg: "100px" }}
                                                h="35px"
                                                onClick={() => aboutTab.current.click()}
                                            >
                                                <Text fontSize="xs" color="gray.700" fontWeight="bold">
                                                    PREV
                                                </Text>
                                            </Button>
                                            <Button
                                                variant="no-hover"
                                                bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                alignSelf="flex-end"
                                                mt="24px"
                                                w={{ sm: "75px", lg: "100px" }}
                                                h="35px"
                                                onClick={() => addressTab.current.click()}
                                            >
                                                <Text fontSize="xs" color="#fff" fontWeight="bold">
                                                    NEXT
                                                </Text>
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                            <Box>
                                <Flex mb="40px">
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        textAlign="center"
                                        w="80%"
                                        mx="auto"
                                    >
                                        <Text
                                            color={textColor}
                                            fontSize="lg"
                                            fontWeight="bold"
                                            mb="4px"
                                        >
                                            Almost there ...
                                        </Text>
                                        {/* <Text color="gray.400" fontWeight="normal" fontSize="sm">
                                            One thing I love about the later sunsets is the chance to go
                                            for a walk through the neighborhood woods before dinner
                                        </Text> */}
                                    </Flex>
                                </Flex>
                                <Box>
                                    <Flex direction="column" w="100%">
                                        <Flex direction="column" align="center">
                                            <FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
                                                <Flex
                                                    w="100%"
                                                    h="100%"
                                                    borderRadius="12px"
                                                    justify="center"
                                                    transition=".5s all ease"
                                                    border="1px solid lightgray"
                                                    align="center"
                                                    bg={checkboxes.design ? "teal.300" : "#fff"}
                                                    _hover={{ opacity: "0.8" }}
                                                >
                                                    <Button
                                                        variant="no-hover"
                                                        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                        alignSelf="flex-end"
                                                        mt="24px"
                                                        // w={{ sm: "75px", lg: "100px" }}
                                                        // h="300px"
                                                        w="150px" h="150px"
                                                        onClick={() => {
                                                            setOverlay(<OverlayOne />)
                                                            setConfigStatus("Loading ...");
                                                            setIsConfig(true);
                                                            setIsReady(true);
                                                            // onOpenUp();
                                                            joinNode();
                                                            if (setStart) onCloseAdd();
                                                        }}
                                                    >
                                                        {/* <Icon
                                as={AiFillSetting}
                                w="54px"
                                h="54px"
                                color={checkboxes.design ? "#fff" : iconColor}
                              /> */}
                                                        <Text
                                                            color="gray.400"
                                                            fontSize="lg"
                                                            fontWeight="bold"
                                                            mb="4px"
                                                        >
                                                            Start
                                                        </Text>
                                                    </Button>
                                                    <Modal isCentered isOpen={isOpenStart} onClose={onCloseStart}>
                                                        {overlay}
                                                        <ModalContent>
                                                            <ModalHeader>Upload</ModalHeader>
                                                            <ModalCloseButton />
                                                            <ModalBody>
                                                                <Input
                                                                    placeholder="Select Date and Time"
                                                                    size="md"
                                                                    type="file"
                                                                    onChange={(file) => {
                                                                        handleFile(file)
                                                                    }
                                                                    }
                                                                />
                                                                {/* <Select
                                    cursor="pointer"
                                    bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                    borderColor="gray.400"
                                    color='white'
                                    placeholder='Choose a Server'
                                  >
                                    <option value='option1'>Server 1</option>
                                    <option value='option2'>Server 2</option>
                                    {/* <option value='option3'>Option 3</option> */}
                                                                {/* </Select> */}
                                                                {/* <Text>Custom backdrop filters!</Text> */}
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button onClick={onCloseStart}>Upload</Button>
                                                            </ModalFooter>
                                                        </ModalContent>
                                                    </Modal>
                                                    {/* <Checkbox
                              onChange={() =>
                                setCheckboxes((prevCheckboxes) => {
                                  return {
                                    ...prevCheckboxes,
                                    design: !prevCheckboxes.design
                                  };
                                })
                              }
                              display="none"
                            /> */}

                                                </Flex>
                                            </FormLabel>
                                            {/* <Text color={textColor} fontWeight="bold" fontSize="md">
                        Upload the Project
                      </Text> */}
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Button
                                                variant="no-hover"
                                                bg={bgPrevButton}
                                                alignSelf="flex-end"
                                                mt="24px"
                                                w={{ sm: "75px", lg: "100px" }}
                                                h="35px"
                                                onClick={() => accountTab.current.click()}
                                            >
                                                <Text fontSize="xs" color="gray.700" fontWeight="bold">
                                                    PREV
                                                </Text>
                                            </Button>
                                            {/* <Button
                                                variant="no-hover"
                                                bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                alignSelf="flex-end"
                                                mt="24px"
                                                w={{ sm: "75px", lg: "100px" }}
                                                h="35px"
                                                onClick={() => {
                                                    onCloseAdd();
                                                }}
                                            >
                                                <Text fontSize="xs" color="#fff" fontWeight="bold">
                                                    SEND
                                                </Text>
                                            </Button> */}
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Box>
                        </TabPanel>
                        {/* </Box> */}

                    </TabPanels>
                </Tabs>
            </Flex>       </Box >
    )
}
