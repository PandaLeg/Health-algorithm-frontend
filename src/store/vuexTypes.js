const mutations = {
    UPDATE_USER_AUTH: 'UPDATE_USER_AUTH',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    CLEAR_ALL_DATA: 'CLEAR_ALL_DATA',
    UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION'
}

const actions = {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SEND_CONFIRMATION: 'SEND_CONFIRMATION'
}

const getters = {
    isLoggedIn: 'isLoggedIn',
    token: 'token',
    notification: 'notification'
}

export const vuexTypes = {
    ...mutations,
    ...actions,
    ...getters
}
