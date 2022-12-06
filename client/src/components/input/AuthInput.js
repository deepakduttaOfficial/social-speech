import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const AuthInput = ({
  lable,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}) => {
  return (
    <FormControl isInvalid={error}>
      <FormLabel>{lable}</FormLabel>
      <Input
        variant={"outline"}
        borderRadius={"md"}
        placeholder={lable}
        type={type}
        value={value}
        onChange={onChange}
        required
        autoComplete={autoComplete}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default AuthInput;
