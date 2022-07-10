import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';
import Login from './pages/login';
import Registrasi from './pages/registrasi';
import DaftarJual from './pages/DaftarJual'


import AddProduct from './pages/AddProduct';

import GlobalStyle from './GlobalStyle';
import InfoProfile from './pages/InfoProfile';
import InfoProduct from './pages/InfoProduct';
import ProductBid from './pages/ProductBid';
import ProtectedRoute from './pages/ProtectedRoute';
import ListProducts from './pages/products';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					{/* Auth Routes */}
					
					<Route path="/login" element={
							<Login/>
						} 
					/>
					<Route path="/register" element={
							<Registrasi/>
						} 
					/>

					{/* User Routes */}
					<Route path='/user/profile' element={
						<ProtectedRoute allowedRoles={[]}>
								<InfoProfile />
							</ProtectedRoute>
						} 
					/>

					{/* Product Routes */}
					<Route path='/product/add' element={
							<ProtectedRoute allowedRoles={[]}>
								<AddProduct />
							</ProtectedRoute>
						} 
					/>
					<Route path='/product/:productId' element={
							<InfoProduct />
						} 
					/>
					<Route path='/product/:productId/bid' element={
							<ProtectedRoute allowedRoles={[]}>
								<ProductBid />
							</ProtectedRoute>
						} 
            
					/>
          			<Route path="/daftar-jual" element={
							<ProtectedRoute allowedRoles={[]}>
								<ListProducts />
							</ProtectedRoute>
						} 
					/>
				</Routes>
				<GlobalStyle />
			</Router>
		</Provider>
	);
}

export default App;
