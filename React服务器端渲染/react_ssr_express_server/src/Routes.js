import Header from "./components/Header";
import Home from "./containers/Home";
import Book from "./containers/Book";
import NotFound from "./containers/NotFound";

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
        path: '/book',
        component: Book,
        exact: true,
        loadData: [Header.loadData, Book.loadData],
        key: 'book',
    },
    {
        // 使用 react-route 来配置 404 页面
        // 使用通配符 * 号匹配所有路由，并将此配置放在数组的最末端，当前面的路由都匹配不上时，就会匹配到 *
        path: '*',
        component: NotFound,
        key: 'not_found',
    },
    // {
    //     path: '*',
    //     redirect: '/not_found'
    // },
]

export default routes