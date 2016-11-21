import { getApiHost } from '../../config'
const apiHost = getApiHost()

const SET_TOKEN = 'logtre/auth/SET_TOKEN';
const SET_USER = 'logtre/auth/SET_USER';

const initial_state = {
    token: null, 
    user: {
        id: null,
        name: null
    }
}

export default function reducer(state=initial_state, action={}) {
    switch (action.type) {
        case SET_TOKEN:
            return Object.assign({}, state, {
                token: action.token
            })
        case SET_USER:
            return Object.assign({}, state, {
                user: {
                id: action.payload.id,
                name: action.payload.name
                }
            })
        default:
            return state
    }
}

function storeToken(token) {
    return {
        type: SET_TOKEN,
        token: token
    }
}

function storeUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function authWithFacebook(url) {
    return (dispatch) => {
        const config = {}
        return fetch(url, config)
        .then(res => {
            return res.json()
        })
        .then(token => {
            dispatch(storeToken(token))
        }).catch(err => console.log(err))
    }
}

export function successAuthentication(token) {
    return (dispatch) => {
        dispatch(storeToken(token));
        const fetch_cfg = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        return fetch(`${apiHost}/api/me`, fetch_cfg)
                .then((res) => {
                    return res.json();
                })
                .then((user) => {
                    dispatch(storeUser(user));
                })
                .catch((err) => {
                    console.error('error occured');
                    console.error(err);
                })
    }
}
