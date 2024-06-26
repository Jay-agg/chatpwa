import React from "react";
import { Box, Text, Avatar, HStack } from "@chakra-ui/react";
import { Message } from "../types/Message";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <HStack align="start" spacing={4} width="100%">
      <Avatar src={message.sender.image} />
      <Box
        bg={message.sender.self ? "blue.100" : "gray.100"}
        p={4}
        borderRadius="md"
        flex="1"
      >
        <Text>{message.message}</Text>
        <Text fontSize="xs" color="gray.500">
          {new Date(message.time).toLocaleString()}
        </Text>
      </Box>
    </HStack>
  );
};

export default ChatMessage;
