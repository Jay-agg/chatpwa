import React from "react";
import { Box, Text, Avatar, HStack } from "@chakra-ui/react";
import { Message } from "../types/Message";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <HStack align="start" spacing={2} width="100%">
      {message.sender.self ? "" : <Avatar src={message.sender.image} />}
      <Box
        bg={message.sender.self ? "blue.600" : "white"}
        boxShadow={"md"}
        p={4}
        borderRadius="lg"
        flex="1"
      >
        <Text
          color={message.sender.self ? "white" : "grey.600"}
          fontWeight={"normal"}
        >
          {message.message}
        </Text>
        <Text fontSize="xs" color="grey.300">
          {new Date(message.time).toLocaleString()}
        </Text>
      </Box>
    </HStack>
  );
};

export default ChatMessage;
