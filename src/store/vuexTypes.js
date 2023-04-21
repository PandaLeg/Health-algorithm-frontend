const mutations = {
    UPDATE_USER_AUTH: 'UPDATE_USER_AUTH',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    CLEAR_ALL_DATA: 'CLEAR_ALL_DATA'
}

const actions = {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

const getters = {
    isLoggedIn: 'isLoggedIn',
    token: 'token'
}

export const vuexTypes = {
    ...mutations,
    ...actions,
    ...getters
}
