import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInSelector } from '~/redux/selector';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/layout';
import { AppDispatch } from './redux/store';
import { fetchUserProfile } from './services';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchUserProfile());
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch]);

	const isLoggedIn = useSelector(isLoggedInSelector);

	// Kiểm tra xem có profile hoặc user không để quyết định routes

	const checkAndNavigate = () => {
		if (isLoggedIn) {
			navigate('/');
		} else {
			navigate('/login');
		}
	};

	useEffect(() => {
		checkAndNavigate();
	}, [isLoggedIn]);

	const routes = isLoggedIn ? privateRoutes : publicRoutes;

	return (
		<>
			<Routes>
				{routes.map((route, index) => {
					const Layout = route.layout ? route.layout : DefaultLayout;
					const Page = route.element;
					return (
						<Route
							path={route.path}
							key={index}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
			</Routes>
		</>
	);
}

export default App;
