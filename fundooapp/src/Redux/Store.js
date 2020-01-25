import { createStore  } from 'redux';
//import RootReducer from './RootReducer'
import Reducer from './ToggleReducer'

const store = createStore(Reducer);

export default store;