import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import {useContext, useEffect, useState} from "react";
import './imgSize.css';
import {Col} from "react-bootstrap";
export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [storedSavedBuds, setStoredSavedBuds] = useState(JSON.parse(sessionStorage.getItem('cart')));


    const imgUrls = buds.map(bud => `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${bud.imgIds[0]}`);
    const initialAdopted = JSON.parse(sessionStorage.getItem('adoptedCollect')) || [];
    const [adopt, setAdopt] = useState(initialAdopted);
    console.log(adopt);
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(storedSavedBuds));
    },[storedSavedBuds])

    useEffect(() => {
        sessionStorage.setItem("adoptedCollect", JSON.stringify(adopt));
    }, [adopt]);


    console.log(storedSavedBuds);
    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {storedSavedBuds.length === adopt.length ? <p>No Buds are available for adoption!</p> : ""}
        <div className="row">
            {imgUrls.map((url, index) => {
                if(storedSavedBuds?.includes(buds[index].name) === false)
                {return null;}

                if (adopt.includes(buds[index].name)){
                    return null;
                }

                return (
                    <Col xs={12} sm={6} md={4} lg={3} key={index}
                         className={"col"}>
                        <img src={url} alt={buds[index].name} className="bud-image"/>
                        <div className={"btn-div"}>
                            <h3 id="name-text">{buds[index].name}</h3>

                            <button className="btn" id="unselect-btn" onClick={() => {
                                setStoredSavedBuds(poorBuds => poorBuds.filter(bud => bud !== buds[index].name));
                                alert(`${buds[index].name} has been removed from your basket!`);

                                sessionStorage.setItem('cart', JSON.stringify(storedSavedBuds));
                            }}>
                                {`Unselect`}
                            </button>
                            <button className="btn" id="adopt-btn" onClick={() => {
                                setAdopt(prev => [...prev, buds[index].name]);
                                // setStoredSavedBuds(poorBuds => poorBuds.filter(bud => bud !== buds[index].name));
                                alert(`Thank you for adopting ${buds[index].name}! ❤️‍🩹🐱`);
                                sessionStorage.setItem('adoptedCollec', JSON.stringify(adopt));
                                }
                            }>
                                {`💕Adopt`}
                            </button>
                        </div>
                    </Col>
                );
            })}

        </div>
    </div>
}