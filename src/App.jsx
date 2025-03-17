import { Outlet} from 'react-router-dom' // fixed import, changed from react-router to react-router-dom
import './App.css'
// import { useEffect } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
// import { mealLog } from './utils/store'

function App() {

//   useEffect(() => {
//   // Load mealData to localStorage
//   localStorage.setItem("mealLog", JSON.stringify(mealLog));
//   console.log("mealLog added to local storage:", mealLog);
// }, []);

  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    {console.log("Outlet should render below")}
    <Outlet />
    <Footer />
    </div>

  ) 
}

export default App
