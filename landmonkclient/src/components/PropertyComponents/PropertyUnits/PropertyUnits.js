import React from 'react';
import { Button } from 'react-bootstrap';



const redirectToUpdateUnit = (id, history) => {
   
    history.push('/updateUnit/' + id);
}

const redirectToDeleteUnit = (id, history) => {
    history.push('/deleteUnit/' + id);
}

const propertyUnits = props => {
    let units = null;
    if (props.units) {
        units = props.units.map(unit => {
        
            return (
                <tr key={unit.id}>
                    <td>{unit.unitName}</td>
                    <td>{unit.bedroomCount}</td>
                    <td>{unit.bathroomCount}</td>
                    <td>{unit.squareFootage}</td>
                    <td>
                        <Button variant="success" onClick={() => redirectToUpdateUnit(unit.id, props.history)}>Edit</Button>
                    </td>
                    <td>
                        <Button variant="danger" onClick={() => redirectToDeleteUnit(unit.id, props.history)}>Delete</Button>
                    </td>
                </tr>
            );
        })
    }
    return (
        <div className="col-lg-6">
            <div className="card-box">
                <h4 className="header-title">Unit Information</h4>

                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead> 
                            <tr>
                                <th>Unit Name</th>
                                <th>Beds</th>
                                <th>Baths</th>
                                <th>Sq Ft</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units}
                        </tbody>
                    </table>
                </div>
                {/* <!-- end table-responsive--> */}
            </div>
            {/* <!-- end card-box --> */}
        </div>
    )
}

export default propertyUnits;