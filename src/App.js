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
import Wishlist from './pages/products/wishlist';
import SoldProducts from './pages/products/sold';
import Home from './pages/Home';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={
							<Home />
						} 
					/>
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
          			<Route path="/daftar-jual/wishlist" element={
							<ProtectedRoute allowedRoles={[]}>
								<Wishlist />
							</ProtectedRoute>
						} 
					/>
          			<Route path="/daftar-jual/sold" element={
							<ProtectedRoute allowedRoles={[]}>
								<SoldProducts />
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
