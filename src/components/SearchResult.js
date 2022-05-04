import React, {useState} from "react";
import {Button, Spinner, Card} from "react-bootstrap";
import {getDatabase, ref, set, push} from "firebase/database";
import { useAuth } from "../contexts/AuthContext";



export default function SearchResult({id, title, media, price}) {
    const [loading, setLoading] = useState(true)

    const { currentUser } = useAuth()

    function handleAdd() {

        const db = getDatabase();
        set(ref(db, 'users/' + currentUser.uid + '/collection/' + id), {
            title: title,
            img: media.thumbUrl,
            price: price
        });
        console.log("AAAAAAAAAAAAAAAAAAA")
        console.log(currentUser.email)
    }

    return (
        <>
            <Card className="mt-3 p-3 card-bckgrnd card-custom">
                <div className="d-flex flex-column align-items-center text-center">
                    <div>Name: {title}</div>
                    <div>Retail price: ${price}</div>
                    {loading && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    <img src={media.thumbUrl} onLoad={() => setLoading(false)}></img>
                    <div>
                        <Button variant="primary" size="sm" className="btn-custom mt-3" onClick={handleAdd}>Add to My Collection</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
