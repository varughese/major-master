import React from "react";
import { Col, Button, FormGroup, Label, Input } from "reactstrap";

import { withFirebase } from "./firebase";
import * as ROUTES from "../constants/routes";

class SignUpBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password: "",
      firstname: "",
      lastname: "",
      enrollterm: "",
      major1: "",
      validation: {
        validEmail: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.listOfMajors = [
      "ADMJ",
      "ADMPS",
      "AFRCNA",
      "AFROTC",
      "ANTH",
      "ARABIC",
      "ARTSC",
      "ASL",
      "ASTRON",
      "ATHLTR",
      "BACC",
      "BCHS",
      "BECN",
      "BFAE",
      "BFIN",
      "BHRM",
      "BIND",
      "BIOENG",
      "BIOETH",
      "BIOINF",
      "BIOSC",
      "BIOST",
      "BMIS",
      "BMKT",
      "BOAH",
      "BORG",
      "BQOM",
      "BSEO",
      "BSPP",
      "BUS",
      "BUSACC",
      "BUSADM",
      "BUSBIS",
      "BUSECN",
      "BUSENV",
      "BUSERV",
      "BUSFIN",
      "BUSHRM",
      "BUSMKT",
      "BUSORG",
      "BUSQOM",
      "BUSSCM",
      "BUSSPP",
      "CDACCT",
      "CDENT",
      "CEE",
      "CGS",
      "CHE",
      "CHEM",
      "CHIN",
      "CLASS",
      "CLRES",
      "CMME",
      "CMMUSIC",
      "CMPBIO",
      "CMPINF",
      "COE",
      "COEA",
      "COMMRC",
      "CS",
      "CSD",
      "DENHYG",
      "DENT",
      "DIASCI",
      "DMED",
      "DSANE",
      "DUPOSC",
      "EAS",
      "ECE",
      "ECON",
      "EDUC",
      "EM",
      "ENDOD",
      "ENGCMP",
      "ENGFLM",
      "ENGLIT",
      "ENGR",
      "ENGSCI",
      "ENGWRT",
      "ENRES",
      "EOH",
      "EPIDEM",
      "FACDEV",
      "FILMG",
      "FILMST",
      "FP",
      "FR",
      "FTADMA",
      "FTDA",
      "FTDB",
      "FTDC",
      "FTDJ",
      "FTDR",
      "GEOL",
      "GER",
      "GERON",
      "GREEK",
      "GREEKM",
      "GSWS",
      "HAA",
      "HEBREW",
      "HIM",
      "HINDI",
      "HIST",
      "HONORS",
      "HPA",
      "HPM",
      "HPS",
      "HRS",
      "HUGEN",
      "IDM",
      "IE",
      "IL",
      "IMB",
      "INFSCI",
      "INTBP",
      "IRISH",
      "ISB",
      "ISSP",
      "ITAL",
      "JPNSE",
      "JS",
      "KOREAN",
      "LATIN",
      "LAW",
      "LCTL",
      "LDRSHP",
      "LEGLST",
      "LING",
      "LIS",
      "LSAP",
      "MATH",
      "ME",
      "MED",
      "MEDEDU",
      "MEMS",
      "MILS",
      "MOLBPH",
      "MSBMS",
      "MSCBIO",
      "MSCBMP",
      "MSCMP",
      "MSE",
      "MSMBPH",
      "MSMGDB",
      "MSMI",
      "MSMPHL",
      "MSMVM",
      "MSNBIO",
      "MUSIC",
      "NEURO",
      "NPHS",
      "NROSCI",
      "NUR",
      "NURCNS",
      "NURNM",
      "NURNP",
      "NURSAN",
      "NURSP",
      "NUTR",
      "ODO",
      "ORBIOL",
      "ORSUR",
      "OT",
      "PAS",
      "PEDC",
      "PEDENT",
      "PEDS",
      "PERIO",
      "PERS",
      "PETE",
      "PHARM",
      "PHIL",
      "PHYS",
      "PIA",
      "POLISH",
      "PORT",
      "PROSTH",
      "PS",
      "PSY",
      "PSYC",
      "PSYED",
      "PT",
      "PUBHLT",
      "PUBSRV",
      "PWEA",
      "QUECH",
      "REHSCI",
      "REL",
      "RELGST",
      "RESTD",
      "RUSS",
      "SA",
      "SERCRO",
      "SLAV",
      "SLOVAK",
      "SOC",
      "SOCWRK",
      "SPAN",
      "STAT",
      "SWAHIL",
      "SWBEH",
      "SWCED",
      "SWCOSA",
      "SWE",
      "SWGEN",
      "SWINT",
      "SWRES",
      "SWWEL",
      "TELCOM",
      "THEA",
      "TURKSH",
      "UKRAIN",
      "URBNST",
      "VIET"
    ];
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.state.firstname === "") {
      this.setState({
        errorMessage: "First name is not entered"
      });
    } else if (this.state.lastname === "") {
      this.setState({
        errorMessage: "Last name is not entered"
      });
    } else if (this.state.password !== this.state.password1) {
      this.setState({
        errorMessage: "Passwords do not match"
      });
    } else if (this.state.enrollterm === "") {
      this.setState({
        errorMessage: "Enrollment term is not entered"
      });
    } else {
      try {
        await this.props.firebase.createUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        );
      } catch (e) {
        this.setState({
          errorMessage: e.message
        });
        return;
      }

      const user = this.props.firebase.getUser();
      user.sendEmailVerification();
      const user_ref = this.props.firebase.user_ref();
      user_ref.set({
        email: this.state.email,
        enrollment_term: this.state.enrollterm,
        first_name: this.state.firstname,
        last__name: this.state.lastname,
        id: user.uid,
        major1: this.state.major1,
        semesters: {
          [this.state.enrollterm]: {
            id: this.state.enrollterm,
            courses: {}
          }
        }
      });

      // this is janky lol, suppose to do similar to what
      // kyle did with React Router
      window.location.assign(ROUTES.HOME);
    }
  }

  handleMajorSelect = event => {
    this.setState(
      { major1: event.target.value }
      //, () => console.log(this.state.major1)
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: ""
    });
  };

  checkEmail(e) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validation } = this.state;
    if (regex.test(e.target.value)) {
      validation.validEmail = "success";
    } else {
      validation.validEmail = "error";
    }
    this.setState({ validation });
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="inputFirstName">Name:</Label>
            <Input
              name="firstname"
              id="inputFirstName"
              placeholder="First name"
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <Input
              name="lastname"
              id="inputLastName"
              placeholder="Last name"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputEnrollTerm">Enrollment Term:</Label>
            <Input
              name="enrollterm"
              id="inputEnrollTerm"
              placeholder="Enrollment Term"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputEmail">Email address:</Label>
            <Input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="e.g. johndoe123@email.com"
              onChange={e => {
                this.checkEmail(e);
                this.handleChange(e);
              }}
              //valid={this.state.validation.emailState === "success"}
              //invalid={this.state.validation.emailState === "error"}
            />
            {/*<FormFeedback valid>Valid email</FormFeedback>
          <FormFeedback invalid>Invalid email</FormFeedback>*/}
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword1">Create Password:</Label>
            <Input
              type="password"
              name="password1"
              id="inputPassword1"
              placeholder="No spaces or special characters such as '!@#$%'"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword2">Confirm Password:</Label>
            <Input
              type="password"
              name="password"
              id="inputPassword2"
              placeholder="Confirm password"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="majorSelect">Select Major</Label>
            <Input
              type="select"
              name="select"
              id="majorSelect"
              onChange={e => {
                this.handleMajorSelect(e);
              }}
            >
              {this.listOfMajors.map(major => (
                <option key={major}>{major}</option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="major2Select">Select Second Major (optional)</Label>
            <Input
              type="select"
              name="select"
              id="major2Select"
              //onChange={e => {
              //  this.handleMajorSelect(e);
              //}}
            >
              {this.listOfMajors.map(major => (
                <option key={major}>{major}</option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="majorSelect">Select Minor (optional)</Label>
            <Input
              type="select"
              name="select"
              id="minorSelect"
              //onChange={e => {
              //  this.handleMajorSelect(e);
              //}}
            >
              {this.listOfMajors.map(major => (
                <option key={major}>{major}</option>
              ))}
            </Input>
          </FormGroup>

          <p>{errorMessage}</p>
          <Button type="submit">Create Account</Button>
        </form>
      </Col>
    );
  }
}

export default withFirebase(SignUpBase);
