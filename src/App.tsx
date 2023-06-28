import './App.css'
import PokerPage from "./components/PokerPage";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import StartPage from "./components/StartPage";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" >
            <Route index element={<StartPage />} />
            <Route path={"/poker"} element={<PokerPage />} />
        </Route>
    )
)

function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App
