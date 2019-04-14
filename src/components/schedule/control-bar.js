import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ButtonGroup, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


class ControlBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			semester_code: "Enter Semester Code"
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

	render() {
		const { semester_code } = this.state;
		return (
			<div className="control-bar">
				<Button color="primary" onClick={this.toggle}>Add Semester</Button>
				<Button color="primary" onClick={() => {
							this.props.exportPDF()
						}}>Export to PDF</Button>
				<Button color="primary">Edit my info</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Semester</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for="semester_code">Semester</Label>
								{/* <Input type="number" 
									   name="semester_code" 
									   onChange={this.onChange}
									   value={semester_code}
									   id="semester_code" 
								/> */}
								<ButtonGroup>
									<Button>Left</Button>
									<Button>Middle</Button>
									<Button>Right</Button>
								</ButtonGroup>
							</FormGroup>
							<div>{semester_code}</div>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={() => {
							this.props.addSemester(semester_code);
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
