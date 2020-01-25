import Reducer from './ToggleReducer'
import searchReducer from './SearchReducer'
import { combineReducers  } from 'redux';

 const RootReducer=combineReducers({
    toggle:Reducer,
    searchNote:searchReducer
})
export default RootReducer;