import React, {useState} from "react";
import {Button, Spinner, Card, Toast, ToastContainer} from "react-bootstrap";
import {getDatabase, ref, set} from "firebase/database";
import { useAuth } from "../contexts/AuthContext";



export default function SearchResult({id, title, media, price}) {
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(false)
    const toggleShowToast = () => setToast(!toast);

    const { currentUser } = useAuth()

    function handleAdd() {
        const db = getDatabase();
        set(ref(db, 'users/' + currentUser.uid + '/collection/' + id), {
            title: title,
            img: media.thumbUrl,
            price: price
        });
        setToast(true)
    }

    return (
        <>
            <Card className="mt-3 p-3 card-bckgrnd card-custom" style={{minHeight: "357px"}}>
                <ToastContainer position="top-center">
                    <Toast show={toast} onClose={toggleShowToast} position>
                        <Toast.Header>
                            <img
                                className="me-auto"
                                src={require('../logo/logo_small.jpg')}
                                alt=""
                            />
                        </Toast.Header>
                        <Toast.Body>Congrats, those kicks are now in My Collection</Toast.Body>
                    </Toast>
                </ToastContainer>

                <div className="d-flex flex-column align-items-center text-center">
                    <div style={{minHeight: "48px"}}>Name: {title}</div>
                    <div>Retail price: ${price}</div>
                    {media.thumbUrl === null && <img src={require('../logo/not-available.jpg')} alt="" className="img-fluid max-width: 100%" style={{maxHeight: "200px"}}></img>}
                    {media.thumbUrl !== null && loading && <div className="d-flex justify-content-center" style={{minHeight: "200px"}}>
                        <Spinner animation="border" role="status" size="xxl">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>}
                    <img loading="lazy" src={media.thumbUrl} alt="" className="img-fluid max-width: 100%" onLoad={() => setLoading(false)}></img>
                    <div>
                        <Button variant="primary" size="sm" className="btn-custom mt-3" onClick={handleAdd}>Add to My Collection</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
