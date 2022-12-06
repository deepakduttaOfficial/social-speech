import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Cardcom = ({
  userImage,
  userName,
  time,
  title,
  postPhoto,
  description,
}) => {
  return (
    <Card
      maxW="md"
      display={"inline-block"}
      bgColor={useColorModeValue("#fff", "gray.700")}
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src={userImage} />

            <Box>
              <Heading size="sm" pb={"2px"}>
                {userName}
              </Heading>
              <Text fontSize={"14px"}>{time}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <Heading size="md">{title}</Heading>
      </CardBody>
      {postPhoto && <Image objectFit="cover" src={postPhoto} alt="Chakra UI" />}
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <Divider />
      <CardFooter justify="space-between" px={"0px"}>
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cardcom;
