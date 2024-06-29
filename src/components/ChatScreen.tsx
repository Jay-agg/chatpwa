import React, { useState, useEffect, useRef, useCallback } from "react";
import { ReactComponent as SendIcon } from "../assets/icons/send.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/Profile.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document.svg";
import { ReactComponent as VideoIcon } from "../assets/icons/video.svg";
import { ReactComponent as CameraIcon } from "../assets/icons/camera.svg";
import { ReactComponent as AttachmentIcon } from "../assets/icons/paperclip.svg";

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

import { FiFile, FiPhoneCall, FiUsers } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addMessages, incrementPage, sendMessage } from "../redux/chatSlice";
import axios from "axios";
import { Message } from "../types/Message";
import ChatMessage from "./ChatMessage";

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const page = useSelector((state: RootState) => state.chat.page);
  const [groupName, setGroupName] = useState("Trip 1");
  const [newMessage, setNewMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLoad = useRef(true); // flag to check initial load
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchMessages = async (page: number) => {
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${page}`
      );
      dispatch(addMessages(response.data.chats));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page, dispatch]);

  useEffect(() => {
    // Scroll to the bottom on initial load
    if (initialLoad.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      initialLoad.current = false; // reset the flag after initial load
    }
  }, [messages]);

  const lastMessageRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && messages.length > 0) {
          dispatch(incrementPage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [messages, dispatch]
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: new Date().toISOString(),
        message: newMessage,
        sender: {
          image: "https://via.placeholder.com/150",
          is_kyc_verified: true,
          self: true,
          user_id: "1",
        },
        time: new Date().toISOString(),
      };
      dispatch(sendMessage(message));
      setNewMessage("");
      // Scroll to the bottom after sending a message
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  };

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
            maxWidth={msg.sender.self ? "85%" : "90%"}
            alignSelf={msg.sender.self ? "flex-end" : "flex-start"}
          >
            <ChatMessage message={msg} />
          </Box>
          {index === 0 && <div ref={lastMessageRef} />}
        </React.Fragment>
      );
    });
  };

  return (
    <Box
      height="100vh"
      bg="rgba(250, 249, 244, 1)"
      display="flex"
      flexDirection="column"
    >
      <Box
        position="sticky"
        top="0"
        zIndex="1000"
        bg="rgba(250, 249, 244, 1)"
        borderBottom="1px solid"
        borderColor="gray.200"
        width="100%"
      >
        <HStack>
          <IconButton
            icon={<BackIcon />}
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
          <HStack flex={1}>
            <IconButton
              aria-label="Edit Group"
              icon={<EditIcon />}
              ml={"auto"}
              mr={"5"}
              variant={"ghost"}
              mt={5}
            />
          </HStack>
        </HStack>

        <HStack p={4} justify="space-between">
          <HStack>
            <AvatarGroup size="md" max={2}>
              <Avatar icon={<ProfileIcon />} />
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
            <Menu>
              <MenuButton as={IconButton} icon={<MenuIcon />} variant="black" />
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
      <Box
        position="sticky"
        bottom="0"
        zIndex="1000"
        bg="rgba(250, 249, 244, 1)"
        width="100%"
      >
        <Divider />
        <InputGroup p={4} marginBottom={4}>
          <Input
            placeholder="Reply to @Rohit Yadav"
            bg={"white"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <InputRightElement width="auto">
            <Flex align="center" mt={8}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<AttachmentIcon />}
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
                      leftIcon={<CameraIcon />}
                      p={4}
                      borderRadius={50}
                    ></Button>
                    <Button
                      leftIcon={<VideoIcon />}
                      colorScheme="white"
                      variant="white"
                    ></Button>
                    <Button
                      leftIcon={<DocumentIcon />}
                      colorScheme="white"
                      variant="white"
                    ></Button>
                  </ButtonGroup>
                </MenuList>
              </Menu>
              <Button
                aria-label="Send"
                leftIcon={<SendIcon />}
                colorScheme="black"
                p={0}
                variant="ghost"
                mr={5}
                onClick={handleSendMessage}
              />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default ChatScreen;
