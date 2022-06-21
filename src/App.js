import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';


import AddProduct from './pages/AddProduct';

import GlobalStyle from './GlobalStyle';
import InfoProfile from './pages/InfoProfile';
import InfoProduct from './pages/InfoProduct';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<AddProduct />} />
					<Route path='/user/profile' element={<InfoProfile />} />
					<Route path='/product/:productId' element={<InfoProduct />} />
				</Routes>
			</Router>
			<GlobalStyle />
		</Provider>
	);
}

export default App;
