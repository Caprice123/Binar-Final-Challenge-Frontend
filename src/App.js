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
import ProtectedRoute from './ProtectedRoute';
import ListProducts from './pages/product';
import Wishlist from './pages/product/wishlist';
import SoldProducts from './pages/product/sold';
import Home from './pages';

import { ADD_PRODUCT_ROUTE, BID_ROUTE, DAFTAR_JUAL_ROUTE, HOME_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, PRODUCTS_ROUTE, REGISTER_ROUTE, SOLD_PRODUCT_ROUTE, UPDATE_PRODUCT_ROUTE, USER_PROFILE_ROUTE, WISHLIST_ROUTE } from './types/pages';
import Logout from './pages/logout';
import UpdateProduct from './pages/product/productId/update';

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
							<Login/>
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
								<AddProduct />
							</ProtectedRoute>
						} 
					/>
					<Route exact path={PRODUCTS_ROUTE + "/:productId"} element={
							<InfoProduct />
						} 
					/>
					<Route exact path={PRODUCTS_ROUTE + "/:productId" + UPDATE_PRODUCT_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<UpdateProduct />
							</ProtectedRoute>
						} 
					/>
					<Route exact path={PRODUCTS_ROUTE + "/:productId" + BID_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<ProductBid />
							</ProtectedRoute>
						} 
            
					/>
          			<Route exact path={DAFTAR_JUAL_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<ListProducts />
							</ProtectedRoute>
						} 
					/>
          			<Route exact path={WISHLIST_ROUTE} element={
							<ProtectedRoute allowedRoles={[]}>
								<Wishlist />
							</ProtectedRoute>
						} 
					/>
          			<Route exact path={SOLD_PRODUCT_ROUTE} element={
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
