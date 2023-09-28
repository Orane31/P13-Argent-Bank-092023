import Router from './components/Router'
import { Provider } from './context/Context'
import './App.css'
import './main.css'

function App() {
	return (
		<>
		<Provider>
			<Router />
		</Provider>
		
		</>
	);
}

export default App;
