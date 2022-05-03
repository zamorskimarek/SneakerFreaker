import React, {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
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
            <Card className="mt-3 p-3">
                <div className="d-flex flex-column align-items-center text-center">
                    <div>Name: {title}</div>
                    <div>Retail price: ${price}</div>

                    <img src={img}></img>
                    <div>
                        <Button variant="primary" size="sm" onClick={handleRemove}>Remove from My Collection</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}