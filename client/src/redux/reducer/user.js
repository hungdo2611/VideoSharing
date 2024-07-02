const initState = {
    userInfo: JSON.parse(localStorage.getItem('user'))
};


const handleUser = (state = initState, action) => {
    const user = action.payload;
    switch (action.type) {
        case "UPDATEUSER":
            return {
                ...state,
                userInfo: user
            }
        default:
            return state
            break;
    }
}

export default handleUser