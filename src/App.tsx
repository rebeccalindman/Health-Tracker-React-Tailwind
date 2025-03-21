import { Outlet} from 'react-router-dom' // fixed import, changed from react-router to react-router-dom
import './App.css'
// import { useEffect } from 'react';
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer'
// import { mealLog } from './utils/store'

function App() {

//   useEffect(() => {
//   // Load mealData to localStorage
//   localStorage.setItem("mealLog", JSON.stringify(mealLog));
//   console.log("mealLog added to local storage:", mealLog);
// }, []);

  return (
    <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    </>

  ) 
}

export default App
