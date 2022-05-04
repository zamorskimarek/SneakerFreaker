import React, {useEffect, useState, useRef} from "react";
import {Card, Button, Form, Spinner} from "react-bootstrap";
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
                console.log(response)
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
            <Menu></Menu>
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
                        <Button className="w-100 mt-2" type="submit" disabled={btnDisabled}>Search for your sneaker!</Button>
                    </Form>
                    {(count < (page + 1) * 100 || count === null) ? null : <Button disabled={btnDisabled} className="w-100 mt-2" onClick={handleNext}>Next page</Button>}
                    {page > 0 ? <Button disabled={btnDisabled} className="w-100 mt-2" onClick={handlePrev}>Previous page</Button> : null}
                    <Link to="/" className="btn btn-primary w-100 mt-2">Go back to My Collection</Link>
                    {searchLoading && <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    {searchLoading && <span>LOADING RESULTS</span>}
                    {(searchResults.length !== 0) && searchResults.results.map(el => {
                        return <SearchResult key={el.id} media={el.media} title={el.title} id={el.id} price={el.retailPrice}></SearchResult>
                    })}
                    {/*<Button className="btn btn-primary w-50 h-50">Add new sneaker to your collection</Button>*/}
                </Card.Body>
            </Card>
        </>
    )
}