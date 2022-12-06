import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  FormControl,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Searchbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemBg = useColorModeValue("gray.400", "brand.100");

  return (
    <Box>
      <Flex
        onClick={onOpen}
        bgColor={isOpen && itemBg}
        color={isOpen && "#ffffff"}
        transform={isOpen && "scale(1.04)"}
        transition={isOpen && "0.5s"}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: itemBg,
          color: "white",
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={BsSearch}
        />
        Search
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <FormControl as={"form"}>
              <InputGroup py={3}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BsSearch color="gray.300" size={20} />}
                  mt={"7px"}
                />
                <Input
                  placeholder="Search your music"
                  size="lg"
                  variant="unstyled"
                  ml={2}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Searchbar;
