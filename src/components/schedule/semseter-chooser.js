import React, { Component } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

class SemesterChooser extends Component{
    constructor(props){
        super(props);
        this.state = {
            semseter_code: "Enter Semseter Code",
            year_code: "",
            full_term_code: ""
        };
    }

    onChange = event => {
		const { name, value } = event.target;
		console.log(name + ";" + value);

        this.setState({ [name]: value }, (state) => {
            if(this.state["year_code"].length == 4){
                var yr = this.state["year_code"];
                var temp = yr.substring(0,1) + yr.substring (2,4) + this.state["semseter_code"];
                console.log("setting code " + temp);
                this.setState({"full_term_code": temp});
            }
        });
        
	}

    render() {
        const { semester_code, year_code } = this.state;
        return (
            <Form>
                <FormGroup>
                    <Label for="semester">Semester</Label>
                    <Input type="number" 
                            name="year_code" 
                            onChange={this.onChange}
                            value={year_code}
                            id="year_code" 
                    />
                    <ButtonGroup value={semester_code} onClick={this.onChange}>
                        <Button name="semseter_code" type="button" value="1">Fall</Button>
                        <Button name="semseter_code" type="button" value="4">Spring</Button>
                        <Button name="semseter_code" type="button" value="7">Summer</Button>
                    </ButtonGroup>
                </FormGroup>
                <div>{semester_code}</div>
            </Form>
        );
    }
}

export default SemesterChooser;