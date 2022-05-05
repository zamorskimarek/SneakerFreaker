import React from "react";
import {Button, Card} from "react-bootstrap";
import {getDatabase, ref, remove} from "firebase/database";
import { useAuth } from "../contexts/AuthContext";


export default function SneakersFromMyCollection({title, img, id, price}) {
    const { currentUser } = useAuth()
    function handleRemove() {
        const db = getDatabase();
        remove(ref(db, 'users/' + currentUser.uid + '/collection/' + id), {
        });
    }


    return (
        <>
            <Card className="mt-3 p-3 card-bckgrnd card-custom" style={{minHeight: "341px"}}>
                <div className="d-flex flex-column align-items-center text-center">
                    <div style={{minHeight: "48px"}}>Name: {title}</div>
                    <div>Retail price: ${price}</div>
                    {img === undefined && <img src={require('../logo/not-available.jpg')} alt="" className="img-fluid max-width: 100%" style={{maxHeight: "200px"}}></img>}
                    <img src={img} alt="" className="img-fluid max-width: 100%"></img>
                    <div>
                        <Button className="btn-custom" variant="primary" size="sm" onClick={handleRemove}>Remove from My Collection</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
