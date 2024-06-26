import React, { Suspense, lazy } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store";

const ChatScreen = lazy(() => import("./components/ChatScreen"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <ChatScreen />
        </Suspense>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
