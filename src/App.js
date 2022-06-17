import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store';


import AddProduct from './pages/AddProduct';

import GlobalStyle from './GlobalStyle';
import InfoProfile from './pages/InfoProfile';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<AddProduct />} />
					<Route path='/user/profile' element={<InfoProfile />} />
				</Routes>
			</Router>
			<GlobalStyle />
		</Provider>
	);
}

export default App;
