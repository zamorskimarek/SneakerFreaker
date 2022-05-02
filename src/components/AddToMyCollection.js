import React, {useState} from "react";
import {Card, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function AddToMyCollection() {
    const [searchResults, setSearchResults] = useState([])
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedGender, setSelectedGender] = useState("")
    const [selectedColorway, setSelectedColorway] = useState("")
    const [selectedName, setSelectedName] = useState("")
    const [page, setPage] = useState(0)
    const [count, setCount] = useState()

    const brands = [
        "ASICS",
        "ADIDAS",
        "ALEXANDER MCQUEEN",
        "BALENCIAGA",
        "BURBERRY",
        "CHANEL",
        "CONVERSE",
        "CROCS",
        "DIADORA",
        "DIOR",
        "GUCCI",
        "JORDAN",
        "LI-NING",
        "LOUIS VUITTON",
        "NEW BALANCE",
        "NIKE",
        "OFF-WHITE",
        "PRADA",
        "PUMA",
        "REEBOK",
        "SAINT LAURENT",
        "SAUCONY",
        "UNDER ARMOUR",
        "VANS",
        "VERSACE",
    ]

    const genders = [
        "CHILD",
        "INFANT",
        "MEN",
        "PRESCHOOL",
        "TODDLER",
        "UNISEX",
        "WOMEN"
    ]

    // NOT USING FETCH TO GET BRANDS OR GENDER AS THIS API HAS DAILY LIMIT

    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com',
    //             'X-RapidAPI-Key': 'f619612d90msh5a78d4ccff56b0ap1282a6jsnbf1496a6b3d7'
    //         }
    //     };
    //
    //     fetch('https://v1-sneakers.p.rapidapi.com/v1/brands', options)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log(response)
    //             setBrands(response)
    //         })
    //         .catch(err => console.error(err));
    //
    // },[])

    function handleNext(e) {
        // setPage(prevState => prevState + 1)
        handleSubmit(e)
    }

    function handlePrev(e) {
        setPage(prevState => prevState - 1)
        handleSubmit(e)
    }

    function handleSubmit(e) {
        e.preventDefault()


        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com',
                'X-RapidAPI-Key': 'f619612d90msh5a78d4ccff56b0ap1282a6jsnbf1496a6b3d7'
            }
        };

        fetch(`https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=100${selectedGender}&page=${page}${selectedBrand}${selectedColorway}${selectedName}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setSearchResults(response)
                setCount(response.count)
                setPage(prevState => prevState + 1)
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add a New Sneaker!</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="brands">
                            {/*<Form.Label>brand</Form.Label>*/}
                            <Form.Select aria-label="Please select the brand of the shoe you are looking for" onChange={e => {
                                if (e.target.value === "") {
                                    setSelectedBrand("")
                                } else {
                                    setSelectedBrand(`&brand=${e.target.value}`)
                                }}}>
                                <option value="">Select brand</option>
                                {brands.map(el => {
                                    return <option value={el} key={el}>{el}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group id="brands">
                            <Form.Select aria-label="Please select gender of the shoe you are looking for" onChange={e => {
                                if (e.target.value === "") {
                                    setSelectedGender("")
                                } else {
                                    setSelectedGender(`&gender=${e.target.value}`)
                                }}}>
                                <option value="">Select gender</option>
                                {genders.map(el => {
                                    return <option value={el} key={el}>{el}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group id="colorway">
                            <Form.Control type="text" placeholder="Colorway" onChange={e => {
                                if (e.target.value === "") {
                                    setSelectedColorway("")
                                } else {
                                    setSelectedColorway(`&colorway=${e.target.value}`)
                                }}}></Form.Control>
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Control type="text" placeholder="Name" onChange={e => {
                                if (e.target.value === "") {
                                    setSelectedName("")
                                } else {
                                    setSelectedName(`&name=${e.target.value}`)
                                }}}></Form.Control>
                        </Form.Group>
                        <Button /*disabled={loading}*/ className="w-100 mt-2" type="submit">Search for your sneaker!</Button>
                    </Form>
                    {(count < page * 100 || count === undefined) ? null : <Button /*disabled={loading}*/ className="w-100 mt-2" onClick={handleNext}>Next page</Button>}
                    {page > 0 ? <Button /*disabled={loading}*/ className="w-100 mt-2" onClick={handlePrev}>Previous page</Button> : null}
                    <Link to="/my-collection" className="btn btn-primary w-100 mt-2">Go back to My Collection</Link>
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