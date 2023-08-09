export const host = process.env.REACT_APP_BACKEND_URL;

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;


