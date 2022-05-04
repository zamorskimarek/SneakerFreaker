import React, {useState} from "react";
import {Button, Spinner, Card, Toast} from "react-bootstrap";
import {getDatabase, ref, set, push} from "firebase/database";
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
            <Card className="mt-3 p-3 card-bckgrnd card-custom">
                <Toast show={toast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <img
                            className="me-auto"
                            src={require('../logo/logo_small.jpg')}
                            alt=""
                        />
                        {/*<strong className="me-auto"></strong>*/}
                    </Toast.Header>
                    <Toast.Body>Congrats, those kicks are now in My Collection</Toast.Body>
                </Toast>
                <div className="d-flex flex-column align-items-center text-center">
                    <div>Name: {title}</div>
                    <div>Retail price: ${price}</div>
                    {loading && <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status" size="xxl">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>}
                    <img src={media.thumbUrl} onLoad={() => setLoading(false)}></img>
                    <div>
                        <Button variant="primary" size="sm" className="btn-custom mt-3" onClick={handleAdd}>Add to My Collection</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
