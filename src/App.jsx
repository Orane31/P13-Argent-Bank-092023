import Router from './components/Router'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import './App.css'
import './main.css'

function App() {
	return (
		<>
		<Provider store={store}>
			<Router />
		</Provider>
		
		</>
	);
}

export default App;
