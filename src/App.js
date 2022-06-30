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
					{/* Auth Routes */}
					<Route path="/login" element={<Login/>} />
					<Route path="/register" element={<Registrasi/>} />

					{/* User Routes */}
					<Route path='/user/:id/update' element={<InfoProfile />} />

					{/* Product Routes */}
					<Route path='/product/add' element={<AddProduct />} />
					<Route path='/product/:productId' element={<InfoProduct />} />
					<Route path='/product/:productId/bid' element={<ProductBid />} />
				</Routes>
				<GlobalStyle />
			</Router>
		</Provider>
	);
}

export default App;
