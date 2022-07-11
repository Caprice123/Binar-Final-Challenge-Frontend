import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';
import Login from './pages/login';
import Registrasi from './pages/register';


import AddProduct from './pages/product/add';

import GlobalStyle from './GlobalStyle';
import InfoProfile from './pages/user/profile';
import InfoProduct from './pages/product/productId';
import ProductBid from './pages/product/productId/bid';
import ProtectedRoute from './pages/ProtectedRoute';
import ListProducts from './pages/product';
import Wishlist from './pages/product/wishlist';
import SoldProducts from './pages/product/sold';
import Home from './pages';

import { ADD_PRODUCT_ROUTE, BID_ROUTE, DAFTAR_JUAL_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE, REGISTER_ROUTE, SOLD_PRODUCT_ROUTE, USER_PROFILE_ROUTE, WISHLIST_ROUTE } from './types/pages';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path={HOME_ROUTE} element={
							<Home />
						} 
					/>
					{/* Auth Routes */}
					
					<Route path={LOGIN_ROUTE} element={
							<Login/>
						} 
					/>
					<Route path={REGISTER_ROUTE} element={
							<Registrasi/>
						} 
					/>

					{/* User Routes */}
					<Route path={USER_PROFILE_ROUTE} element={
						<ProtectedRoute allowedRoles={[]}>
								<InfoProfile />
							</ProtectedRoute>
						} 
					/>

					{/* Product Routes */}
					<Route path={ADD_PRODUCT_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<AddProduct />
							</ProtectedRoute>
						} 
					/>
					<Route path={PRODUCTS_ROUTE + "/:productId"} element={
							<InfoProduct />
						} 
					/>
					<Route path={PRODUCTS_ROUTE + "/:productId" + BID_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<ProductBid />
							</ProtectedRoute>
						} 
            
					/>
          			<Route path={DAFTAR_JUAL_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<ListProducts />
							</ProtectedRoute>
						} 
					/>
          			<Route path={WISHLIST_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<Wishlist />
							</ProtectedRoute>
						} 
					/>
          			<Route path={SOLD_PRODUCT_ROUTE} element={
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
