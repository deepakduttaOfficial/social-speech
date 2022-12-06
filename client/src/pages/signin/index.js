import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
// Chakra ui
import {
  Container,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Icons
import { SiGnuprivacyguard } from "react-icons/si";
// Custom file import
import AuthInput from "../../components/input/AuthInput";
import AuthButton from "../../components/button/AuthButton";
import { signinErrorHandaler } from "../errorHandaler/auth";
// error animation -- React toastify
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuthenticate, signin } from "../apiHelper/auth";

const Signup = () => {
  const [value, setValue] = useState({
    userId: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const [errorHandle, setErrorHandle] = useState({});
  const { userId, password, loading } = value;

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
    const errors = signinErrorHandaler(value);
    setErrorHandle(errors);
    if (JSON.stringify(errors) !== "{}") return;

    setValue({ ...value, error: false, success: false, loading: true });

    signin({ userId, password }).then((response) => {
      if (response.error) {
        setValue({ error: true, success: false, loading: false });
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      } else {
        authenticate(response, () => {
          setValue({
            userId: "",
            password: "",
            error: false,
            success: true,
            loading: false,
          });
          toast.success(`Redirecting`, { theme: "dark", autoClose: 2000 });
        });
      }
    });
  };
  const navigatePerformed = () => {
    if (isAuthenticate()) {
      return <Navigate to={`/`} />;
    }
  };

  return (
    <>
      {navigatePerformed()}
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
            <Heading>Sign in</Heading>
          </VStack>
          <VStack w={"full"} spacing={5}>
            <AuthInput
              lable={"Enter your userId"}
              value={userId}
              onChange={handleChange("userId")}
              error={errorHandle?.userId}
            />
            <AuthInput
              lable={"Enter your Password"}
              value={password}
              onChange={handleChange("password")}
              type={"password"}
              error={errorHandle?.password}
              autoComplete={"true"}
            />

            <HStack justifyContent={"space-between"} w="full">
              <Text
                fontSize={"sm"}
                as={NavLink}
                to="/signup"
                color="blue.400"
                _hover={{ textDecoration: "underLine" }}
              >
                Don't have any acount? Sign up.
              </Text>
              <Text
                fontSize={"sm"}
                as={NavLink}
                to="/"
                color="blue.400"
                _hover={{ textDecoration: "underLine" }}
              >
                Forget password
              </Text>
            </HStack>
          </VStack>
          <AuthButton
            onClick={isSubmit}
            disabled={loading}
            isLoading={loading}
            loadingText="Submitting"
            name={"Sign in"}
          />
        </VStack>
      </Container>
    </>
  );
};

export default Signup;
