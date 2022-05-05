import './App.css';
import Signup from "./Signup";
import {Container, Row, Col} from "react-bootstrap";
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
      <Container className="d-flex align-items-center justify-content-center bckgrnd" style={{minHeight: "100vh", position: "relative"}} fluid="md">
          <div className="w-100">
              <Router>
                  <AuthProvider>
                      <Routes>
                          <Route exact path="/dashboard" element={
                              <PrivateRoute>
                                  <Row>
                                      <Col  md={{ span: 8, offset: 2}}>
                                          <Dashboard />
                                      </Col>
                                  </Row>
                              </PrivateRoute>
                          }></Route>
                          <Route exact path="/" element={
                              <PrivateRoute>
                                  <Row>
                                      <Col  md={{ span: 10, offset: 1}}>
                                          <MyCollection />
                                      </Col>
                                  </Row>
                              </PrivateRoute>
                          }></Route>
                          <Route exact path="/add-to-my-collection" element={
                              <PrivateRoute>
                                  <Row>
                                      <Col  md={{ span: 10, offset: 1}}>
                                          <AddToMyCollection />
                                      </Col>
                                  </Row>
                              </PrivateRoute>
                          }></Route>
                          <Route path="/update-profile" element={
                              <PrivateRoute>
                                  <Row>
                                      <Col  md={{ span: 8, offset: 2}}>
                                          <UpdateProfile />
                                      </Col>
                                  </Row>
                              </PrivateRoute>
                          }></Route>
                          <Route exact path="/signup" element={<Row>
                              <Col  md={{ span: 6, offset: 3}}>
                                  <Signup />
                              </Col>
                          </Row>}></Route>
                          <Route exact path="/login" element={<Row>
                              <Col  md={{ span: 6, offset: 3}}>
                                  <Login />
                              </Col>
                          </Row>}></Route>
                          <Route path="/forgot-password" element={<Row>
                              <Col  md={{ span: 6, offset: 3}}>
                                  <ForgotPassword />
                              </Col>
                          </Row>}></Route>
                      </Routes>
                  </AuthProvider>
              </Router>
          </div>
      </Container>
  )
}

export default App;
