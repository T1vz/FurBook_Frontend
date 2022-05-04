const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    username:null,
    email:null,
    userId:null,
    token:null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:{
            // state.isAuth = true
            return {...state,...action.data}
        }
        default:{
            return state
        }
    }
}