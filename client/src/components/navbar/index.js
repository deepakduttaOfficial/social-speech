import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const Wraper = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Topbar onOpen={onOpen} />
      <VStack ml={{ base: 0, md: 60 }} p="4">
        {children}
      </VStack>
    </Box>
  );
};

export default Wraper;
