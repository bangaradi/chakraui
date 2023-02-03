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
import tableData from "./variables/tableDataComplex.json";
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
    Header: "PROGRESS",
    accessor: "progress",
  },
];


export default function NodeDashboard(params) {

  // let checkHash = ""
  const [checkHash, setCheckHash] = useState("");
  // let str = ""
  const [nodeStr, setNodeStr] = useState("");
  // let checkHash_l = 0;
  const [checkHash_l, setCheckHash_l] = useState(0);
  // let found = -1;
  const [found, setFound] = useState(-1);

  let start_time = 0
  let end_time = 0

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
  // const [socket, setSocket] = useState({});
  // const socket = io.connect('http://localhost:3001');

  function implementSearch(nodeStr, checkHash) {
    let str_l = nodeStr.length;
    let checkHash_l = checkHash.length;
    // let count = 0;
    for (let i = 0; i < str_l; i++) {
      let temp = nodeStr.substring(i, i + checkHash_l);
      if (temp === checkHash) {
        console.log("found at: ", i);
        return i;
      }
    }
    console.log("not found");
    return -1;
  }

  useEffect(() => {
    socket.on("get checkHash", function (data) {
      console.log("checkHash is: ", data);
      // checkHash = data;
      setCheckHash(data);
      // checkHash_l = checkHash.length;
      setCheckHash_l(data.length);

    });

    socket.on("disconnect it", function () {
      socket.disconnect();
    });

    socket.on("get data", function (data) {
      // console.log("str is : ", data);
      // str = data;
      setNodeStr(data);

      // start_time = new Date().getTime();
      // found = implementSearch(str, checkHash);
      setFound(implementSearch(data, checkHash));
      // end_time = new Date().getTime();
      // console.log("time taken: ", end_time - start_time);
      if (found > -1) {
        console.log("found");
        socket.emit("found", { found: found, id: socket.id });
      } else {
        console.log("not found");
        socket.emit("found", { found: found, id: socket.id });
      }

    });
  }, [socket])

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
      <Button onClick={() => {
        setOverlay(<OverlayOne />)
        onOpenAdd()
      }}>

        Get Project
      </Button>
      <Modal isCentered isOpen={isOpenAdd} onClose={onCloseAdd} size='full'>
        {/* {overlay} */}
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Get Project</ModalHeader>
          <ModalBody>
            <NodeStepper onCloseAdd={onCloseAdd} />
          </ModalBody>
        </ModalContent>
      </Modal>


    </Box>
  )
}