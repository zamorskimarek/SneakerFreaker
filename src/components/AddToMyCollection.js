import React, {useRef, useState} from "react";
import {Card, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function AddToMyCollection() {
    // const brandRef = useRef()
    const [searchResults, setSerachResults] = useState([])

    function handleSubmit(e) {
        e.preventDefault()


        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com',
                'X-RapidAPI-Key': 'f619612d90msh5a78d4ccff56b0ap1282a6jsnbf1496a6b3d7'
            }
        };

        fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=100&page=13&brand=jordan', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setSerachResults(response)
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add New Sneaker!</h2>
                    <Form onSubmit={handleSubmit}>
                        {/*<Form.Group id="email">*/}
                        {/*    <Form.Label>brand</Form.Label>*/}
                        {/*    <Form.Control type="text" ref={brandRef} required></Form.Control>*/}
                        {/*</Form.Group>*/}
                        <Button /*disabled={loading}*/ className="w-100 mt-2" type="submit">Search for your sneaker!</Button>
                    </Form>
                    <Link to="/my-collection" className="btn btn-primary w-100">Go back to My Collection</Link>
                    {(searchResults.length !== 0) && searchResults.results.map(el => {
                        return <div key={el.id}>{el.title}
                        <img src={el.media.thumbUrl}></img>
                        </div>
                    })}
                    {/*<Button className="btn btn-primary w-50 h-50">Add new sneaker to your collection</Button>*/}
                </Card.Body>
            </Card>
        </>
    )
}