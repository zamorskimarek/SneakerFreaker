import React from "react";
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
      <>
          <style type="text/css">
              {`  
                    .card-bckgrnd {
                        background-color: #a8dadcff;
                        border: 2px solid #457b9dff;
                    }
                    .btn-custom {
                        background-color: #457b9dff;
                        color: #f1faeeff;
                        border: 2px solid #f1faeeff;
                    }
                    .card-custom {
                        background-color: #f1faeeff;
                    }
                    .menu-custom {
                        border: 2px solid #457b9dff;
                        margin-bottom: 4px;
                        border-radius: .25rem;
                    }
                `}
          </style>
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
      </>

  )
}

export default App;
