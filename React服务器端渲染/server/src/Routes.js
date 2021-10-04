import Home from "./containers/Home";
import Login from "./containers/Login";

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
        loadData: Home.loadData,
        key: 'home',
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        key: 'login',
    },
]

export default routes