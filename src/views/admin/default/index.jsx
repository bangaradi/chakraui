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
  const OverlayOne = () => (
    <ModalOverlay
      bg='whiteAlpha.900'
    // backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  // const [tableData, setTableData] = useState([{
  //   "name":"",
  //   "status": "",
  //   "date": "",
  //   "progress": 0  
  // },]);
  const [string, setString] = useState("");
  const [tableData, setTableData] = useState([{}]);
  const [projectData, setProjectData] = useState([{
    "name": "Project 1",
    "status": "Not started",
    "date": "2 Feb 2023",
    "progress": 100,
  }, {
    "name": "Project 2",
    "status": "Completed",
    "date": "10 Feb 2023",
    "progress": 100,
  }]);
  // const [projectData, setProjectData] = useState([{}]);
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  const [show, setShow] = useState(false);
  // Chakra Color Mode
  // useEffect(() => {
  //   setTableData(projectData);
  //   var data;
  //   data = sessionStorage.getItem("pdata");
  //   if (data === null) return;
  //   console.log(data);
  //   setTableData(JSON.parse(data));
  // }, [projectData, setTableData]);
  useEffect(() => {
    socket.emit("join provider", socket.id);

    socket.on("found", function(data){
      console.log("inside found");
      console.log("found", data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  },[]);
  // const joinProvider = () => {
    // socket.emit("join provider", socket.id);
  // };
  const startProject = () => {
    socket.emit("split data", string);
    // console.log(string);
    console.log("start project", string);
  };

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
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
        {/* sales */}
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        {/* balance */}
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
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
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        {/* new taskts */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
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
          value='2935'
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
      <Button onClick={() => {
        setOverlay(<OverlayOne />)
        onOpenAdd()
      }}>

        Add Project
      </Button>
      <Modal isCentered isOpen={isOpenAdd} onClose={onCloseAdd} size='full'>
        {/* {overlay} */}
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Add Project</ModalHeader>
          <ModalBody>
            <Stepper projectData={projectData} setProjectData={setProjectData} onCloseAdd={onCloseAdd} setString={setString}/>         
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
    </Box >
  );
}
