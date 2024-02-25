import React, { Component , useState, useEffect  } from "react";
import { MainContext } from "../core/MainContext";
import Aux from "../hoc/_Aux";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CountryRegionData } from "react-country-region-selector";
import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
  Form,
  Collapse,
  Modal,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { CONFIG } from "../helpers/configFb";
import UcFirst from "../App/components/UcFirst";
import {
  getTechs,
  setTech,
} from "../helpers/fireStoreMain";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);
const techListCollection = collection(db, 'tech-list');

export const fetchTechConData = async () => {
  const techDataSnapshot = await getDocs(techListCollection);
  const techData = techDataSnapshot.docs.map((doc) => doc.data().techCon);
  return techData;
};

export const getTechData = async () => {
  const techDataSnapshot = await getDocs(techListCollection);
  const techData = techDataSnapshot.docs.map(doc => doc.data());
  return techData;
};

class TechList extends Component {
  static context = MainContext;

  constructor(props) {
    super(props);


  this.getCountryValue =CountryRegionData.getCountryValue;

      // ... other bindings
      
    this.state = {
      showTable: true,
      writeAccess: true,
      techData: {
        techId: "",
        Addedby: "",
        techName: "",
        techCon: "",
        estimCost: "",
        paidby: "",
        techZip: "",
        techState: "",
        techCoverage: 40,
        techNote: "",
        techTrade: "",
        techUrgency: "",
      },
      selectedTarget:null,
      newTechModal: false,
      techList: [],
      selectedTech: [],
      filteredTech: [],
      isMultiTarget: [],
    };
  }

  getSuggestions = (value, field) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const { techList } = this.state;
  
    if (!inputValue || !techList || !techList.length) {
      return [];
    }
  
    return techList
      .filter(item => {
        const fieldValue = item.data[field]?.toLowerCase(); // Use optional chaining (?.) to avoid errors if field is undefined
        return fieldValue && fieldValue.includes(inputValue);
      })
      .map(item => item.data[field]);
  };
  
  
  // ... Other methods
  renderSuggestion = (suggestion) => <div>{suggestion}</div>;
  componentDidMount = async () => {
    const techList = await getTechs();
    this.setState({ techList });
  };
  targetHandler = (target) => {
    this.setState((prevState) => ({
      selectedTarget: prevState.selectedTarget === target ? null : target,
    }));
  };
  

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      techData: {
        ...prevState.techData,
        [name]: value,
      },
    }));
  };

  addTechSubmit = async () => {
    const { techData } = this.state;

    try {
      const docRef = await addDoc(collection(db, "tech-list"), techData);

      const newTechList = [...this.state.techList, { ...techData }];
      this.setState({
        techList: newTechList,
        techData: {
          techId: "",
          Addedby: "",
          freeEstim: [true],
          techName: "",
          techCon: "",
          estimCost: "",
          paidby: "",
          techZip: "",
          techState: "",
          techCoverage: "50 miles",
          techNote: "",
          techTrade: "",
          techUrgency: "",
        },
      });
    } catch (error) {
      console.error("Error adding tech:", error);
    }
  };



render() {
    const { techData } = this.state;
    

    return (
      <>
        <div>
          <Button
            onClick={() => {
              this.setState({ newTechModal: true });
            }}
            variant="primary"
          >
            Add Technician
          </Button>
        </div>

        {this.state.showTable && (
          <div>
            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>

                      <td>
                        <Button
                          onClick={() => this.targetHandler("target1")}
                          aria-controls="target1"
                          aria-expanded={this.state.selectedTarget === "target1"}
                        >
                          Zip Code
                        </Button>
                        <Collapse in={this.state.selectedTarget === "target1"}>
                          <div id="target1">
                            <Autocomplete
                              value={techData.techZip}
                              onChange={(event, newValue) => {
                                this.setState((prevState) => ({
                                  techData: {
                                    ...prevState.techData,
                                    techZip: newValue,
                                  },
                                }));
                              }}
                              options={this.getSuggestions(techData.techZip, 'techZip')}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  style={{ width: "97%" }}
                                  name="techZip"
                                  placeholder="Search Via Zip..."
                                  onChange={(event) => this.handleInputChange(event)}
                                />
                              )}
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                      <Button
                        onClick={() => this.targetHandler("target2")}
                        aria-controls="target2"
                        aria-expanded={this.state.selectedTarget === "target2"}
                      >
                        Tech Name
                      </Button>
                      <Collapse in={this.state.selectedTarget === "target2"}>
                        <div id="target2">
                          <Autocomplete
                            value={techData.techName}
                            onChange={(event, newValue) => {
                              this.setState((prevState) => ({
                                techData: {
                                  ...prevState.techData,
                                  techName: newValue,
                                },
                              }));
                            }}
                            options={this.getSuggestions(techData.techName, 'techName')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                type="text"
                                style={{ width: "97%" }}
                                name="techName"
                                placeholder="Search Via Name..."
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            )}
                          />
                        </div>
                      </Collapse>
                    </td>

                    <td>
                      <Button
                        onClick={() => this.targetHandler("target3")}
                        aria-controls="target3"
                        aria-expanded={this.state.selectedTarget === "target3"}
                      >
                        Tech Contact
                      </Button>
                      <Collapse in={this.state.selectedTarget === "target3"}>
                        <div id="target3">
                          <Autocomplete
                            value={techData.techCon}
                            onChange={(event, newValue) => {
                              this.setState((prevState) => ({
                                techData: {
                                  ...prevState.techData,
                                  techCon: newValue,
                                },
                              }));
                            }}
                            options={this.getSuggestions(techData.techCon, 'techCon')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                type="text"
                                style={{ width: "97%" }}
                                name="techCon"
                                placeholder="Search Via Contact..."
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            )}
                          />
                        </div>
                      </Collapse>
                    </td>

                        <td>
                        <Button
                          onClick={() => this.targetHandler("target4")}
                          aria-controls="target4"
                          aria-expanded={this.state.selectedTarget === "target4"}
                        >
                          Tech State
                        </Button>
                        <Collapse in={this.state.selectedTarget === "target4"}>
                          <div id="target4">
                            <Autocomplete
                              value={techData.techState}
                              onChange={(event, newValue) => {
                                this.setState((prevState) => ({
                                  techData: {
                                    ...prevState.techData,
                                    techState: newValue,
                                  },
                                }));
                              }}
                              options={this.getSuggestions(techData.techState, 'techState')}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  style={{ width: "97%" }}
                                  name="techState"
                                  placeholder="Search Via State..."
                                  onChange={(event) => this.handleInputChange(event)}
                                />
                              )}
                            />
                          </div>
                        </Collapse>
                      </td>

                      <td>
                        {" "}
                        <Button
                          onClick={() => this.targetHandler("target5")}
                          aria-controls="target5"
                          aria-expanded={this.state.selectedTarget === "target5"}
                        >
                          Free Estimation
                        </Button>
                        <Collapse in={this.state.selectedTarget === "target5"}>
                          <div id="target5">
                            <input
                              style={{ width: 100 }}
                              onClick={(event) =>
                                this.handleInputKeyPress(event, "target5")
                              }
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                        {" "}
                        <Button>Tech Trade</Button>
                      </td>
                      <td>
                        {" "}
                        <Button>Tech Coverage</Button>
                      </td>
                      <td>
                        {" "}
                        <Button>Tech Urgency</Button>
                      </td>
                      <td>
                        {" "}
                        <Button>Note about tech</Button>
                      </td>
                      <td>
                        <Button>Est. Cost</Button>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.techList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.data.techZip}</td>
                        <td>{item.data.techName}</td>
                        <td>{item.data.techCon}</td>
                        <td>{item.data.techState}</td>
                        <td>{item.data.freeEstim}</td>
                        <td>{item.data.techTrade}</td>
                        <td>{item.data.techCoverage}</td>
                        <td>{item.data.techUrgency}</td>
                        <td>{item.data.estimCost}</td>
                        <td>{item.data.techNote}</td>
                        <td>{item.data.paidby}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

                  <Modal
                  show={this.state.newTechModal}
                  onHide={() => this.setState({ newTechModal: false })}
                   >    
                  <Modal.Header closeButton>
                  <Modal.Title>New Technician</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Form>
                  <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: 165 }}>Technician Name</InputGroup.Text>
                  <FormControl
                  type="text"
                  name="techName"
                  placeholder="Enter tech Name..."
                  value={techData.techName}
                  onChange={(event) => this.handleInputChange(event)}
                  />
                  </InputGroup>
                  <InputGroup className="mb-3">
                  <InputGroup.Text style={{width:165}}>Technician Contact</InputGroup.Text>
                  <FormControl
                  type="text"
                  name="techCon"
                  placeholder="Enter tech contact..."
                  value={techData.techCon}
                  onChange={(event) => this.handleInputChange(event)}
                  />
                  </InputGroup>
                  <InputGroup className="mb-3">
                  <InputGroup.Text style={{width:165}}>Technician State</InputGroup.Text>
                  <FormControl
                  type="text"
                  name="techState"
                  placeholder="Enter tech State..."
                  value={techData.techState}
                  onChange={(event) => this.handleInputChange(event)}
                  />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{width:165}}>Technician Zip</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techZip"
                      placeholder="Enter tech Zip..."
                      value={techData.techZip}
                       onChange={(event) => this.handleInputChange(event)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
        <InputGroup.Text style={{ justifyContent: "center", width: 165 }}>Technician Coverage</InputGroup.Text>
        <Form.Label htmlFor="customRange">
          <span style={{ width: "100%", display: "flex", justifyContent: "center" }}>{`${techData.techCoverage} Miles`}</span>
          <FormControl
            style={{ justifyContent: "center", width: 280 }}
            defaultValue={techData.techCoverage} // Use defaultValue for uncontrolled input
            max="100"
            min="0"
            step="10"
            id="customRange"
            type="range"
            className="custom-range"
            name="techCoverage"
            onChange={(event) => this.handleInputChange(event)}
            title={`${techData.techCoverage} Miles`}
          />
        </Form.Label>
      </InputGroup>
        
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{width:165}}>Technician Trade</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techTrade"
                      placeholder="Enter tech Trade..."
                      value={techData.techTrade}
                       onChange={(event) => this.handleInputChange(event)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{width:165}}>Technician urgency</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techUrgency"
                      placeholder="Enter tech Urgency..."
                      value={techData.techUrgency}
                       onChange={(event) => this.handleInputChange(event)}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{width:165}}>Note About Tech</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techNote"
                      placeholder="Whrite Notes about Tech..."
                      value={techData.techNote}
                       onChange={(event) => this.handleInputChange(event)}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: 165 }}>Free Estimation</InputGroup.Text>
                  <div style={{ marginTop: 7 }}>
                  <Form.Check
    
                   style={{ marginLeft: 20, transform: "scale(1.5)" }}
                   onChange={(e) => {
                   const isChecked = e.target.checked;
                    let selectedStatus = isChecked ? "FREE" : "";
                    
                    this.setState({
                      freeEstim: isChecked,
                      selectedStatus: selectedStatus,
                      techData: {
                        ...this.state.techData,
                        estimCost: isChecked ? "0$" : this.state.techData.estimCost // Set estimCost based on isChecked
                      }
                      });
                        }}
                        custom
                        id="checkbox2"
                      />
                    </div>
                  </InputGroup>

                  {!this.state.freeEstim && ( // Render InputGroup only if freeEstim is false
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: 165 }}>Estimation Cost</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="estimCost"
                        placeholder="Enter Estimation Cost..."
                        value={this.state.techData.estimCost}
                        onChange={(event) => this.handleInputChange(event)}
                      />
                    </InputGroup>
                  )}

                  <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: 165 }}>Payment Method</InputGroup.Text>
                  <FormControl
                  as="select"
                  name="paidby"
                  value={techData.paidby}
                   onChange={(event) => this.handleInputChange(event)}
                  >
                   <option value="">Select a payment method...</option>
                   <option value="CashApp">CashApp</option>
                   <option value="Zelle">Zelle</option>
                   <option value="Paypal">Paypal</option>
                   <option value="Venmo">Venmo</option>
                   <option value="Square">Square</option>
                  </FormControl>
                  </InputGroup>

                  </Form>
                  </Modal.Body>
                  <Modal.Footer>
                  <Button
                  variant="secondary"
                  onClick={() => this.setState({ newTechModal: false })}
                  >
                  Close
                  </Button>
                  <Button variant="primary" onClick={this.addTechSubmit}>
                  Save Changes
                 </Button>
                 </Modal.Footer>
                 </Modal>
                 
                 </div>
                 )}
                 </>
                 );
                 }
                 }

export default TechList;