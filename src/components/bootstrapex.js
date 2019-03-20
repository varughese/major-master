import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

import { withFirebase } from './firebase';

class BootstrapExample extends Component {
	render() {
	  return (
		<Container>
			<Row>
				<Col sm="12" md="6">
					<Button color="primary">primary</Button>{' '}
					<Button color="secondary">secondary</Button>{' '}
					<Button color="success">success</Button>{' '}
					<Button color="info">info</Button>{' '}
					<Button color="warning">warning</Button>{' '}
					<Button color="danger">danger</Button>{' '}
					<Button color="link">link</Button>
				</Col>
				<Col sm="12" md="6">
					<FirebaseExample />
				</Col>
				<Col sm="12" md="6">
					<FormExample />
				</Col>
			</Row>
		</Container>
	  );
	}
  }
	
class FirebaseExampleBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			course_list: []
		}
	}

	componentDidMount() {
		this.setState({
			loading: true
		})
		this.props.firebase.courses().on('value', snapshot => {
			const courses = snapshot.val();
			this.setState({
				loading: false,
				course_list: courses
			});
		})
	}

	componentWillUnmount() {
		this.props.firebase.courses().off();
	}

	render() {
		const { loading, course_list } = this.state; 
		return loading ? <div>Loading</div> : (
			<ol>
			{course_list.map(course => (<CourseItem key={course} name={course} />))}
			</ol>
		);
	}
}

class CourseItemBase extends Component {
	async getCourseInfo() {
		const { name } = this.props;
		const snapshot = await this.props.firebase.course_descriptions().child(name).once('value');
		alert(JSON.stringify(snapshot.val()));
	}

	render() {
		return <Button color="primary" onClick={() => this.getCourseInfo()}>{this.props.name}</Button>
	}
}

const CourseItem = withFirebase(CourseItemBase);
const FirebaseExample = withFirebase(FirebaseExampleBase);
	
function FormExample(props) {
return (<Form>
		<FormGroup>
		<Label for="exampleEmail">Email</Label>
		<Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
		</FormGroup>
		<FormGroup>
		<Label for="examplePassword">Password</Label>
		<Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
		</FormGroup>
		<FormGroup>
		<Label for="exampleSelect">Select</Label>
		<Input type="select" name="select" id="exampleSelect">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</Input>
		</FormGroup>
		<FormGroup>
		<Label for="exampleSelectMulti">Select Multiple</Label>
		<Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</Input>
		</FormGroup>
		<FormGroup>
		<Label for="exampleText">Text Area</Label>
		<Input type="textarea" name="text" id="exampleText" />
		</FormGroup>
		<FormGroup>
		<Label for="exampleFile">File</Label>
		<Input type="file" name="file" id="exampleFile" />
		<FormText color="muted">
			This is some placeholder block-level help text for the above input.
			It's a bit lighter and easily wraps to a new line.
		</FormText>
		</FormGroup>
		<FormGroup tag="fieldset">
		<legend>Radio Buttons</legend>
		<FormGroup check>
			<Label check>
			<Input type="radio" name="radio1" />{' '}
			Option one is this and that—be sure to include why it's great
			</Label>
		</FormGroup>
		<FormGroup check>
			<Label check>
			<Input type="radio" name="radio1" />{' '}
			Option two can be something else and selecting it will deselect option one
			</Label>
		</FormGroup>
		<FormGroup check disabled>
			<Label check>
			<Input type="radio" name="radio1" disabled />{' '}
			Option three is disabled
			</Label>
		</FormGroup>
		</FormGroup>
		<FormGroup check>
		<Label check>
			<Input type="checkbox" />{' '}
			Check me out
		</Label>
		</FormGroup>
		<Button>Submit</Button>
	</Form>);
  }

  export default BootstrapExample;