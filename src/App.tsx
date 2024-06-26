import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import ChatScreen from "./components/ChatScreen";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box height="100vh" display="flex" flexDirection="column">
        <Box flex="1" overflowY="auto">
          <ChatScreen />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
