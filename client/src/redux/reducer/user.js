const initState = {
    userInfo: JSON.parse(localStorage.getItem('user'))
};
export let token = JSON.parse(localStorage.getItem('user'))?.token;

const handleUser = (state = initState, action) => {
    const user = action.payload;
    switch (action.type) {
        case "UPDATEUSER":
            token = user?.token;
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