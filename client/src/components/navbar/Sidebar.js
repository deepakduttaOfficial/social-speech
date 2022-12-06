// From charka ui
import {
  Icon,
  useColorMode,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
// Icons
import { MdFavoriteBorder } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { FaMoon, FaSun } from "react-icons/fa";

// Import from components
import Logo from "../../images/musicLogo.png";
import NavItem from "./NavItem";
import Searchbar from "../search";

const Sidebar = ({ onClose, ...rest }) => {
  const itemBg = useColorModeValue("#A0AEC0", "#011e3c");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("gray.300", "brand.default_dark")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      overflow={"scroll"}
      className={"sidebar"}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/" textAlign={"center"}>
          <Image
            src={Logo}
            alt="Brand Logo"
            borderRadius="full"
            boxSize="40px"
          />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <NavItem icon={FiHome} link="/">
        Home
      </NavItem>
      <Searchbar />
      <NavItem icon={MdFavoriteBorder} link="/fav">
        Favourites songs
      </NavItem>
      <NavItem icon={RiPlayListAddLine} link="/create/playlist">
        Create Playlist
      </NavItem>
      {/*  */}
      <Flex
        title={
          colorMode === "light"
            ? "Click to Dark mood on"
            : "Click to Light mood on"
        }
        onClick={toggleColorMode}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: itemBg,
          color: "#ffffff",
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          as={colorMode === "light" ? FaMoon : FaSun}
        />
        change appearance
      </Flex>
      <Divider my={5} />
    </Box>
  );
};

export default Sidebar;
