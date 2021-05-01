import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import map from '../../images/Map.png';
import './SelectDest.css';
import fakePlace from '../../fakePlace/FakePlace'
const SelectDest = () => {

    const { id } = useParams();
    const [placeFrom, setPlaceFrom] = useState("");

   const [placeTo, setPlaceTo] = useState("");
   const handlePlaceFrom = (e) => {
        const placeValue = e.target.value
        setPlaceFrom(placeValue)
    }
    console.log(placeFrom)
    const handlePlaceTo = (e) => {
        const placeValue = e.target.value
        setPlaceTo(placeValue)
    }
    console.log(placeTo)
    return (
        <div className="row place">
            <div className="col-md-3 place-info ">
                <p className="mb-0 mt-3">Pick from</p>
                <select onChange={handlePlaceFrom} value={placeFrom} name="category" id="">
                    <option className="option-style" value="">Please Select</option>
                    {
                        fakePlace.map(place => (
                            <option value={place.name}>{place.name}</option>
                        ))
                    }
                </select>
                <p className="mb-0 mt-3">Drop to</p>
                <select onChange={handlePlaceTo} value={placeTo} name="category" id="">
                    <option className="option-style" value="">Please Select</option>
                    {
                        fakePlace.map(place => (
                            <option value={place.name}>{place.name}</option>
                        ))
                    }
                </select>
        
                {
                    (placeFrom === placeTo) && <p class="text-danger">Please Select different place</p>
                }
                <br/>
                <br/>
                {
                    (placeFrom !== placeTo) && <Link to={`/destination/${id}/${placeFrom}/${placeTo}`}><button className="text-center btn btn-success">Search</button></Link>
                }
            </div>

            <div className="col-md-3">
                <div className="map-img" >
                    <img className="img" src={map} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SelectDest;