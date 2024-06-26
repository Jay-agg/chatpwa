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
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiSend } from "react-icons/bi";
import { FiCamera, FiFile, FiPhoneCall, FiUsers } from "react-icons/fi";
import axios from "axios";
import { Message } from "../types/Message";
import ChatMessage from "./ChatMessage";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(0);
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

  return (
    <Box height="100vh" bg="gray.50" display="flex" flexDirection="column">
      <Box
        position="sticky"
        top="0"
        zIndex="1000"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        width="100%"
      >
        <HStack p={4}>
          <AvatarGroup size="md" max={2}>
            <Avatar src="https://via.placeholder.com/150" />
            <Avatar src="https://via.placeholder.com/150" />
            <Avatar src="https://via.placeholder.com/150" />
          </AvatarGroup>
          <Box flex="1">
            <Text fontWeight="bold">Trip 1</Text>
            <Text fontSize="sm" color="gray.500">
              From IGI Airport, T3 to Sector 28
            </Text>
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BiDotsVerticalRounded />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem icon={<FiUsers />}>Members</MenuItem>
              <MenuItem icon={<FiPhoneCall />}>Share Number</MenuItem>
              <MenuItem icon={<FiFile />}>Report</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <Box
        ref={containerRef}
        flex="1"
        overflowY="auto"
        display="flex"
        flexDirection="column-reverse"
      >
        <VStack spacing={4} p={4}>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </VStack>
      </Box>
      <Box position="sticky" bottom="0" zIndex="1000" bg="white" width="100%">
        <Divider />
        <InputGroup p={4}>
          <Input placeholder="Reply to @Rohit Yadav" />
          <InputRightElement width="auto">
            <Flex align="center">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsVerticalRounded />}
                  variant="ghost"
                  mr={2}
                />
                <MenuList minWidth="0">
                  <HStack>
                    <MenuItem icon={<FiCamera />} />
                    <MenuItem icon={<FiFile />} />
                  </HStack>
                </MenuList>
              </Menu>
              <Button
                rightIcon={<BiSend />}
                colorScheme="teal"
                variant="solid"
              />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default ChatScreen;
