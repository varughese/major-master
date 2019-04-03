import React, { Component } from 'react';
import { Input, Form, FormGroup, Button, Label } from 'reactstrap';
import { DragSource } from 'react-dnd'

function CourseItemSearchResultBase({ connectDragSource, isDragging, id, name }) {
	return connectDragSource(<li>{id} - {name}</li>);
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
			searchString: '',
			matchedCourses: []
		};
	}

	handleChange = (e) => {
		let value = e.target.value || "";
		value = value.replace(/[^a-zA-Z\d\s:]/, '');
		this.setState({ 
			searchString: value,
			matchedCourses: this.filterCourses(value)
		});
	}

	filterCourses = (pattern) => {
		const searchString = pattern.trim().toLowerCase();
		const courses = this.props.courses || [];
		if (searchString.length > 0) {
			return courses.filter((course) => {
				return (course.id+course.name).toLowerCase().match(searchString);
			}).slice(0, 20);
		}
		return [];
	}

	render() {

		let courses = this.state.matchedCourses;
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
				courses.map((course, i) => <CourseItemSearchResult key={i} {...course}/>)
				}
				</ul>
			</div>
		);
	}
}

export default SearchCourses;