import './App.css';
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import MyCollection from "./MyCollection";
import AddToMyCollection from "./AddToMyCollection";

function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
              <Router>
                  <AuthProvider>
                      <Routes>
                          {/*<Route exact path="/" element={*/}
                          {/*    <PrivateRoute>*/}
                          {/*        <Dashboard />*/}
                          {/*    </PrivateRoute>*/}
                          {/*}></Route>*/}
                          <Route exact path="/" element={
                              <PrivateRoute>
                                  <MyCollection />
                              </PrivateRoute>
                          }></Route>
                          <Route exact path="/add-to-my-collection" element={
                              <PrivateRoute>
                                  <AddToMyCollection />
                              </PrivateRoute>
                          }></Route>
                          <Route path="/update-profile" element={
                              <PrivateRoute>
                                  <UpdateProfile />
                              </PrivateRoute>
                          }></Route>
                          <Route exact path="/signup" element={<Signup />}></Route>
                          <Route exact path="/login" element={<Login />}></Route>
                          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                      </Routes>
                  </AuthProvider>
              </Router>
          </div>
      </Container>
  )
}

export default App;
