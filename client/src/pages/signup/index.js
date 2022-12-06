import { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra ui
import {
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Icons
import { SiGnuprivacyguard } from "react-icons/si";
// Custom file import
import AuthInput from "../../components/input/AuthInput";
import AuthButton from "../../components/button/AuthButton";
// error animation -- React toastify
import { ToastContainer, toast } from "react-toastify";
import { signupErrorHandaler } from "../errorHandaler/auth";

const Signup = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const [errorHandle, setErrorHandle] = useState({});
  const { name, email, password, loading } = value;

  const handleChange = (name) => (e) => {
    setValue({
      ...value,
      [name]: e.target.value,
      error: false,
      success: false,
      loading: false,
    });
    setErrorHandle(false);
  };

  const isSubmit = () => {
    const errors = signupErrorHandaler(value);
    setErrorHandle(errors);
    if (JSON.stringify(errors) !== "{}") return;
    setValue({ ...value, loading: true });
    toast.success("Sign up success", {
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <>
      <Container mt={10}>
        <ToastContainer />
        <VStack
          border={"1px"}
          borderColor={useColorModeValue("gray.300", "gray.700")}
          p={[2, 5, 7]}
          spacing={8}
          borderRadius={"md"}
          bgColor={useColorModeValue("whiteAlpha.900", "gray.700")}
        >
          <VStack>
            <SiGnuprivacyguard fontSize={"3rem"} />
            <Heading>Sign up</Heading>
          </VStack>
          <form style={{ width: "100%" }}>
            <VStack w={"full"} spacing={5}>
              <AuthInput
                lable={"Enter your Fullname"}
                value={name}
                onChange={handleChange("name")}
                error={errorHandle?.name}
              />
              <AuthInput
                lable={"Enter your Email"}
                value={email}
                onChange={handleChange("email")}
                error={errorHandle?.email}
              />
              <AuthInput
                lable={"Enter your Password"}
                value={password}
                onChange={handleChange("password")}
                type={"password"}
                error={errorHandle?.password}
                autoComplete={"true"}
              />

              <Stack w="full">
                <Text
                  fontSize={"sm"}
                  as={NavLink}
                  to="/signin"
                  color="blue.400"
                  _hover={{ textDecoration: "underLine" }}
                >
                  Already have an acount? Sign in.
                </Text>
              </Stack>
            </VStack>
            <AuthButton
              onClick={isSubmit}
              disabled={loading}
              isLoading={loading}
              loadingText="Submitting"
              name={"Sign up"}
            />
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Signup;
