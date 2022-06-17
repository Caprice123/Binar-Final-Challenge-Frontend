import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';
import Login from './pages/login';
import Registrasi from './pages/registrasi';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/login" element={<Login/>} />
					<Route path="/daftar" element={<Registrasi/>} />

				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
