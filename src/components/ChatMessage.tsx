import React from "react";
import { Box, Text, Avatar, HStack } from "@chakra-ui/react";
import { Message } from "../types/Message";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <HStack align="start" spacing={2} width="100%">
      {message.sender.self ? (
        ""
      ) : (
        <Avatar src={message.sender.image} size={"sm"} />
      )}
      <Box
        bg={
          message.sender.self
            ? "rgba(28, 99, 213, 1)"
            : "rgba(255, 255, 255, 1)"
        }
        boxShadow={"md"}
        p={3}
        borderRadius="2xl"
        borderBottomEndRadius={message.sender.self ? "0" : "2xl"}
        borderTopStartRadius={message.sender.self ? "2xl" : "0"}
        flex="1"
      >
        <Text
          lineHeight={1.3}
          color={
            message.sender.self
              ? "rgba(255, 255, 255, 1)"
              : "rgba(96, 96, 96, 1)"
          }
          fontWeight={"normal"}
        >
          {message.message}
        </Text>
        {/* <Text fontSize="xs" color="grey.300">
          {new Date(message.time).toLocaleString()}
        </Text> */}
      </Box>
    </HStack>
  );
};

export default ChatMessage;
