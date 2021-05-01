import React from 'react';
import { useParams } from 'react-router';
import Riders from '../../fakeData/RideData';
import fakePlace from '../../fakePlace/FakePlace';
import './Destination.css';

const Destination = () => {
    const {id,placeFrom,placeTo} = useParams();
    const {name, data, imageURL,} = Riders.find(vehicle => vehicle.id == id);
    const {gMap} = fakePlace.find(place => place.name === placeFrom);
    return (
        <div className="map-style" >     
            <div className="col-md-2 info-card ">
            <p className="mb mt">From: {placeFrom}</p>
            <p className="mb mt">To: {placeTo}</p>
            {data.map(vehicleName => <ul>
                <p>
                    Driver Name: {vehicleName.driverName}
                    <br/>
                    Sit available: {vehicleName.status}
                    <br/>
                    Fare: {vehicleName.fare}$
                </p>
                </ul>)}
            </div>
            <div className="map">
            <iframe className="google-map" src={gMap} width="500px" height="500px" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </div>
    );
};

export default Destination;