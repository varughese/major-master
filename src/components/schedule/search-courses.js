import React, { Component } from 'react';
import { Input, Form, FormGroup } from 'reactstrap';
import { DragSource } from 'react-dnd'

function CourseItemSearchResultBase({ connectDragSource, isDragging, id, name, setCurrentCourse}) {
	return connectDragSource(<li onClick={setCurrentCourse}>{id} - {name}</li>);
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

const CourseItemSearchResult = DragSource("COURSE", courseItemSearchResultSource, collect)(CourseItemSearchResultBase);

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
		const courses = this.props.course_list || [];
		if (searchString.length > 0) {
			return courses.filter((course) => {
				return (course.id+course.name).toLowerCase().match(searchString);
			}).slice(0, 20);
		}
		return [];
	}

	render() {

		let courses = this.state.matchedCourses;
		const showHelp = courses.length === 0;
		const helpText = <p className="help-text">Search in the box above and drag courses onto the semester you want to take them.</p>
		return (
			<div className="course-search-section">
				<Form inline={true}>
					<FormGroup>
						<Input name="search_input" 
							   id="search_input"
							   type="text" 
							   value={this.state.searchString}
							   onChange={this.handleChange}
							   placeholder="Search for courses..." />
					</FormGroup>
				</Form>
				<ul className={showHelp ? "help-text" : ""}>
				{ courses && 
					courses.map((course, i) => {
						return <CourseItemSearchResult key={i}
							setCurrentCourse={() => this.props.setCurrentCourse(course.id)}
							{...course}
						/>
					})
				}
				{ showHelp && helpText}
				</ul>
			</div>
		);
	}
}

export default SearchCourses;