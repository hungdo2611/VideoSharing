import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Navbar } from "../components";
import { Link } from 'react-router-dom';
import { registerAPI } from "../apis/authenAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/action";
import { toast } from "react-toastify";

FormPage.propTypes = {};

function FormPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Email invalid")
            .required("Email cannot be empty"),
        password: yup
            .string()
            .required("Password cannot be empty")
            .min(6)
    });

    const form = useForm({
        resolver: yupResolver(schema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const handleSubmitForm = async (data) => {
        console.log(data);
        let req = await registerAPI({
            email: data?.email,
            password: data?.password
        });
        console.log("req", req)
        if (req && req?.data && !req?.err) {
            localStorage.setItem("user", JSON.stringify(req?.data));
            navigate("/");
            dispatch(updateUser(req?.data));
        }else{
            toast.error("Somethings wrong pls try again")
        }
    };

    return (
        <>
            <Navbar hideRight={true} />
            <Flex p={10} justify={"center"} direction={"column"} align={"center"}>
                <Heading>Register</Heading>

                <Box width={{ base: '90%', sm: '50%', md: '25%' }}>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <Flex direction={"column"} gap={5}>
                            <FormControl isInvalid={errors.email}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input placeholder="Email" {...register("email")} />
                                {errors.email && (
                                    <FormErrorMessage>
                                        {errors.email.message}
                                    </FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.password}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input type="password" placeholder="Password" {...register("password")} />
                                {errors.password && (
                                    <FormErrorMessage>
                                        {errors.password.message}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <Box>
                                Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link>
                            </Box>
                            <Box>
                                <Button width={{ base: '100%', sm: '50%', md: '25%' }} type="submit">Register</Button>
                            </Box>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </>
    );
}

export default FormPage;