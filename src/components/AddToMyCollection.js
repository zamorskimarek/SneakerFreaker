import React, {useEffect, useState, useRef} from "react";
import {Card, Button, Form, Spinner, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import SearchResult from "./SearchResult";
import Menu from "./Menu";

export default function AddToMyCollection() {
    const [searchResults, setSearchResults] = useState([])
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedGender, setSelectedGender] = useState("")
    const [selectedColorway, setSelectedColorway] = useState("")
    const [selectedName, setSelectedName] = useState("")
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(null)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)

    // const pageChange = useMemo(() => {
    //     return page
    // }, [page])


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

    function handleNext() {
        setPage(prevState => prevState + 1)
    }

    function handlePrev() {
        setPage(prevState => prevState - 1)
    }

    const useIsMount = () => {
        const isMountRef = useRef(true);
        useEffect(() => {
            isMountRef.current = false;
        }, []);
        return isMountRef.current;
    };

    const isMount = useIsMount();

    useEffect(() => {
        if (isMount) {
            return
        } else {
            fetchAPI()
        }
    }, [page]);

    function fetchAPI() {
        setSearchLoading(true)
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
                setSearchResults(response)
                setCount(response.count)
                setSearchLoading(false)
            })
            .catch(err => console.error(err));
        setBtnDisabled(true)
        setTimeout(() => {
            setBtnDisabled(false)
        }, 1000)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (page !== 0) {
            setPage(0)
            return
        } else {
            fetchAPI()
        }
    }


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
                    .btn-custom:hover {
                        background-color: #457b9dff;
                        color: #f1faeeff;
                        border: 2px solid #f1faeeff;
                    }
                    .menu-custom {
                        border: 2px solid #457b9dff;
                        margin-bottom: 4px;
                        border-radius: .25rem;
                    }
                    .card-custom {
                        background-color: #f1faeeff;
                    }
                `}
            </style>
            <Menu></Menu>
            <Card className="card-bckgrnd">
                <Card.Body>
                    <h2 className="text-center mb-4">Add a New Sneaker!</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={6} className="mb-2">
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
                            </Col>
                            <Col sm={6} className="mb-2">
                                <Form.Group id="gender">
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
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mb-2">
                                <Form.Group id="colorway">
                                    <Form.Control type="text" placeholder="Colorway" onChange={e => {
                                        if (e.target.value === "") {
                                            setSelectedColorway("")
                                        } else {
                                            setSelectedColorway(`&colorway=${e.target.value}`)
                                        }}}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={6} className="mb-2">
                                <Form.Group id="name">
                                    <Form.Control type="text" placeholder="Name" onChange={e => {
                                        if (e.target.value === "") {
                                            setSelectedName("")
                                        } else {
                                            setSelectedName(`&name=${e.target.value}`)
                                        }}}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="w-100 mt-2 btn-custom" type="submit" disabled={btnDisabled}>Search for your sneaker!</Button>
                    </Form>
                    {(count < (page + 1) * 100 || count === null) ? null : <Button disabled={btnDisabled} className="w-100 mt-2 btn-custom" onClick={handleNext}>Next page</Button>}
                    {page > 0 ? <Button disabled={btnDisabled} className="w-100 mt-2 btn-custom" onClick={handlePrev}>Previous page</Button> : null}
                    <Link to="/" className="btn btn-primary w-100 mt-2 btn-custom">Go back to My Collection</Link>
                    {searchLoading && <div className="text-center">LOADING RESULTS</div>}
                    {searchLoading && <div className="d-flex justify-content-center">
                        <Spinner animation="grow" role="status" size="xxl">
                            <span className="visually-hidden">Loading...</span>

                        </Spinner>
                    </div>}
                    <Row>
                        {(searchResults.length !== 0) && searchResults.results.map(el => {
                            return (<Col sm={6} xl={4} key={el.id}>
                                    <SearchResult media={el.media} title={el.title} id={el.id} price={el.retailPrice}></SearchResult>
                                </Col>
                            )
                        })}
                    </Row>

                </Card.Body>
            </Card>
        </>
    )
}