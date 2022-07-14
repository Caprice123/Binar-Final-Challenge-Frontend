import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

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

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/daftar-jual" element={
            //   <ProtectedRoute allowedRoles={[]}>
								<DaftarJual />
							// </ProtectedRoute>
            } 
          />
					<Route path="/login" element={
						<GoogleOAuthProvider clientId='120494598409-3fi90au9drcp47tkm4t180fekpf1qeb0.apps.googleusercontent.com'>
							<Login/>
						</GoogleOAuthProvider>
						} 
					/>
					<Route path="/daftar" element={
							<Registrasi/>
						} 
					/>

					<Route path='/' element={
							<ProtectedRoute allowedRoles={[]}>
								<AddProduct />
							</ProtectedRoute>
						} 
					/>
					<Route path='/user/profile' element={
							<ProtectedRoute allowedRoles={[]}>
								<InfoProfile />
							</ProtectedRoute>
						} 
					/>
					<Route path='/product/:productId' element={
							<ProtectedRoute allowedRoles={[]}>
								<InfoProduct />
							</ProtectedRoute>
						} 
					/>
					<Route path='/product/:productId/bid' element={
							<ProtectedRoute allowedRoles={[]}>
								<ProductBid />
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
