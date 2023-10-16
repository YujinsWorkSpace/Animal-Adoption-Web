import {useContext, useEffect, useState} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import './imgSize.css';
import {Carousel, Col} from "react-bootstrap";

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);
    const imgUrls = buds.map(bud => `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${bud.imgIds[0]}`);
    const names = buds.map(bud => `${bud.name}`);

    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const initialCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(initialCart);
    // const savedBuds = JSON.parse(sessionStorage.getItem('savedID'));
    const adoptedBuds = (JSON.parse(sessionStorage.getItem('adoptedCollect'))) || [];
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    console.log(buds.length);
    // useEffect(() => {
    //     sessionStorage.setItem('adoptedCollec', JSON.stringify(adoptedBuds))
    // }, [adoptedBuds]);
    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {cart.length === buds.length ? <p>No buds available for adoption!</p> : ``}
        <div className="row">

            {imgUrls.map((url, index) => {
                if (adoptedBuds?.includes(buds[index].name)){
                    return null;
                }
                if(cart?.includes(buds[index].name) ) {
                    return null;
                }
                return (
                    <Col xs={12} sm={6} md={4} lg={3} key={index}
                         className={expandedIndexes.includes(index) ? "col-wrap-content" :
                             cart.includes(index) ? "" : "col"
                         }>
                        {
                            expandedIndexes.includes(index) ? (
                                <Carousel>
                                    {buds[index].imgIds.map((pic, picIndex) => (
                                        <Carousel.Item key={picIndex}>
                                            <img src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${pic}`} alt={names[index]} className="bud-image"/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <img src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${buds[index].imgIds[0]}`} alt={names[index]} className="bud-image" />
                            )
                        }
                        <div className={expandedIndexes.includes(index) ? "btn-div-expanded" : "btn-div"}>
                            <h3 id="name-text">{names[index]}</h3>
                            <p>{expandedIndexes.includes(index) ? buds[index].gender : ""}</p>
                            <p>{expandedIndexes.includes(index) ? buds[index].breed : ""}</p>
                            <p>
                                {
                                    expandedIndexes.includes(index) ?
                                        (
                                            (buds[index].age / 12 < 1)
                                                ? `${buds[index].age} month(s) old`
                                                : `${Math.floor(buds[index].age / 12)} year(s) and ${buds[index].age % 12} month(s) old`
                                        )
                                        : ""
                                }
                            </p>
                            <p>{
                                expandedIndexes.includes(index) ?
                                    buds[index].description
                                    : ""
                            }
                            </p>

                            <button className="btn" id="show-more" onClick={() => {
                                if (expandedIndexes.includes(index)) {
                                    setExpandedIndexes(prevIndexes => prevIndexes.filter(i => i !== index));
                                } else {
                                    setExpandedIndexes(prevIndexes => [...prevIndexes, index]);
                                }
                            }}>
                                {expandedIndexes.includes(index) ? "show less" : "show more"}
                            </button>
                            <button className="btn" id="save" onClick={() => {
                                setCart(preBud => [...preBud, buds[index].name]);
                                alert(`${buds[index].name} has been added to your basket!`);
                                sessionStorage.setItem("cart", JSON.stringify(cart));
                            }}>
                                {`❤️ save`}
                            </button>
                        </div>

                    </Col>

                );
            })}

        </div>

    </div>
}