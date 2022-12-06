import { NavLink } from "react-router-dom";
import {
  IconButton,
  Flex,
  HStack,
  useColorModeValue,
  Link,
  Image,
  Button,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Logo from "../../images/musicLogo.png";
import Profile from "../avatar/Profile";
import { isAuthenticate } from "../../pages/apiHelper/auth";

const Topbar = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("gray.300", "brand.default_dark")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      pos={"sticky"}
      zIndex="10"
      top={0}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Link
        href="/"
        textAlign={"center"}
        display={{ base: "flex", md: "none" }}
      >
        <Image src={Logo} alt="Brand Logo" borderRadius="full" boxSize="40px" />
      </Link>

      <HStack spacing={{ base: "0", md: "1" }}>
        {isAuthenticate() ? (
          <Profile />
        ) : (
          <Button
            colorScheme="blue"
            as={NavLink}
            to={"/signin"}
            variant="solid"
          >
            Sign in
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default Topbar;
