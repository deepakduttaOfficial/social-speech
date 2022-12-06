import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  WrapItem,
} from "@chakra-ui/react";

const Profile = () => {
  return (
    <Menu isLazy>
      <MenuButton>
        <WrapItem>
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
        </WrapItem>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>My post</MenuItem>
          <MenuItem>Save post</MenuItem>
          <MenuItem>Log out</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default Profile;
