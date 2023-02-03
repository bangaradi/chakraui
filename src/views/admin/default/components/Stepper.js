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


export default function Stepper({ projectData, setProjectData, onCloseAdd, setString }) {
    const textColor = useColorModeValue("gray.700", "white");
    const bgPrevButton = useColorModeValue("gray.100", "gray.100");
    const iconColor = useColorModeValue("gray.300", "gray.700");
    const [activeBullets, setActiveBullets] = useState({
        about: true,
        account: false,
        address: false
    });

    const [checkboxes, setCheckboxes] = useState({
        design: false,
        code: false,
        develop: false
    });

    // const [input, setInput] = useState("");

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
            // console.log(reader.result);

            // setInput(reader.result);
            setString(reader.result);
        };

        reader.onerror = function () {
            console.log(reader.error);
        };

    }
    const options = ['Lite', 'Normal', 'Pro']
    const { isOpen: isOpenReq, onOpen: onOpenReq, onClose: onCloseReq } = useDisclosure()
    const { isOpen: isOpenUp, onOpen: onOpenUp, onClose: onCloseUp } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenSelect, onOpen: onOpenSelect, onClose: onCloseSelect } = useDisclosure()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    });
    // const [data, setData] = useState({})
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
            {/* <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value='$642.39'
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Select
              id='balance'
              variant='mini'
              mt='5px'
              me='0px'
              defaultValue='usd'>
              <option value='usd'>USD</option>
              <option value='eur'>EUR</option>
              <option value='gba'>GBA</option>
            </Select>
          }
          name='Your balance'
          value='$1,000'
        />
      </SimpleGrid> */}
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
                                    Project Details
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
                                    Upload Your Code
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
                                            Let's start with the basic information
                                        </Text>
                                        <Text color="gray.400" fontWeight="normal" fontSize="sm">
                                            Please enter project details below
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
                                            <Box
                                                position="relative"
                                                minW={{ sm: "110px", xl: "150px" }}
                                                h={{ sm: "110px", xl: "150px" }}
                                                mx={{ sm: "auto", md: "40px", xl: "85px" }}
                                                mb={{ sm: "25px" }}
                                            >
                                                <Avatar w="100%" h="100%" borderRadius="12px" />
                                            </Box>
                                            <Stack direction="column" spacing="20px" w="100%">
                                                <FormControl>
                                                    <FormLabel
                                                        color={textColor}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        Project Name
                                                    </FormLabel>
                                                    <Input
                                                        borderRadius="15px"
                                                        placeholder="eg. Michael"
                                                        fontSize="xs"
                                                        onChange={(event) => {
                                                            getDate();
                                                            setProjectName(event.target.value);
                                                            // console.log(projectName);
                                                        }
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel
                                                        color={textColor}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        Project Description
                                                    </FormLabel>
                                                    <Input
                                                        borderRadius="15px"
                                                        placeholder="eg. Jackson"
                                                        fontSize="xs"
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel
                                                        color={textColor}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        Project URL
                                                    </FormLabel>
                                                    <Input
                                                        borderRadius="15px"
                                                        placeholder="eg. example@address.com"
                                                        fontSize="xs"
                                                    />
                                                </FormControl>
                                            </Stack>
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
                                            Upload Your Code
                                        </Text>
                                        <Text color="gray.400" fontWeight="normal" fontSize="sm">
                                            Give us more details about you. What do you enjoy doing in
                                            your spare time?
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Box>
                                    <Flex direction="column" w="100%">
                                        <Stack
                                            direction={{ sm: "column", md: "row" }}
                                            spacing={{ sm: "20px", lg: "35px" }}
                                            alignSelf="center"
                                            justifySelf="center"
                                            mb="24px"
                                        >
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
                                                                onOpen()
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
                                                                Choose a Server
                                                            </Text>
                                                        </Button>
                                                        <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                                                            {overlay}
                                                            <ModalContent>
                                                                <ModalHeader>Choose a Server</ModalHeader>
                                                                <ModalCloseButton />
                                                                <ModalBody>
                                                                    <Select
                                                                        cursor="pointer"
                                                                        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                                        borderColor="gray.400"
                                                                        color='white'
                                                                        placeholder='Choose a Server'
                                                                    >
                                                                        <option value='option1'>Server 1</option>
                                                                        <option value='option2'>Server 2</option>
                                                                        {/* <option value='option3'>Option 3</option> */}
                                                                    </Select>
                                                                    {/* <Text>Custom backdrop filters!</Text> */}
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button onClick={onClose}>Save</Button>
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
                                                <Text color={textColor} fontWeight="bold" fontSize="md">
                                                    Choose a Server
                                                </Text>
                                            </Flex>
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
                                                                onOpenReq()
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
                                                                Requirements
                                                            </Text>
                                                        </Button>
                                                        <Modal isCentered isOpen={isOpenReq} onClose={onCloseReq}>
                                                            {overlay}
                                                            <ModalContent>
                                                                <ModalHeader>Upload Setup Requirements</ModalHeader>
                                                                <ModalCloseButton />
                                                                {/* <Text>Upload Requirements</Text> */}
                                                                <ModalBody>
                                                                    {/* <Flex justifyContent="center">
                                                                        <Link to="/files/myfile.pdf" target="_blank" download>
                                                                            <Button leftIcon={<DownloadIcon />} colorScheme='blackAlpha' variant='solid' cursor="pointer"
                                                                                bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                                                borderColor="gray.400"
                                                                                color='white'
                                                                                w="300px">
                                                                                Download Requirements
                                                                            </Button>
                                                                        </Link>
                                                                    </Flex> */}
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
                                                                    <Button onClick={onCloseReq}>Done</Button>
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
                                                <Text color={textColor} fontWeight="bold" fontSize="md">
                                                    Setup Requirements
                                                </Text>
                                            </Flex>
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
                                                                Upload
                                                            </Text>
                                                        </Button>
                                                        <Modal isCentered isOpen={isOpenUp} onClose={onCloseUp}>
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
                                                                    <Button onClick={onCloseUp}>Upload</Button>
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
                                                <Text color={textColor} fontWeight="bold" fontSize="md">
                                                    Upload the Project
                                                </Text>
                                            </Flex>
                                        </Stack>

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
                                        <Text color="gray.400" fontWeight="normal" fontSize="sm">
                                            One thing I love about the later sunsets is the chance to go
                                            for a walk through the neighborhood woods before dinner
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Box>
                                    <Flex direction="column" w="100%">

                                        {/* <Stack direction="column" spacing="20px"> */}
                                        <Stack
                                            direction={{ sm: "column", md: "row" }}
                                            spacing={{ sm: "20px", lg: "35px" }}
                                            alignSelf="center"
                                            justifySelf="center"
                                            mb="24px"
                                        >
                                            {/* <Stack {...group}> */}
                                            {options.map((value) => {
                                                const radio = getRadioProps({ value })
                                                return (
                                                    <Flex direction="column" align="center">
                                                        <RadioCard key={value} {...radio}
                                                        >
                                                            {/* <FormLabel w="150px" h="150px" cursor="pointer" mb="16px"> */}

                                                            <Flex
                                                                w="150px"
                                                                h="150px"
                                                                borderRadius="12px"
                                                                justify="center"
                                                                transition=".5s all ease"
                                                                border="1px solid lightgray"
                                                                align="center"
                                                                // bg={"linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"}
                                                                // bg='tea.100'
                                                                // bg={checkboxes.design ? "teal.300" : "#fff"}
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
                                                                        onOpenSelect()
                                                                    }}
                                                                >
                                                                    {/* <Icon
                                as={AiFillSetting}
                                w="54px"
                                h="54px"
                                color={checkboxes.design ? "#fff" : iconColor}
                              /> */}
                                                                    <Flex direction="column">
                                                                        <Text
                                                                            color="gray.400"
                                                                            fontSize="lg"
                                                                            fontWeight="bold"
                                                                            mb="4px"
                                                                        >
                                                                            {value}
                                                                        </Text>
                                                                        <Text
                                                                            color="gray.400"
                                                                            fontSize="xs"
                                                                            fontWeight="bold"
                                                                            mb="4px"
                                                                        >
                                                                            1.25 times faster
                                                                        </Text>
                                                                        <Text
                                                                            marginTop="10px"
                                                                            color="gray.400"
                                                                            fontSize="xs"
                                                                            fontWeight="bold"
                                                                            mb="4px"
                                                                        >
                                                                            Tap to know more
                                                                        </Text>
                                                                    </Flex>
                                                                </Button>
                                                                {/* <Text color="black" fontWeight="bold" fontSize="md">
                                  {value}
                                </Text> */}

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
                                                                {/* <Icon
                                    as={AiFillSetting}
                                    w="54px"
                                    h="54px"
                                    color={checkboxes.design ? "#fff" : iconColor}
                                  /> */}
                                                            </Flex>

                                                            {/* </FormLabel> */}

                                                        </RadioCard>
                                                        <Modal isCentered isOpen={isOpenSelect} onClose={onCloseSelect}>
                                                            {overlay}
                                                            <ModalContent>
                                                                <ModalHeader>{value}</ModalHeader>
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
                                                                    <Text>Hello</Text>
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
                                                                    {/* <Button onClick={onCloseSelect}>Upload</Button> */}
                                                                </ModalFooter>
                                                            </ModalContent>
                                                        </Modal>
                                                    </Flex>
                                                    // <RadioCard key={value} {...radio}>
                                                    // <Flex direction="column" align="center">
                                                    //   {/* <FormLabel w="150px" h="150px" cursor="pointer" mb="16px"> */}
                                                    //   <Flex
                                                    //     w="100%"
                                                    //     h="100%"
                                                    //     borderRadius="12px"
                                                    //     justify="center"
                                                    //     transition=".5s all ease"
                                                    //     border="1px solid lightgray"
                                                    //     align="center"
                                                    //     bg={checkboxes.design ? "teal.300" : "#fff"}
                                                    //     _hover={{ opacity: "0.8" }}
                                                    //   >
                                                    //     {/* <Checkbox
                                                    //         onChange={() =>
                                                    //           setCheckboxes((prevCheckboxes) => {
                                                    //             return {
                                                    //               ...prevCheckboxes,
                                                    //               design: !prevCheckboxes.design
                                                    //             };
                                                    //           })
                                                    //         }
                                                    //         display="none"
                                                    //       /> */}

                                                    //       <Icon
                                                    //         as={AiFillSetting}
                                                    //         w="54px"
                                                    //         h="54px"
                                                    //         color={checkboxes.design ? "#fff" : iconColor}
                                                    //       />

                                                    //   </Flex>
                                                    //   {/* </FormLabel> */}
                                                    //   <Text color={textColor} fontWeight="bold" fontSize="md">
                                                    //     Design
                                                    //   </Text>
                                                    // </Flex>
                                                    // </RadioCard>
                                                    // <RadioCard key={value} {...radio}>
                                                    //   {value}
                                                    // </RadioCard>
                                                )
                                            })}
                                            {/* </Stack> */}
                                            {/* <RadioGroup
                        defaultValue="rad2"
                        onChange={val => console.log(val)}
                        isInline
                      >
                        <CustomRadio value="rad1">CustomRadio 1</CustomRadio>
                        <CustomRadio value="rad2">CustomRadio 2</CustomRadio>
                        <CustomRadio value="rad3">CustomRadio 3</CustomRadio> */}
                                            {/* This child will be skipped in keyboard navigation */}
                                            {/* <CustomRadio isDisabled value="rad4">
                          CustomRadio 4
                        </CustomRadio>
                      </RadioGroup> */}
                                            {/* <Flex direction="column" align="center">
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
                            <Checkbox
                              onChange={() =>
                                setCheckboxes((prevCheckboxes) => {
                                  return {
                                    ...prevCheckboxes,
                                    design: !prevCheckboxes.design
                                  };
                                })
                              }
                              display="none"
                            />
                            <Icon
                              as={AiFillSetting}
                              w="54px"
                              h="54px"
                              color={checkboxes.design ? "#fff" : iconColor}
                            />
                          </Flex>
                        </FormLabel>
                        <Text color={textColor} fontWeight="bold" fontSize="md">
                          Design
                        </Text>
                      </Flex> */}
                                            {/* <FormControl> 
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          Time Expected
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="eg. Street 120"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          Address 2
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="eg. Street 220"
                          fontSize="xs"
                        />
                      </FormControl>
                      <Grid
                        templateColumns={{ sm: "1fr 1fr", lg: "2fr 1fr 1fr" }}
                        gap="30px"
                      >
                        <FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs"
                          >
                            City
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="eg. Tokyo"
                            fontSize="xs"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs"
                          >
                            State
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="..."
                            fontSize="xs"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs"
                          >
                            ZIP
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="7 letters"
                            fontSize="xs"
                          />
                        </FormControl>
                      </Grid> */}
                                        </Stack>
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
                                            <Button
                                                variant="no-hover"
                                                bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                                alignSelf="flex-end"
                                                mt="24px"
                                                w={{ sm: "75px", lg: "100px" }}
                                                h="35px"
                                                onClick={() => {
                                                    onCloseAdd();
                                                    var data = [];
                                                    data = projectData;
                                                    data.push({ name: projectName, status: "In progress", date: date, progress: 0 });
                                                    setProjectData(projectData => [...projectData, { name: projectName, status: "In progress", date: date, progress: 0 }]);
                                                    // sessionStorage.setItem("pdata", JSON.stringify(data));
                                                    // window.location.reload();
                                                    console.log(projectData);

                                                }}
                                            >
                                                <Text fontSize="xs" color="#fff" fontWeight="bold">
                                                    SEND
                                                </Text>
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex >



            {/* New Stepper */}




            {/* <Button
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
      </Button> */}

            {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableData}
        />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid> */}
            {/* </SimpleGrid> */} * /
        </Box >
    )
}