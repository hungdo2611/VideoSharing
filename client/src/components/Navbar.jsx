import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box, Text, Flex, flexbox } from '@chakra-ui/react';
import { updateUser } from "../redux/action";
import { useNavigate } from "react-router-dom";

export const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 768);
}

const Navbar = ({ hideRight }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    let ismobile = useCheckMobileScreen();
    console.log('ismobile', ismobile);
    console.log("user", user);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(updateUser(null));
        localStorage.setItem("user", null);


    };
    const onClickShareVideo = () => {
        navigate('share');
    }
    if (ismobile) {
        return (
            <Box   >
                <Box display={"flex"} flexDirection={"column"}>
                    <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Video Sharing</NavLink>
                    <Text px={2} >wellcome {user?.userInfo?.email}</Text>

                </Box>


                {!hideRight && <Box>
                    {!user?.userInfo && <Box>
                        <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                    </Box>}
                    {user?.userInfo && <Box p={2} flexDirection={"column"} display="flex" alignItems='baseline' >
                        <Box gap={10} display="flex" flexDirection={"row"}>
                            <Button onClick={onClickShareVideo} w={100}>Share Video</Button>
                            <Button w={100} onClick={onLogout}>Log Out</Button>
                        </Box>
                    </Box>}

                </Box>}



            </Box>
        )
    }
    return (
        <Flex p={5} alignItems={'center'} justifyContent={'space-between'} >
            <Box>
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Video Sharing</NavLink>
                <Text px={2}>wellcome {user?.userInfo?.email}</Text>
            </Box>
            <Box>
                {!user?.userInfo && <Box>
                    <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                    <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                </Box>}
                {user?.userInfo && <Box display="flex" alignItems='baseline' gap={10}>
                    <Button onClick={onClickShareVideo} w={200}>Share Video</Button>

                    <Button w={200} onClick={onLogout}>Log Out</Button>
                </Box>}
            </Box>



        </Flex>
    )
}

export default Navbar