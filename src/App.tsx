import { Outlet} from 'react-router-dom'
import './App.css'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer'


function App() {

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
