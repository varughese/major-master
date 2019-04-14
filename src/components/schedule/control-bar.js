import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SemesterChooser from './semseter-chooser'

class ControlBar extends Component {
	constructor(props) {
		super(props);
		this.getTermCode = this.getTermCode.bind(this);
		this.state = {
			full_term_code: ""
		};
	}

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}))
	}

	onChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	getTermCode(code){
		this.setState({ "full_term_code": code })
	}

	render() {
		const { semester_code, year_code } = this.state;
		return (
			<div className="control-bar">
				<Button color="primary" onClick={this.toggle}>Add Semester</Button>
				<Button color="primary" onClick={() => {
							this.props.exportPDF()
						}}>Export to PDF</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Semester</ModalHeader>
					<ModalBody>
						<SemesterChooser 
							setTermCode={this.getTermCode}
						/>
						{this.state.full_term_code}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={() => {
							this.props.addSemester(this.state.full_term_code);
							this.toggle();
						}}>Do Something</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ControlBar;
