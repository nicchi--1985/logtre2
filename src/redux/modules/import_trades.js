import { getApiHost } from '../../config'
const apiHost = getApiHost()

const SET_DATA = 'logtre/import/SET_DATA';
const UPLOADING = 'logtre/import/UPLOADING';
const SUCCESS = 'logtre/import/SUCCESS';

const initial_state = {
    uploadForm: {
        broker: 0, 
        file: {name: "ファイルを選択して下さい"}, 
        message: "", 
        loading: false
    }
}

export default function reducer(state=initial_state, action={}) {
    switch (action.type) {
        case SET_DATA:
            return Object.assign({}, state, {
                uploadForm: {
                broker: action.uploadForm.broker,
                file: action.uploadForm.file,
                message: "",
                loading: false
                }
            })
        case UPLOADING:
            return Object.assign({}, state, {
                uploadForm: {
                broker: state.uploadForm.broker,
                file: state.uploadForm.file,
                message: "",
                loading: true
                }
            })
        case SUCCESS:
            return Object.assign({}, state, {
                uploadForm: {
                broker: 0,
                file: {name: "ファイルを選択して下さい"},
                message: action.msg,
                loading: false
                }
            })
        default:
            return state
    }
}

function startUploadCSV() {
    return {
        type: UPLOADING
    }
}

function successUploadCSV(success_msg) {
    return {
        type: SUCCESS,
        msg: success_msg
    }
}

export function changeUploadForm(uploadForm) {
    return {
        type: SET_DATA,
        uploadForm: uploadForm
    }
}

export function uploadCSVFile(payload) {
    return (dispatch, getState) => {
        const { auth } = getState();
        const body = new FormData();
        body.append("broker", payload.broker);
        body.append("file", payload.file, payload.file.name);
        const fetch_cfg = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            },
            body: body
        }
        dispatch(startUploadCSV())
        return fetch(`${apiHost}/api/import`, fetch_cfg)
                .then((res) => {
                    if (res.status == "200") {
                        console.log("upload success");
                        dispatch(successUploadCSV("正常に取引履歴をアップロードしました"))
                    } else {
                        console.error("error occured uploading file")
                    }
                })
    }
}
