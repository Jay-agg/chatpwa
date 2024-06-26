import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    //will add send message functionality if needed
  };

  return (
    <Box
      p={4}
      bg="white"
      position="fixed"
      bottom="0"
      width="100%"
      display="flex"
    >
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={handleSend} ml={2}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
