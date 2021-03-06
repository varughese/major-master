import React, { Component } from 'react';
import { Button, ButtonGroup, Input } from 'reactstrap';

class SemesterChooser extends Component{
    constructor(props){
        super(props);
        this.state = {
            semseter_code: "Enter Semseter Code",
            year_code: "",
            full_term_code: ""
        };
    }

    onTermChange = event => {
        const { name, value } = event.target;
        if(event.target.name === "semseter_code") {
            this.setState({
                active_button: value
            });
        }

        this.setState({ [name]: value }, (state) => {
            if(this.state["year_code"].length === 4){
                let yr = this.state["year_code"];
                let yrAbrv = Number(yr.substring (2,4));
                const sem = this.state["semseter_code"];
                if(Number(sem) === 1) yrAbrv++;
                var temp = yr.substring(0,1) + yrAbrv + this.state["semseter_code"];
                this.setState({"full_term_code": temp});
                this.props.setTermCode(temp);
            }
        });
        
	}

    render() {
        const { semester_code, year_code, active_button } = this.state;
        return (
            <div className="semester-chooser">
                <ButtonGroup value={semester_code} onClick={this.onTermChange}>
                    <Button active={active_button === '1'} name="semseter_code" type="button" value="1">Fall</Button>
                    <Button active={active_button === '4'} name="semseter_code" type="button" value="4">Spring</Button>
                    <Button active={active_button === '7'} name="semseter_code" type="button" value="7">Summer</Button>
                </ButtonGroup>
                <Input type="number" 
                        name="year_code" 
                        placeholder="Year"
                        onChange={this.onTermChange}
                        value={year_code}
                        id="year_code" 
                />
            </div>
        );
    }
}

export default SemesterChooser;