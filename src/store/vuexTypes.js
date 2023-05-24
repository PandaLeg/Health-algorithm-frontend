const mutations = {
    UPDATE_USER_AUTH: 'UPDATE_USER_AUTH',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    CLEAR_ALL_DATA: 'CLEAR_ALL_DATA',
    UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
    SET_MOUNTED_STATE: 'SET_MOUNTED_STATE',
}

const actions = {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SEND_CONFIRMATION: 'SEND_CONFIRMATION',
    SEND_RESET_CODE: 'SEND_RESET_CODE',
    RESET_PASSWORD: 'RESET_PASSWORD',
}

const getters = {
    isLoggedIn: 'isLoggedIn',
    isAdmin: 'isAdmin',
    token: 'token',
    notification: 'notification'
}

export const vuexTypes = {
    ...mutations,
    ...actions,
    ...getters
}
