/* eslint-disable */
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

import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  // Text,
  Stack,
  RadioGroup,
  Link
} from '@chakra-ui/react'
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDisclosure } from '@chakra-ui/react'
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("white", "navy.700");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const { isOpen: isOpenNav, onOpen: onOpenNav, onClose: onCloseNav } = useDisclosure()
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    setShow(!show);
    router
  }
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <DefaultAuth>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Sign In
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Enter your email and password to sign in!
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
            {/* <Button
              fontSize='sm'
              me='0px'
              mb='26px'
              py='15px'
              h='50px'
              borderRadius='16px'
              bg={googleBg}
              color={googleText}
              fontWeight='500'
              _hover={googleHover}
              _active={googleActive}
              _focus={googleActive}>
              <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
              Sign in with Google
            </Button> */}
            <Flex align='center' mb='25px'>
              <HSeparator />
              {/* <Text color='gray.400' mx='14px'>
                or
              </Text> */}
              <HSeparator />
            </Flex>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                color="white"
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='email'
                placeholder='mail@domain.com'
                mb='24px'
                fontWeight='500'
                size='lg'
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  color="white"
                  fontSize='sm'
                  placeholder='Min. 8 characters'
                  mb='24px'
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent='space-between' align='center' mb='24px'>
                <FormControl display='flex' alignItems='center'>
                  <Checkbox
                    id='remember-login'
                    colorScheme='brandScheme'
                    me='10px'
                  />
                  <FormLabel
                    htmlFor='remember-login'
                    mb='0'
                    fontWeight='normal'
                    color={textColor}
                    fontSize='sm'>
                    Keep me logged in
                  </FormLabel>
                </FormControl>
                <NavLink to='/auth/forgot-password'>
                  <Text
                    color={textColorBrand}
                    fontSize='sm'
                    w='124px'
                    fontWeight='500'>
                    Forgot password?
                  </Text>
                </NavLink>
              </Flex>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={onOpenNav}>
                Sign In
              </Button>
              <Modal isCentered isOpen={isOpenNav} onClose={onCloseNav} size='full'>
                <ModalContent>
                  <ModalHeader>
                    {/* Select your Role */}
                  </ModalHeader>
                  <ModalBody>
                    <Box paddingTop={{ xl: "130px" }}>
                      <Flex>
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          textAlign="center"
                          w="100%"
                        // mx="auto"
                        >
                          <Text
                            color={!textColor}
                            fontSize={{ sm: "xl", md: "100" }}
                            fontWeight="bold"
                            mb="4px"
                          >
                            Select Your Role
                          </Text>
                          {/* <Text color="gray.400" fontWeight="normal" fontSize="sm">
                          Please enter project details below
                        </Text> */}
                        </Flex>
                      </Flex>
                      <Flex
                        // mx="auto"
                        direction="column"
                        minH="10vh"
                        align="center"
                        pt={{ sm: "125px", lg: "75px" }}
                      >
                        <Flex alignContent="center" width={{ base: '100%', sm: '50%', md: '25%' }} flexDirection="row" mx="auto">
                          <Stack align="left" direction={{ sm: "column", md: "row" }}>
                            <NavLink to='/admin/default' w="100%" margin="10">
                              <Button
                                fontSize='xl'
                                variant='brand'
                                fontWeight='500'
                                width={{ base: "25%", sm: '50%', md: '100%' }}
                                h='3rem'
                                // mb='100'
                                mr={{ md: "100" }}
                                // mr={{ md: "200" }}
                                onClick={onOpenNav}>
                                Provider
                              </Button>
                            </NavLink>
                            <NavLink to='/admin/node' w="100%" margin="10">
                              <Button
                                fontSize='xl'
                                variant='brand'
                                fontWeight='500'
                                width={{ base: "25%", sm: '50%', md: '100%' }}
                                h='3rem'
                                // mb='100'
                                mr={{ md: "100" }}
                                // mr="50"
                                onClick={onOpenNav}>
                                Node
                              </Button>
                            </NavLink>
                          </Stack>
                        </Flex>
                      </Flex>
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </FormControl>
            {/* <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'>
              <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                Not registered yet?
                <NavLink to='/auth/sign-up'>
                  <Text
                    color={textColorBrand}
                    as='span'
                    ms='5px'
                    fontWeight='500'>
                    Create an Account
                  </Text>
                </NavLink>
              </Text>
            </Flex> */}
          </Flex>
        </Flex>
      </DefaultAuth >
    </DefaultAuth >
  );
}

export default SignIn;
