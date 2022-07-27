import './App.css';
import {UserList, UserDetail} from './components'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>

        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<UserList/>}/>
            <Route exact path="/userDetail/:id" element={<UserDetail/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
