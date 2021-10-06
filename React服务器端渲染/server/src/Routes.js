import Header from "./components/Header";
import Home from "./containers/Home";
import Book from "./containers/Book";

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
]

export default routes