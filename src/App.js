import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';


import AddProduct from './pages/AddProduct';

import Login from './pages/login/login';
import Registrasi from './pages/registrasi/registrasi';

import GlobalStyle from './GlobalStyle';
import Grid from './components/Grid';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
				<Route path="/login" element={<Login/>} />
					<Route path="/daftar" element={<Registrasi/>} />
					<Route path='/' element={<AddProduct />} />
					<Route path='/nav' element={<Grid />} />
				</Routes>
			</Router>
			<GlobalStyle />
		</Provider>
	);
}

export default App;
