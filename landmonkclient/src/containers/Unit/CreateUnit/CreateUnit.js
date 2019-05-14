import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import Logo from '../../../img/LandMonk-Logo---transparent-bkg---215x218.jpg'



class CreateUnit extends Component {
    state = {
        unitForm: {
            unitName: '',
            bedroomCount: '',
            bathroomCount: '',
            squareFootage: '',
            propertyId: ''
        }
    }

    handleChangeEvent = event => {
        const updatedUnitForm = { ...this.state.unitForm };
        updatedUnitForm[event.target.id] = event.target.value;
    
        this.setState(
            {
                unitForm: updatedUnitForm
            }
        )
    }

    createUnit = event => {
        event.preventDefault();

      
        const unitToCreate = {
            unitName: this.state.unitForm.unitName,
            bedroomCount: parseInt(this.state.unitForm.bedroomCount),
            bathroomCount: parseFloat(this.state.unitForm.bathroomCount),
            squareFootage: parseInt(this.state.unitForm.squareFootage),
            propertyId: parseInt(this.props.match.params.id)
        }


        const url = '/api/units'
        this.props.onCreateUnit(url, unitToCreate, { ...this.props });
    }


    render() {
        return (
            <div className="wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h4 className="page-title">Add a Unit</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Unit Information</h4>
                                    <form onSubmit={e => this.createUnit(e)}>
                                        <div className="form-row">
                                            <div className="form-group-col-md-6">
                                                <label htmlFor="unitName" className="col-form-label">Unit Name</label>
                                                <input type="text" required
                                                    value={this.state.unitForm.unitName} onChange={e => this.handleChangeEvent(e)} className="form-control" id="unitName" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-2">
                                                <label htmlFor="bedroomCount" className="col-form-label">Beds</label>
                                                <input type="number" required minLength="1" value={this.state.unitForm.bedroomCount} onChange={e => this.handleChangeEvent(e)} className="form-control" id="bedroomCount" />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label htmlFor="bathroomCount" className="col-form-label">Baths</label>
                                                <input type="number" required minLength="1" value={this.state.unitForm.bathroomCount} onChange={e => this.handleChangeEvent(e)} className="form-control" id="bathroomCount" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="squareFootage" className="col-form-label">Sq Ft</label>
                                                <input type="number" required minLength="1" value={this.state.unitForm.squareFootage} onChange={e => this.handleChangeEvent(e)} className="form-control" id="squareFootage" />
                                            </div>                                      
                                        </div>
                                        <button type="submit" className="btn btn-primary waves-effect waves-light">Add a unit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <img src={Logo} alt="LandMonk" />
                        </div>
                    </div>
                    <SuccessModal show={this.props.showSuccessModal}
                        modalHeaderText={'Success!'}
                        modalBodyText={'New unit created'}
                        okButtonText={'OK'}
                        successClick={() => this.props.onCloseSuccessModal('/propertyDetails/'+ this.props.match.params.id, { ...this.props })} />
                        {console.log(this.props.match.params.id)}

                    <ErrorModal show={this.props.showErrorModal}
                        modalHeaderText={'Error message'}
                        modalBodyText={this.props.errorMessage.title || this.props.errorMessage}
                        okButtonText={'OK'} closeModal={() => this.props.onCloseErrorModal()} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateUnit: (url, unit, props) => dispatch(repositoryActions.postData(url, unit, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUnit);

// successClick={() => this.props.onCloseSuccessModal(`{/properties/${this.props.match.params.id}}`, { ...this.props })} />