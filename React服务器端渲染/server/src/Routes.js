import Home from "./containers/Home";
import Login from "./containers/Login";
import Header from "./components/Header";

// const Routes = () => {
//     return (
//         <div>
//             <Route path="/" exact component={Home}></Route>
//             <Route path="/login" exact component={Login}></Route>
//         </div>
//     );
// };


const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        loadData: [Header.loadData, Home.loadData],
        key: 'home',
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        loadData: [Header.loadData],
        key: 'login',
    },
]

export default routes