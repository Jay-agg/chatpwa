import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  AvatarGroup,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiSend, BiEditAlt } from "react-icons/bi";
import { FiCamera, FiFile, FiPhoneCall, FiUsers } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { BsFileArrowDown } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { Message } from "../types/Message";
import ChatMessage from "./ChatMessage";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(0);
  const [groupName, setGroupName] = useState("Trip 1");
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLoad = useRef(true);

  const fetchMessages = async (page: number) => {
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${page}`
      );
      setMessages((prevMessages) => [...response.data.chats, ...prevMessages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  useEffect(() => {
    if (initialLoad.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      initialLoad.current = false;
    }
  }, [messages]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      if (containerRef.current.scrollTop < 100) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const renderMessages = () => {
    let lastDate = "";
    return messages.map((msg, index) => {
      const messageDate = new Date(msg.time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const showDateDivider = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <React.Fragment key={msg.id}>
          {showDateDivider && (
            <HStack width="100%" justifyContent="center" my={4}>
              <Divider />
              <Text fontSize="sm" color="gray.500" px={2}>
                {messageDate}
              </Text>
              <Divider />
            </HStack>
          )}
          <Box
            maxWidth="300px"
            alignSelf={msg.sender.self ? "flex-end" : "flex-start"}
          >
            <ChatMessage message={msg} />
          </Box>
        </React.Fragment>
      );
    });
  };

  return (
    <Box height="100vh" bg="pink.50" display="flex" flexDirection="column">
      <Box
        position="sticky"
        top="0"
        zIndex="1000"
        bg="pink.50"
        borderBottom="1px solid"
        borderColor="gray.200"
        width="100%"
      >
        <HStack>
          <IconButton
            icon={<IoArrowBack />}
            aria-label="Edit Group"
            variant="black"
            ml={5}
            mt={5}
          />
          <Editable
            value={groupName}
            onChange={setGroupName}
            fontSize="3xl"
            color="black"
            fontWeight="bold"
            ml={5}
            mt={5}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </HStack>

        <HStack p={4} justify="space-between">
          <HStack>
            <AvatarGroup size="md" max={2}>
              <Avatar src="https://via.placeholder.com/150" />
              <Avatar src="https://via.placeholder.com/150" />
              <Avatar src="https://via.placeholder.com/150" />
            </AvatarGroup>

            <Box flex="1">
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  From
                </Text>
                <Text fontSize="sm" color="black" fontWeight={"bold"}>
                  IGI Airport, T3
                </Text>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  to
                </Text>
                <Text fontSize="sm" color="black" fontWeight={"bold"}>
                  Sector 28
                </Text>
              </HStack>
            </Box>
          </HStack>
          <HStack>
            <IconButton
              icon={<BiEditAlt />}
              aria-label="Edit Group"
              variant="black"
            />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BiDotsVerticalRounded />}
                variant="black"
              />
              <MenuList>
                <MenuItem icon={<FiUsers />}>Members</MenuItem>
                <MenuItem icon={<FiPhoneCall />}>Share Number</MenuItem>
                <MenuItem icon={<FiFile />}>Report</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Box>
      <Box
        ref={containerRef}
        flex="1"
        overflowY="auto"
        display="flex"
        flexDirection="column-reverse"
      >
        <VStack spacing={4} p={4} width="100%">
          {renderMessages()}
        </VStack>
      </Box>
      <Box position="sticky" bottom="0" zIndex="1000" bg="pink.50" width="100%">
        <Divider />
        <InputGroup p={4} marginBottom={4}>
          <Input placeholder="Reply to @Rohit Yadav" bg={"white"} />
          <InputRightElement width="auto">
            <Flex align="center" mt={8}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<GrAttachment />}
                  variant="black"
                  mr={2}
                />
                <MenuList
                  minWidth="0"
                  bg={"green"}
                  borderRadius={25}
                  border={"green"}
                >
                  <ButtonGroup variant="ghost" spacing="0.5">
                    <Button
                      colorScheme="white"
                      variant="white"
                      leftIcon={<MdOutlineCameraAlt />}
                      p={4}
                      borderRadius={50}
                    ></Button>
                    <Button
                      leftIcon={<IoVideocamOutline />}
                      colorScheme="white"
                      variant="white"
                    ></Button>
                    <Button
                      leftIcon={<BsFileArrowDown />}
                      colorScheme="white"
                      variant="white"
                    ></Button>
                  </ButtonGroup>
                </MenuList>
              </Menu>
              <Button
                rightIcon={<BiSend />}
                colorScheme="black"
                p={0}
                variant="ghost"
                mr={5}
              />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default ChatScreen;
