import * as React from "react"
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Select,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base"
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { owner, veterinary } from "../constants"
import { makeGetRequest } from "../util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {
  let [username, setUsername] = React.useState("initial");
  let [password, setPassword] = React.useState("initial");
  let [userType, setUserType] = React.useState("initial");
  const navigate = useNavigate();

  function handleChange(e, func){
    func(e.target.value);
  }

  function handleSelectChange(e, func){
    func(e);
  }


  async function signIn(){
    let res;
    console.log(userType)
    if(userType.toLowerCase() === owner.toLowerCase())
      res = await makeGetRequest("/users/get_user_by_credentials/?user=" + username + "&password=" + password);
    else
      res = await makeGetRequest("/vets/get_user_by_credentials/?user=" + username + "&password=" + password);
    let user = res.data
    if(user.length == 0)
        toast("Invalid credentials")
    else{
      toast("Successfull login");
      navigate("/dashboard");
    }
    console.log(username + " " + password)
  }

  return (
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
      <FormControl>
          <FormControl.Label>User Type</FormControl.Label>
          <Select onValueChange={(e) => handleSelectChange(e, setUserType)}>
            <Select.Item label={veterinary} value={veterinary} />
            <Select.Item label={owner} value={owner} />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input onChange = {(e) => handleChange(e, setUsername)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input onChange={(e) => handleChange(e, setPassword)} type="password" />
          <Link
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Forget Password?
          </Link>
        </FormControl>
        <Button onPress={signIn} mt="2" colorScheme="indigo">
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            I'm a new user.{" "}
          </Text>
          <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            href="#"
          >
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <LoginPage />
      </Center>
      <ToastContainer/>
    </NativeBaseProvider>
  )
}

