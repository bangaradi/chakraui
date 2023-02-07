/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Button
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  HStack,
  RadioGroup,
  Link
} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { useState, useEffect } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { useDisclosure } from '@chakra-ui/react'
import Stepper from "./components/Stepper";
import socket from "../socket";


export default function UserReports() {
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure()
  const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure()
  const OverlayOne = () => (
    <ModalOverlay
      // bg='whiteAlpha.900'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  // const [tableData, setTableData] = useState([{
  //   "name":"",
  //   "status": "",
  //   "date": "",
  //   "progress": 0  
  // },]);
  const [string, setString] = useState("");
  const [credits, setCredits] = useState(500);
  const [tableData, setTableData] = useState([{}]);
  const [projectData, setProjectData] = useState([{
    "name": "Project 1",
    "status": "Not started",
    "date": "2 Feb 2023",
    "progress": 100,
  }]);
  // const [projectData, setProjectData] = useState([{}]);
  const [connectionState, setConnectionState] = useState(false);
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  const [show, setShow] = useState(false);
  const [clicked, toggleClicked] = useState(false);
  const [rowUnderProgress, setRowUnderProgress] = useState(0);
  const [activeNodes, setActiveNodes] = useState(0);
  // const [status, setStatus] = useState([]);
  const [infoRow, setInfoRow] = useState(0);
  // const [overlay, setOverlay] = React.useState(<OverlayOne />)
  // Chakra Color Mode
  // useEffect(() => {
  //   setTableData(projectData);
  //   var data;
  //   data = sessionStorage.getItem("pdata");
  //   if (data === null) return;
  //   console.log(data);
  //   setTableData(JSON.parse(data));
  // }, [projectData, setTableData]);
  const handleInfo = (number) => {
    let infoData = [...projectData];
  }
  const handleProgress = (number) => {
    console.log("handle progress", "row number: ", number);
    let data = [...projectData];
    setRowUnderProgress(number);
    console.log(number);
    let index = parseInt(number);
    if (data[index].status === "Not started") {
      toggleClicked(!clicked);
      data[index].status = "In progress";
      data[index].progress = 50;
      setProjectData(data);
      startProject();
    } else if (data[index].status === "In progress") {
      data[index].status = "Completed";
      data[index].progress = 100;
      // setStatus("Completed");
      setCredits(credits - 40);
      setProjectData(data);
    }
    // data.map((item, index) => {
    //   console.log(item, index);
    //   if (index == number) {
    //     console.log("satisfied");
    //     console.log(item);
    //     let Status = data[index].status;
    //     if (Status === "Not started") {
    //       toggleClicked(!clicked);
    //       data[index].status = "In progress";
    //       data[index].progress = 50;
    //     } else if (Status === "In progress") {
    //       data[index].status = "Completed";
    //       data[index].progress = 100;
    //     }
    //   }
    //   return item;
    // });
    // setProjectData(data);
    // if(data[number].status === "Not started"){
    //   startProject();
    // }
    console.log("clicked");
  };

  useEffect(() => {
    // socket.emit("join provider", socket.id);
    socket.on("node data", function (data) {
      // console.log("node data found");
      setActiveNodes(data);

    });

    socket.on("found", function (data) {
      console.log("inside found");
      console.log("found", data);
      toggleClicked(false);
      handleProgress(rowUnderProgress);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);
  // const joinProvider = () => {
  // socket.emit("join provider", socket.id);
  // };
  const startProject = () => {
    socket.emit("split data", string);
    // console.log(string);
    console.log("start project", string);
  };
  const connectProvider = () => {
    socket.emit("join provider", socket.id);
  };
  var infoData = [...projectData];
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        {/* <MiniStatistics
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
        /> */}
        {/* <MiniStatistics
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
        /> */}
        {/* sales */}
        <MiniStatistics name='Hive Coins' value={credits} />
        {/* balance */}
        <MiniStatistics
          // endContent={
          //   <Flex me='-16px' mt='10px'>
          //     <FormLabel htmlFor='balance'>
          //       <Avatar src={Usa} />
          //     </FormLabel>
          //     <Select
          //       id='balance'
          //       variant='mini'
          //       mt='5px'
          //       me='0px'
          //       defaultValue='usd'>
          //       <option value='usd'>USD</option>
          //       <option value='eur'>EUR</option>
          //       <option value='gba'>GBA</option>
          //     </Select>
          //   </Flex>
          // }
          name='Hive Flops'
          value='250'
        />
        {/* new taskts */}
        <MiniStatistics
          // startContent={
          //   <IconBox
          //     w='56px'
          //     h='56px'
          //     bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
          //     icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
          //   />
          // }
          name='Nodes Connected'
          value={connectionState ? activeNodes : "Offline"}
        />
        {/* total projects */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value={projectData.length}
        />
      </SimpleGrid>
      {/* <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th> Name</Th>
              <Th>Status</Th>
              <Th> Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>to convert</Td>
              <Td>to convert</Td>
              <Td>to convert</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer> */}

      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid> */}
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={projectData}
          startProject={startProject}
          setProjectData={setProjectData}
          clicked={clicked}
          toggleClicked={toggleClicked}
          handleProgress={handleProgress}
          // status={status}
          onOpenInfo={onOpenInfo}
          setInfoRow={setInfoRow}
        />
        {/* <Text>{tableData[2].name}</Text> */}
        {/* <Text>{projectData[1].name}</Text>
        <Text>{projectData[2].name}</Text> */}
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
      {/* <Text>{tableData[2].name}</Text> */}

      {/* <Text>

        Project Name: {projectName}
      </Text> */}
      <Flex
        w="100%"
        h="80px"
        alignContent="space-between"
        justifyContent="space-between"
        borderRadius="12px"
        // justify="center"
        transition=".5s all ease"
        // border="1px solid lightgray"
        align="center"
        // bg={"linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"}
        // bg='tea.100'
        // bg={checkboxes.design ? "teal.300" : "#fff"}
        _hover={{ opacity: "0.8" }}
      >
        <Button w="300px" h="50px" border="1px solid lightgray" bg={connectionState ? "red.300" : "lightgray"} onClick={() => {
          connectProvider();
          setConnectionState(true);

        }
        }>{connectionState ? "Disconnect" : "Connect"}</Button>
        <Button
          variant="no-hover"
          bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          alignSelf="flex-end"
          mt="24px"
          // w={{ sm: "75px", lg: "100px" }}
          // h="300px"
          w="300px" h="50px"
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpenAdd()
          }}
        // onClick={() => {
        //   setOverlay(<OverlayOne />)
        //   onOpenSelect()
        // }}
        >
          <Flex direction="column">

            <Text
              color="gray.400"
              fontSize="xl"
              fontWeight="bold"
              mb="4px"
            >
              Add Project
            </Text>

          </Flex>
        </Button>

      </Flex>
      {/* <Button
        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
        alignSelf="flex-end"
        mt="24px"
        // w={{ sm: "75px", lg: "100px" }}
        // h="300px"
        w="300px" h="125px" onClick={() => {
          setOverlay(<OverlayOne />)
          onOpenAdd()
        }}>

        <Text color="white">Add Project</Text>
      </Button> */}
      <Box mt="50px" >

      </Box>
      <Modal isCentered isOpen={isOpenAdd} onClose={onCloseAdd} size='full'>
        {/* {overlay} */}
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Add Project</ModalHeader>
          <ModalBody>
            <Stepper projectData={projectData} setProjectData={setProjectData} onCloseAdd={onCloseAdd} setString={setString} />
            {/* <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="file"
                                onChange={(file) => {
                                  handleFile(file)
                                }
                                }
                              /> */}
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
          {/* <ModalFooter> */}
          {/* <Button onClick={onCloseAdd}>Close</Button> */}
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isOpenInfo} onClose={onCloseInfo} size="xl" >
        {overlay}
        <ModalContent>
          <ModalHeader></ModalHeader>
          {/*<ModalCloseButton /> */}
          <ModalBody>
            {
              handleInfo(infoRow)
            }
            <Flex
              direction="column"
              align="center"
              justify="center"
              textAlign="center"
              w="80%"
              mx="auto"
            >
              <Text
                color="black"
                fontSize="lg"
                fontWeight="bold"
                mb="4px"
              >
                {infoData[infoRow].name}
              </Text>
              <Text color="gray.400" fontWeight="normal" fontSize="xl">
                Task {infoData[infoRow].status}
              </Text>
              {(infoData[infoRow].status === 'Completed') && (<Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl"> 40 credits debited </Text></Flex>)}
              {(infoData[infoRow].status === 'In progress') && (<Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl">Waiting for final output ⏳</Text></Flex>)}
              {(infoData[infoRow].status === 'Not started') && (<Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl">Yet to start </Text></Flex>)}


            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

    </Box >
  );
}
