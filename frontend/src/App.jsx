import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Single from "./pages/single/Single"
import New from "./pages/new/New"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { articleInputs, zoneInputs } from "../formSource"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path="articles">
              <Route index element={<List />}/>
              <Route path=":userId" element={<Single/>}/>
              <Route
                path="new"
                element={<New inputs={articleInputs} title="Add New Articles" />}
              />            
              </Route>             
            <Route path="zones">
              <Route index element={<List />}/>
              <Route path=":productId" element={<Single/>}/>
              <Route
                path="new"
                element={<New inputs={zoneInputs} title="Add New User" />}
              />            
              </Route>              
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
