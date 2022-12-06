import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavItem = ({ icon, link, children, ...rest }) => {
  const itemBg = useColorModeValue("#A0AEC0", "#0e1d36");
  const activeStyle = {
    backgroundColor: itemBg,
    color: "#ffffff",
  };
  return (
    <Flex
      as={NavLink}
      to={link}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
      <Icon mr="4" fontSize="16" as={icon} />
      {children}
    </Flex>
  );
};

export default NavItem;
