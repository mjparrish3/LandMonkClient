import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import Property from '../../../components/PropertyComponents/Property/Property';
import PropertyUnits from '../../../components/PropertyComponents/PropertyUnits/PropertyUnits';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class PropertyDetails extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        let url = '/api/property/' + id + '/unit';
        this.props.onGetData(url, { ...this.props });
    }

    render() {
        let property = { ...this.props.data };

        return (
            <Aux>
                <div className="wrapper">
                    <div className="container-fluid">
                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <Link to='/createProperty'>
                                            <button className="btn btn-primary add-property">Add Property</button>
                                        </Link>
                                    </div>
                                    <h4 className="page-title">Property Details</h4>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title --> */}
                        <Property property={property} {...this.props} />
                        <Link className="btn btn-primary  add-unit" to={`/propertyDetails/${this.props.match.params.id}/createUnit`}>
                            Add Unit
                        </Link>
                        <PropertyUnits units={property.units} history={this.props.history} />
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.repository.data
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onGetData: (url, props) => dispatch(repositoryActions.getData(url, props))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(PropertyDetails);