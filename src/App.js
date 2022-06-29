import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';
import Login from './pages/login';
import Registrasi from './pages/registrasi';


import AddProduct from './pages/AddProduct';

import GlobalStyle from './GlobalStyle';
import InfoProfile from './pages/InfoProfile';
import InfoProduct from './pages/InfoProduct';
import ProductBid from './pages/ProductBid';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/login" element={<Login/>} />
					<Route path="/daftar" element={<Registrasi/>} />

					<Route path='/' element={<AddProduct />} />
					<Route path='/user/profile' element={<InfoProfile />} />
					<Route path='/product/:productId' element={<InfoProduct />} />
					<Route path='/product/:productId/bid' element={<ProductBid />} />
				</Routes>
				<GlobalStyle />
			</Router>
		</Provider>
	);
}

export default App;
