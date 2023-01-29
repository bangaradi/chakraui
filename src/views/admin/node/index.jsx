import React from "react";

import {Box, useColorModeValue, Icon} from "@chakra-ui/react";
import {SimpleGrid} from "@chakra-ui/react";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import MiniStatistics from "./components/MiniStatistics";
import IconBox from "./components/IconBox";
import { MdBarChart, MdAttachMoney } from "react-icons/md";
import ComplexTable from "./components/ComplexTable";
// import tableDataComplex from "./variables/tableDataComplex.json";
import tableData from "./variables/tableDataComplex.json";
import Flex from "@chakra-ui/react";
import FormLabel from "@chakra-ui/react";
import Avatar from "@chakra-ui/react";
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
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return(
    <Box paddingTop={{ xl:"130px"}}>
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
    </Box>
  )
}