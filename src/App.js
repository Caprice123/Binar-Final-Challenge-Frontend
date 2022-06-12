import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='' />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
