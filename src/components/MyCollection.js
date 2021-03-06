import React, {useState, useEffect} from "react";
import {Alert, Button, Card, Spinner, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, onValue } from "firebase/database";
import SneakersFromMyCollection from "./SneakersFromMyCollection";
import Menu from "./Menu";
import ButtonToTop from "./ButtonToTop";




export default function MyCollection() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [myCollection, setMyCollection] = useState([])
    const [totalPrice, setTotalPrice] = useState(null)
    const [loading, setLoading] = useState(false)

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 360);
        });
    }, []);

    useEffect(() => {
        setLoading(true)
        const db = getDatabase();
        const myCollectionRef = ref(db, 'users/' + currentUser.uid + '/collection/');
        onValue(myCollectionRef, (snapshot) => {
            const data = snapshot.val();
            if (data === null) {
                setMyCollection([])
                setLoading(false)
                return
            } else {
                setMyCollection(Object.entries(data))
                setLoading(false)
            }
        });
    }, [])

    useEffect(() => {
        setTotalPrice(0)
        myCollection.map(el => {
            setTotalPrice(prev => prev + el[1].price)
        })
    }, [myCollection])


    async function handleLogout() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <>
            <Menu></Menu>
            <Card id="top" className="card-bckgrnd">
                <Card.Body>
                    <h2 className="text-center mb-4">My Collection of : <strong>{currentUser.email}</strong></h2>
                    <h3 className="text-center mb-4">Sneakers in My Collection: {myCollection.length}</h3>
                    <h3 className="text-center mb-4">Total value of My Collection: ${totalPrice}</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Link to="/add-to-my-collection" className="btn btn-primary w-100 mt-3 btn-custom">Add To My Collection</Link>
                    {loading && <div className="d-flex justify-content-center">
                                    <Spinner animation="grow" role="status" size="xxl">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>}
                    <Row>
                        {(myCollection.length !== 0) && myCollection.map(el => {
                            return (<Col sm={6} xl={4} key={el[0]}>
                                    <SneakersFromMyCollection  img={el[1].img} title={el[1].title} price={el[1].price} id={el[0]}></SneakersFromMyCollection>
                                </Col>
                            )
                        })}
                    </Row>

                    {(myCollection.length === 0) && null}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button className="btn-custom mb-2" variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
            {scroll && <ButtonToTop location="#top" />}
        </>
    )
}