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
import ProtectedRoute from './auth-components/ProtectedRoute';
import ListProducts from './pages/product';
import Wishlist from './pages/product/wishlist';
import SoldProducts from './pages/product/sold';
import Home from './pages';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ADD_PRODUCT_ROUTE, BID_ROUTE, DAFTAR_JUAL_ROUTE, HOME_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, PRODUCTS_ROUTE, REGISTER_ROUTE, SOLD_PRODUCT_ROUTE, UPDATE_PRODUCT_ROUTE, USER_PROFILE_ROUTE, WISHLIST_ROUTE } from './types/pages';
import Logout from './pages/logout';
import UpdateProduct from './pages/product/productId/update';
import PhoneProtectedRoute from './auth-components/PhoneProtectedRoute';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route exact path={HOME_ROUTE} element={
							<Home />
						} 
					/>
					{/* Auth Routes */}
					
					<Route exact path={LOGIN_ROUTE} element={
							<GoogleOAuthProvider clientId='120494598409-3fi90au9drcp47tkm4t180fekpf1qeb0.apps.googleusercontent.com'>
								<Login/>
							</GoogleOAuthProvider>
						} 
					/>
					<Route exact path={REGISTER_ROUTE} element={
							<Registrasi/>
						} 
					/>
					<Route exact path={LOGOUT_ROUTE} element={
							<Logout />
						}
					/>

					{/* User Routes */}
					<Route exact path={USER_PROFILE_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<InfoProfile />
							</ProtectedRoute>
						} 
					/>

					{/* Product Routes */}
					<Route exact path={ADD_PRODUCT_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<PhoneProtectedRoute>
									<AddProduct />
								</PhoneProtectedRoute>
							</ProtectedRoute>
						} 
					/>
					<Route exact path={PRODUCTS_ROUTE + "/:productId"} element={
							<PhoneProtectedRoute>
								<InfoProduct />
							</PhoneProtectedRoute>
						} 
					/>
					<Route exact path={PRODUCTS_ROUTE + "/:productId" + UPDATE_PRODUCT_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<PhoneProtectedRoute>
									<UpdateProduct />
								</PhoneProtectedRoute>
							</ProtectedRoute>
						} 
					/>
					<Route exact path={PRODUCTS_ROUTE + "/:productId" + BID_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<PhoneProtectedRoute>
									<ProductBid />
								</PhoneProtectedRoute>
							</ProtectedRoute>
						} 
            
					/>
          			<Route exact path={DAFTAR_JUAL_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<PhoneProtectedRoute>
									<ListProducts />
								</PhoneProtectedRoute>
							</ProtectedRoute>
						} 
					/>
          			<Route exact path={WISHLIST_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<PhoneProtectedRoute>
									<Wishlist />
								</PhoneProtectedRoute>
							</ProtectedRoute>
						} 
					/>
          			<Route exact path={SOLD_PRODUCT_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<PhoneProtectedRoute>
									<SoldProducts />
								</PhoneProtectedRoute>
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
