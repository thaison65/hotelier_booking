import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.scss';
import store from '~/redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<StyledEngineProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StyledEngineProvider>
	</Provider>
);
