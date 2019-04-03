import React, { Component } from 'react';
import { Input, Form, FormGroup, Button, Label } from 'reactstrap';
import { DragSource } from 'react-dnd'

function CourseItemSearchResultBase({ connectDragSource, isDragging, name }) {
	return connectDragSource(<li>{name}</li>);
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

const courseItemSearchResultSource = {
	beginDrag(props) {
		return props;
	}
}

const CourseItemSearchResult = DragSource("SEARCHITEM", courseItemSearchResultSource, collect)(CourseItemSearchResultBase);

class SearchCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: ''
		};
	}

	handleChange = (e) => {
		let value = e.target.value || "";
		value = value.replace(/[^a-zA-Z\d\s:]/, '');
		this.setState({ searchString: value });
	}

	render() {

		let courses = this.props.courses;
		console.log("list", this.props.courses);
		const searchString = this.state.searchString.trim().toLowerCase();
		if (searchString.length > 0) {
			courses = courses.filter((course) => {
				return course && course.toLowerCase().match(searchString);
			});
		}

		return (
			<div className="course-search-section">
				<h4>Search Courses</h4>
				<Form inline={true}>
					<FormGroup>
						<Label for="search_input">Searcb</Label>
						<Input name="search_input" 
							   id="search_input"
							   type="text" 
							   value={this.state.searchString}
							   onChange={this.handleChange}
							   placeholder="Search for courses..." />
						<Button color="primary">Search</Button>
					</FormGroup>
				</Form>
				<ul>
				{ courses && 
				courses.map((course, i) => <CourseItemSearchResult key={i} name={course}/>)
				}
				</ul>
			</div>
		);
	}
}

export default SearchCourses;