import React, { Component } from 'react';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import Logo from '../../../img/LandMonk-Logo---transparent-bkg---215x218.jpg'


class UpdateUnit extends Component {
    state = {
        unitForm: {
            unitName: '',
            bedroomCount: '',
            bathroomCount: '',
            squareFootage: '',
            propertyId: ''
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let url = '/api/units/' + id;
        this.props.onGetUnitById(url, { ...this.props });
    }

    handleChangeEvent = (e) => {

        console.log(this.state.unitForm.propertyId);
        const updatedUnitForm = { ...this.state.unitForm };
        updatedUnitForm[e.target.id] = e.target.value
        this.setState({ unitForm: updatedUnitForm });
    }

    componentWillReceiveProps = (nextProps) => {
        const updatedUnitForm = { ...this.state.unitForm };

        updatedUnitForm.unitName = nextProps.data.unitName;
        updatedUnitForm.bedroomCount = nextProps.data.bedroomCount;
        updatedUnitForm.bathroomCount = nextProps.data.bathroomCount;
        updatedUnitForm.squareFootage = nextProps.data.squareFootage;
        updatedUnitForm.propertyId = nextProps.data.propertyId;
        
        this.setState({ unitForm: updatedUnitForm }); 
    }

    updateUnit = (event) => {
        event.preventDefault();

        const unitToUpdate = {
            unitName: this.state.unitForm.unitName,
            bedroomCount: parseInt(this.state.unitForm.bedroomCount),
            bathroomCount: parseFloat(this.state.unitForm.bathroomCount),
            squareFootage: parseInt(this.state.unitForm.squareFootage),
            propertyId: parseInt(this.state.unitForm.propertyId)
        }

        const url = '/api/units/' + this.props.data.id;
        this.props.onUpdateUnit(url, unitToUpdate, { ...this.props });
    }

    redirectToOwnerList = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container-fluid">

                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h4 className="page-title">Edit Unit</h4>
                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}


                    <div className="row">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Unit Info</h4>

                                    <form onSubmit={e => this.updateUnit(e)}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="unitName" className="col-form-label">Unit Name</label>
                                                <input type="text" required
                                                    value={this.state.unitForm.unitName} onChange={e => this.handleChangeEvent(e)} className="form-control" id="unitName" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="bedroomCount" className="col-form-label">Beds</label>
                                                <input type="text" required
                                                    value={this.state.unitForm.bedroomCount} onChange={e => this.handleChangeEvent(e)} className="form-control" id="bedroomCount" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="bathroomCount" className="col-form-label">Baths</label>
                                                <input type="text" required
                                                    value={this.state.unitForm.bathroomCount} onChange={e => this.handleChangeEvent(e)} className="form-control" id="bathroomCount" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="squareFootage" className="col-form-label">Sq Ft</label>
                                                <input type="text" required
                                                    value={this.state.unitForm.squareFootage} onChange={e => this.handleChangeEvent(e)} className="form-control" id="squareFootage" />
                                    
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary waves-effect waves-light">Update</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <img src={Logo} alt="LandMonk" />
                        </div>
                    </div >

                    <SuccessModal show={this.props.showSuccessModal}
                        modalHeaderText={'Success!'}
                        modalBodyText={'Unit updated'}
                        okButtonText={'OK'}
                        successClick={() => this.props.onCloseSuccessModal('/propertyDetails/'+ this.state.unitForm.propertyId , { ...this.props })} />

                    <ErrorModal show={this.props.showErrorModal}
                        modalHeaderText={'Error!'}
                        modalBodyText={this.props.errorMessage.title || this.props.errorMessage}
                        okButtonText={'OK'} closeModal={() => this.props.onCloseErrorModal()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.repository.data,
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onGetUnitById: (url, props) => dispatch(repositoryActions.getData(url, props)),
        onUpdateUnit: (url, unit, props) => dispatch(repositoryActions.putData(url, unit, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(UpdateUnit);

// this.props.match.params.id