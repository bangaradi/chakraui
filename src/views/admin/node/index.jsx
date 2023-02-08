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
import { SimpleGrid } from "@chakra-ui/react";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import MiniStatistics from "./components/MiniStatistics";
import IconBox from "./components/IconBox";
import { MdBarChart, MdAttachMoney } from "react-icons/md";
import ComplexTable from "./components/ComplexTable";
// import tableDataComplex from "./variables/tableDataComplex.json";
// import tableData from "./variables/tableDataComplex.json";
import { Flex, Spacer } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import socket from "../socket";
// console.log("socket", socket);
import Usa from "assets/img/dashboards/usa.png";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react"
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
import { useRef, useState, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FaCube } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import NodeStepper from "./components/NodeStepper";
// import { Icon } from "@chakra-ui/react";
// import { SimpleGrid } from "@chakra-ui/react";
// import TotalSpent from "./components/TotalSpent";
// import WeeklyRevenue from "./components/WeeklyRevenue";
// import MiniStatistics from "./components/MiniStatistics";
// import IconBox from "./components/IconBox";
// import { MdBarChart, MdAttachMoney } from "react-icons/md";
// import ComplexTable from "./components/ComplexTable";
// import tableDataComplex from "./variables/tableDataComplex.json";
// import tableData from "./variables/tableDataComplex.json";
// import Flex from "@chakra-ui/react";
// import FormLabel from "@chakra-ui/react";
// import Avatar from "@chakra-ui/react";
// import { Select } from "@chakra-ui/react";
// import Usa from "assets/img/dashboards/usa.png";
// import {
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   StatGroup,
// } from "@chakra-ui/react"

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
    Header: "COINS EARNED",
    accessor: "credits",
  },
];


export default function NodeDashboard(params) {
  const [tableData, setTableData] = useState([
    // {
    //   "name":"Project 1",
    //   "status": "Completed",
    //   "date": "18 Apr 2022",
    //   "progress": 75.5  
    // },
    // {},

  ]);
  let checkHash = useRef("");
  // let checkHash = ""
  // const [checkHash, setCheckHash] = useState("");
  // let str = ""
  const [nodeStr, setNodeStr] = useState("");
  // let checkHash_l = 0;
  const [checkHash_l, setCheckHash_l] = useState(0);
  // let found = -1;
  const [found, setFound] = useState(-1);

  let start_time = 0
  let end_time = 0
  const { isOpen: isOpenFound, onOpen: onOpenFound, onClose: onCloseFound } = useDisclosure()

  // console.log("socket", socket.id);
  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const iconColor = useColorModeValue("gray.300", "gray.700");
  const [activeBullets, setActiveBullets] = useState({
    about: true,
    account: false,
    address: false
  });
  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  }
  const [checkboxes, setCheckboxes] = useState({
    design: false,
    code: false,
    develop: false
  });
  const [input, setInput] = useState("");
  const [send, setSend] = useState(0);
  const aboutTab = useRef();
  const accountTab = useRef();
  const addressTab = useRef();
  // const [permutations, setPermutations] = useState([]);
  // const [socket, setSocket] = useState({});
  // const socket = io.connect('http://localhost:3001');

  function updateTable(project) {
    console.log("project: ", project);
    project["credits"] = 40;
    let temp = [...tableData, project];
    console.log("temp: ", temp);
    setTableData(temp);
  }

  const joinNode = () => {
    params.socket.emit("join node", params.socket.id);
    params.socket.emit("get checkHash");
  };

  // function implementSearch(nodeStr, checkHash) {
  //   let str_l = nodeStr.length;
  //   let checkHash_l = checkHash.length;
  //   // let count = 0;
  //   for (let i = 0; i < str_l; i++) {
  //     let temp = nodeStr.substring(i, i + checkHash_l);
  //     if (temp === checkHash) {
  //       console.log("found at: ", i);
  //       return i;
  //     }
  //   }
  //   console.log("not found");
  //   return -1;
  // }

  function permute(str, l, r)
  {
    if (l === r){
      console.log("permuted : ", str);
      let temp = [...strArr, str];
      setStrArr(temp);
      }else{
        for (let i = l; i <= r; i++)
        {
          str = swap(str, l, i);
          permute(str, l + 1, r);
          str = swap(str, l, i);
        }
      }
  }

  function swap(a, i, j)
  {
    let temp;
      let charArray = a.split("");
      temp = charArray[i] ;
      charArray[i] = charArray[j];
      charArray[j] = temp;
      return (charArray).join("");
  }


  const [strArr, setStrArr] = useState([]);
  function permuteAll(list){
    console.log(list);
    // let stringToPermute = "";
    list.forEach((element) => {
      // console.log(String(element));
      let stringToPermute = String(element);
      // stringToPermute = element;
      console.log("permuting: ", stringToPermute);
      permute(stringToPermute, parseInt(0), parseInt(stringToPermute.length) - 1);
    });
    return strArr.length;
  }


  useEffect(() => {
    params.socket.on("get checkHash", async function (data) {
      // console.log("checkHash is: ",data);
      checkHash = data;
      // setCheckHash(data);
      console.log("checkHash is: ", checkHash);
      // checkHash_l = checkHash.length;

    });

    params.socket.on("disconnect it", function () {
      params.socket.disconnect();
    });

    params.socket.on("get data", async function (data) {
      // console.log("str is : ", data);
      // str = data;
      // await setNodeStr(data);
      let found = -1;
      // start_time = new Date().getTime();
      // found = implementSearch(str, checkHash);
      console.log("permuting the strings:", data.listToPermute);
      // found = implementSearch(data.string, checkHash)
      let numberOfPermutations = permuteAll(data.listToPermute);
      // setTableData([...tableData, data.project])
      updateTable(data.project);
      setIsReady(false);
      // end_time = new Date().getTime();
      // console.log("time taken: ", end_time - start_time);
      if (found > -1) {
        console.log("found");
        params.socket.emit("found", { permutations: numberOfPermutations, id: params.socket.id, checkHash: checkHash });
        setOverlay(<OverlayOne />)
        onOpenFound()
        setCoins(coins + 40);
      } else {
        console.log("not found");
        params.socket.emit("found", { permutations: numberOfPermutations, id: params.socket.id, checkHash: checkHash });
        setOverlay(<OverlayOne />)
        onOpenFound()
        setCoins(coins + 40);
      }

    });

    return () => {
      params.socket.off('connect');
      params.socket.off('disconnect');
      params.socket.off('pong');
    };
  }, []);

  // const brandColor = useColorModeValue("brand.500", "white");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
  const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure()
  const { isOpen: isOpenUp, onOpen: onOpenUp, onClose: onCloseUp } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [coins, setCoins] = useState(400);
  const [isReady, setIsReady] = useState(false);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  });
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure()

  const group = getRootProps()

  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box paddingTop={{ xl: "130px" }}>
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
        <MiniStatistics name='Hive Coins' value={coins} />
        {/* <MiniStatistics
          // endContent={
          //   <Select
          //     id='balance'
          //     variant='mini'
          //     mt='5px'
          //     me='0px'
          //     defaultValue='usd'>
          //     <option value='usd'>USD</option>
          //     <option value='eur'>EUR</option>
          //     <option value='gba'>GBA</option>
          //   </Select>
          // }
          name='Hive Flops'
          value='20'
        /> */}
        <Button
          w="300px" h="100px" border="1px solid lightgray"
          bg={(isReady) ? "green.400" : "red.500"}
          variant="no-hover"
          // bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          alignSelf="flex-end"
        >
          {(isReady) ? "Ready" : "Not Ready"}
        </Button>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableData}
        />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
      <Button
        variant="no-hover"
        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
        alignSelf="flex-end"
        mt="24px"
        m={{ base: "5", md: "0" }}
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
      {/* <Button onClick={() => {
        setOverlay(<OverlayOne />)
        onOpenFound()
      }}>

        Found Demo
      </Button> */}
      <Modal isCentered isOpen={isOpenAdd} onClose={onCloseAdd} size='full'>
        {/* {overlay} */}
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Add Project</ModalHeader>
          <ModalBody>
            <NodeStepper onCloseAdd={onCloseAdd} joinNode={joinNode} setIsReady={setIsReady} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isOpenFound} onClose={onCloseFound} size="xl" >
        {overlay}
        <ModalContent>
          {/* <ModalHeader>Info</ModalHeader>
          <ModalCloseButton /> */}
          <ModalBody>

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
                Congratulations! Task is completed 🎉🎉
              </Text>
              {/* <Text color="gray.400" fontWeight="normal" fontSize="xl">
                Task {infoData[infoRow].status}
              </Text> */}
              {/* {(infoData[infoRow].status === 'Completed') && (<Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl">You have earned 40 credits from this task 🔥</Text></Flex>)}
              {(infoData[infoRow].status === 'In progress') && (<Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl">Waiting for final output ⏳</Text></Flex>)}
              {(infoData[infoRow].status === 'Not started') && (<Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl">Yet to start </Text></Flex>)} */}
              <Flex h="10rem" alignItems="center"><Text color="gray.600" fontWeight="normal" fontSize="xl">You have earned 40 credits from this task 🔥</Text></Flex>

            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>


    </Box>
  )
}