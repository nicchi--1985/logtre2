const initial_state = {
  trades: [{id:"1",name:"first"},{id:"2",name:"second"},{id:"3",name:"third"}],
  auth: {token: null, username: null},
  performanceSummary: {gain_loss: null, roi: null, trade_count: null},
  brokers: [],
  products: [],
  chartData: {
    data: [],
    time_unit: "month"
  },
  radarData: [],
  uploadForm: {broker: 0, file: {name: "ファイルを選択して下さい"}, message: ""}
}

export default function reducer(state=initial_state, action) {
  switch (action.type) {
    case 'RECEIVE_TRADES':
      return Object.assign({}, state, {
        trades: action.payload
      })
    case 'SET_TOKEN':
      console.log('storing token');
      return Object.assign({}, state, {
        auth: {token: action.token, username: "success"}
      })
    case 'SET_USER':
      console.log('set user info');
      return Object.assign({}, state, {
        user: {
          id: action.payload.id,
          name: action.payload.name
        }
      })
    case "CHANGE_UPLOAD_FORM":
      return Object.assign({}, state, {
        uploadForm: {
          broker: action.uploadForm.broker,
          file: action.uploadForm.file,
          message: ""
        }
      })
    case "SUCCESS_UPLOAD_FORM":
      return Object.assign({}, state, {
        uploadForm: {
          broker: 0,
          file: {name: "ファイルを選択して下さい"},
          message: action.msg
        }
      })
    case "RECEIVE_SUMMARY":
      return Object.assign({}, state, {
        performanceSummary: action.summary
      })
    case "RECEIVE_BROKERS":
      return Object.assign({}, state, {
        brokers: action.brokers
      })
    case "RECEIVE_PRODUCTS":
      return Object.assign({}, state, {
        products: action.products
      })
    case "RECEIVE_CHARTDATA":
      return Object.assign({}, state, {
        chartData: {
          data: action.payload.data,
          time_unit: action.payload.time_unit
        }
      })
    case "RECEIVE_RADARDATA":
      return Object.assign({}, state, {
        radarData: action.payload
      })
    default:
      return state
  }
}
