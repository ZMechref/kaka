import React, { Component } from "react";
import { MainContext } from "../core/MainContext";
import { CONFIG } from "../helpers/configFb";
import Autosuggest from 'react-autosuggest';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getTechData , fetchTechConData } from './TechList';
import {
  Row,
  Col,
  Card,
  Badge,
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
  ButtonWithBadge,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  dispDoc,
  findWoByNumber,
  findWoForCurrentUser,
  updateDispatcherData,
  jobData,
  updateChanges,
  setJobStatus,
  setTech,
  getTechs,
  techDoc,
} from "../helpers/fireStoreMain";
import FormFileLabel from "react-bootstrap/esm/FormFileLabel";

import { data } from "jquery";


const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

const estimtable = document.getElementById("esTimmNeededTable");
const jobdonetable = document.getElementById("jobDoneTable");


const CustomComponent = ({ data }) => {
  return (
    <div
      style={{
        marginLeft: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {data}
    </div>
  );
};

class Dispatcher extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
    
    this.state = {
      showTable: true,
      writeAccess: true,

      estimTechName: "",
      estimTechCon: "",
      estimTechproffesion: "",
      estimCost: "",
      estimPaidby: "",
      estimPaymentAdress: "",
      estimTechDescription: "",
      estimscheduleddate: "",
      estimscheduledtimee: "",
      
      jobDoneTechName: "",
      jobDoneTechCon: "",
      jobdoneTechproffesion: "",
      jobDoneCost: "",
      jobDonePaidby: "",
      jobDonePaymentAdress: "",
      jobDoneHours: "",
      jobDoneTechDescription: "",
      suppliyer: "",
      otherSuppliyer: "",
      material: "",
      jobdonescheduledate: "",
      jobdonescheduledtime: "",

      estimTechId:"",
      jobDoneTechId:"",

      dispId: "",
      jobType: "",

      data: {

        estimTechName: "",
        estimTechCon: "",
        estimTechproffesion: "",
        estimCost: "",
        estimPaidby: "",
        estimPaymentAdress: "",
        estimTechDescription: "",
        estimscheduleddate: "",
        estimscheduledtimee: "",
       
        jobDoneTechId:"",
        estimTechId:"",

        jobDoneTechName: "",
        jobDoneTechCon: "",
        jobdoneTechproffesion: "",
        jobDoneCost: "",
        jobDonePaidby: "",
        jobDonePaymentAdress: "",
        jobDoneHours: "",
        jobDoneTechDescription: "",
        suppliyer: "",
        otherSuppliyer: "",
        material: "",
        jobdonescheduledate: "",
        jobdonescheduledtime: "",
        dispId: "",
        jobType: "",
      },
      errorMessage: "",
      woNbSearch: "",
      subClicked: false,
      onFindWOClick: false,
      jobDoneNeededCount: 0,
      estimNeededCount: 0,

      estimationListModal: false,
      JobDoneListModal: false,
      on1stsubmitclick: false,
      on2cdsubmitclick: false,
      onestimclicktoconfirm: false,

      estimNeededList: [],
      jobDoneList: [],
      jobList: [],
      estimJobList: [],
      jobDoneJobList: [],
      selectedJob: [  ],
      filteredTechNames: [],
      techList:[],

      closeJobItemModal: false,
      modalDisplayWOdetails: false,
      estimationProcess: false,

      estimationFinalize: false,
      techData:{ techCon:"",
                 techName:"",}
    }; 
  
  }
  async componentDidMount() {
    try {
      const techConData = await fetchTechConData();
      this.setState({ techList: techConData });
    } catch (error) {
      console.error('Error fetching techCon data:', error);
    }
  }

 getSuggestions = (value, field) => {
  if (!value) {
    return [];
  }

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
componentDidMount() {
  this.fetchTechData();
}

fetchTechData = async () => {
  try {
    const techData = await getTechData();
    this.setState({ techList: techData });
  } catch (error) {
    console.error('Error fetching tech data:', error);
  }
};

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

  estimationProcess = () => {};
  on1stsubmitclick = () => {};
  on2cdsubmitclick = () => {};
  onestimclicktoconfirm = () => {};
  onFindWOClick = () => {};
  estimationListModal = () => {};
  JobDoneListModal = () => {};
  checkbox1Checked = () => {};

 onFinishOnSite = (data) => {
  // Assuming this.state.selectedJob.id and data are used in the setJobStatus function
  setJobStatus(this.state.selectedJob.id, "jobDoneScheduled")
    .then(() => {
      // Code to execute after setJobStatus completes successfully
      // You can add further logic here if needed
    })
    .catch((error) => {
      // Error handling for setJobStatus or any other promise in the chain
      console.error('Error:', error);
    });
};

 
  
  onSubmitEstimation = () => {
    const data = {
      estimTechName: this.state.estimTechName,
      estimTechCon: this.state.estimTechCon,
      estimTechproffesion: this.state.estimTechproffesion,
      estimCost: this.state.estimCost,
      estimPaidby: this.state.estimPaidby,
      estimPaymentAdress: this.state.estimPaymentAdress,
      estimTechDescription: this.state.estimTechDescription,
      estimscheduleddate: this.state.estimscheduleddate,
      estimscheduledtimee: this.state.estimscheduledtimee,
      estimTechId: this.state.estimTechId,

      jobDoneTechName: this.state.jobDoneTechName,
      jobDoneTechCon: this.state.jobDoneTechCon,
      jobdoneTechproffesion: this.state.jobdoneTechproffesion,
      jobDoneCost: this.state.jobDoneCost,
      jobDonePaidby: this.state.jobDonePaidby,
      jobDonePaymentAdress: this.state.jobDonePaymentAdress,
      jobDoneHours: this.state.jobDoneHours,
      jobDoneTechDescription: this.state.jobDoneTechDescription,
      suppliyer: this.state.suppliyer,
      otherSuppliyer: this.state.otherSuppliyer,
      material: this.state.material,
      jobdonescheduledate: this.state.jobdonescheduledate,
      jobdonescheduledtime: this.state.jobdonescheduledtime,
      jobDoneTechId: this.state.jobDoneTechId,

      jobType: this.state.jobType,
    };

    updateDispatcherData(this.state.selectedJob.id, data)
      .then(() => {
        return setJobStatus(this.state.selectedJob.id, "estimationScheduled");
      })
      .then(() => {   
      })
      .catch((error) => {
      });
  };

  onSubmitJobDone = (item) => {
    const data = {
      estimTechName: item.data.dispatcherData.estimTechName,
      estimTechCon: item.data.dispatcherData.estimTechCon,
      estimTechproffesion: item.data.dispatcherData.estimTechproffesion,
      estimCost: item.data.dispatcherData.estimCost,
      estimPaidby: item.data.dispatcherData.estimPaidby,
      estimPaymentAdress: item.data.dispatcherData.estimPaymentAdress,
      estimTechDescription: item.data.dispatcherData.estimTechDescription,
      estimscheduleddate: item.data.dispatcherData.estimscheduleddate,
      estimscheduledtimee: item.data.dispatcherData.estimscheduledtimee,
      estimTechId: item.data.DispatcherData.estimTechId,

      jobDoneTechName: this.state.jobDoneTechName,
      jobDoneTechCon: this.state.jobDoneTechCon,
      jobdoneTechproffesion: this.state.jobdoneTechproffesion,
      jobDoneCost: this.state.jobDoneCost,
      jobDonePaidby: this.state.jobDonePaidby,
      jobDonePaymentAdress: this.state.jobDonePaymentAdress,
      jobDoneHours: this.state.jobDoneHours,
      jobDoneTechDescription: this.state.jobDoneTechDescription,
      suppliyer: this.state.suppliyer,
      otherSuppliyer: this.state.otherSuppliyer,
      material: this.state.material,
      jobdonescheduledate: this.state.jobdonescheduledate,
      jobdonescheduledtime: this.state.jobdonescheduledtime,
      jobDoneTechId: item.data.DispatcherData.jobDoneTechId,

      jobType: this.state.jobType,
    };

    // Assuming 'updateDispatcherData' and 'setJobStatus' return promises
    updateDispatcherData(this.state.selectedJob.id, data)
      .then(() => {
        return setJobStatus(this.state.selectedJob.id, "jobDoneScheduled");
      })
      .then(() => {
        // Handle any further actions after setting job status
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  updateDimensions = () => {

    this.setState({ innerWidth: window.innerWidth });
    const width = window.innerWidth;
  };
  
  countStatus = (status) => {
    const count = this.state.jobList.filter(
      (item) => item.data.status === status
    ).length;
    return count;
  };

  componentDidMount() {
    const estimNeededCount = this.countStatus("estimationNeeded");
    const jobDoneNeededCount = this.countStatus("jobDoneNeeded");

    this.setState({
      estimNeededCount,
      jobDoneNeededCount,
    });
  }

  componentDidMount() {
    this.countEstimNeeded(); // Call the count function on mount
  }
  countEstimNeeded = () => {
    const count = this.state.jobList.filter(
      (item) => item.data.status === "estimationNeeded"
    );

    this.setState({ estimNeededCount: count });
  };

  componentDidMount() {
    this.countJobDoneNeeded(); // Call the count function on mount
  }
  countJobDoneNeeded = () => {
    const count = this.state.jobList.filter(
      (item) => item.data.status === "jobDoneNeeded"
    ).length;

    this.setState({ jobDoneNeededCount: count });
  };

  componentDidMount = async () => {
    window.addEventListener("resize", this.updateDimensions);
    const context = this.context;
    console.log("context currentUser disp Page", context.currentUser);

    if (context.currentUser !== null) {
      const estimNeededList =
        (await findWoForCurrentUser(context.currentUser.uid)) |
        (this.state.status === "estimationNeeded");

      const jobDoneList =
        (await findWoForCurrentUser(context.currentUser.uid)) |
        (this.state.jobStatus === "jobDoneNeeded");

      const jobList = await findWoForCurrentUser(context.currentUser.uid).then(
        (resp) => {
          const a = this.getEstimatedPending(resp);
          const b = this.getJobDonePending(resp);
          this.setState({
            jobList: resp,
            estimationPending: a.tostring,
            jobDonePending: b.tostring,
          });
        }
      );

    }
  };

  getEstimatedPending = async (list) => {
    let count = 0;
    list.map((item) => {
      if (item.data.status === "estimationNeeded") count = count + 1;
    });
    this.setState({ estimNeededCount: count });
    return count;
  };
  getJobDonePending = async (list) => {
    let count = 0;
    list.map((item) => {
      if (item.data.status === "jobDoneNeeded") count = count + 1;
    });
    this.setState({ jobDoneNeededCount: count });
    return count;
  };

  handleClose = () => {
    this.setState({ estimationProcess: false });
    this.setState({ closeJobItemModal: false });
    this.setState({ estimationListModal: false });
    this.setState({ JobDoneListModal: false });
    this.setState({ on1stsubmitclick: false });
    this.setState({ onestimclicktoconfirm: false });
    this.setState({ on2cdsubmitclick: false });
    this.setState({ onSubmitClick: false });
    this.setState({ modalDisplayWOdetails: false });
    this.setState({ estimationFinalize: false });
  };
  onPressed = () => {
    const { password } = this.state;
    this.setState({
      data: {
        estimTechName: "",
        estimTechCon: "",
        estimTechproffesion: "",
        estimCost: "",
        estimPaidby: "",
        estimPaymentAdress: "",
        estimTechDescription: "",
        estimscheduleddate: "",
        estimscheduledtimee: "",

        jobDoneTechName: "",
        jobDoneTechCon: "",
        jobdoneTechproffesion: "",
        jobDoneCost: "",
        jobDonePaidby: "",
        jobDonePaymentAdress: "",
        jobDoneHours: "",
        jobDoneTechDescription: "",
        suppliyer: "",
        otherSuppliyer: "",
        material: "",
        jobdonescheduledate: "",
        jobdonescheduledtime: "",

        dispId: "",
        jobType: "",
      },
    });
  };

  render() {
    const { selectedJob } = this.state;
    const {
    
      techList,
      getTechs,
      estimNeededCount,
      jobDoneNeededCount,
      selectedTarget,
    } = this.state;


    const sortedJobList = this.state.jobList
      .filter(item => item.data.status === 'jobDoneNeeded') // Filter based on jobStatus
      .sort((a, b) => {
        const dateA = new Date(a.data.jobData.neededdate);
       
        const dateB = new Date(b.data.jobData.neededdate);
        console.log("YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",dateB);
        const today = new Date();

        const differenceA = Math.abs(dateA - today);
        const differenceB = Math.abs(dateB - today);

        return differenceA - differenceB;
      });
     
 
const ButtonWithBadge = ({ count, text }) => (
  <button style={{ backgroundColor: 'lightblue' }} onClick={() => this.targetHandler(text)} aria-controls={text} aria-expanded={selectedTarget === text}>
    {text}
    {count > 0 && <Badge variant="light" style={{ fontSize: 14, color: 'red' }} className="ml-1">{count}</Badge>}
  </button>
);
const context = this.context;
const tabEstimationbContent = (

  <Col>
  <button>UpLoad Pictures</button>
  <button>UpLoad SignOff Sheet</button>
  <button>Upload Tech's Quotation</button>
  <button>Upload Tech's Recommendations</button>
  <Button onClick={() => this.onFinishOnSite({ selectedJob: { data: 'jobDoneScheduled' } })}>Finish On Site</Button>


  <Form.Control
    aria-controls="target5"
    aria-expanded={selectedTarget === 'target5'}
    style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1%',
    }}
    placeholder=" Tech's Recommendations"
    as="textarea"
    rows="3"
  />

  <Button onClick={() => this.setState({ selectedJob: { data: 'QuotationNeededy' } })}>Finalize Estim.</Button>
</Col>
);

const tabbJobdoneContent = (
  <div style={{ display: 'flex' }}>
  <Col> <button >UpLoad Pictures</button><>  </>
          <button>UpLoad SignOff Sheet</button><>  </>
          <button>Upload Tech's Quotation</button><>  </>
          <button>Upload Tech's Recommendations</button> <> </>
          <Button onClick={() => this.setState({ selectedJob: { data: "invoiceNeeded" } })}>Finalize Job</Button>
      
      <Form.Control
        aria-controls="target5"
        aria-expanded={selectedTarget === 'target5'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1%',
        }}
        placeholder=" Tech's Recommendations"
        as="textarea"
        rows="3"
      />
    
    </Col>
            {" "}

        </div> );

    return (
      <div>
        {" "}
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
         <Modal
        style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "-4%",
        }}
        show={this.state.JobDoneListModal}
        onHide={this.handleClose}
        centered="true"
        >
        <Modal.Header
        style={{
        backgroundColor: "white",
        width: "200%",
        display: "flex",
        flexDirection: "row",
         }}
         closeButton
         >
        <Modal.Title
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      Schedule New Job Done
        </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white", width: "200%" }}>
        <Card className="NewWorkOrders">
        <Card.Body className="px-0 py-2">
       
        <Table
          responsive
          hover
          style={{ backgroundColor: 'white' }}
          className="table mt-3"
          id="tablepadding"
        >
          <thead>
            <tr>
              <th>WO numb</th>
              <th>Job location</th>
              <th>Contact</th>
              <th>Trade</th>
              <th>NTE</th>
              <th>Client Name</th>
              <th>Submitted date</th>
              <th>Needed Date</th>
              <th>Urgency</th>
              <th>Job Description</th>
            </tr>
          </thead>
          <tbody>
            {sortedJobList.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  this.setState({
                    JobDoneListModal:false,
                    closeJobItemModal: true,
                    selectedJob: item,
                  });
                }}
              >
                <td>{item.data.woNum}</td>
                <td>{item.data.jobData.joblocation}</td>
                <td>{item.data.jobData.contact}</td>
                <td>{item.data.jobData.trade}</td>
                <td>{item.data.jobData.nte}</td>
                <td>{item.data.jobData.clientName}</td>
                <td>{item.data.jobData.submdate}</td>
                <td>{item.data.jobData.neededdate}</td>
                <td>{item.data.jobData.urgency}</td>
                <td>{item.data.jobData.jobdescr}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      
        </Card.Body>
       </Card>
        </Modal.Body>
        <Modal.Footer
    style={{
      height: "80%",
      backgroundColor: "whitesmoke",
      width: "200%",
      display: "flex",
      flexDirection: "row",
    }}
        ></Modal.Footer>
         </Modal>

          {/* {heda te3 new jobdone list} */}

          <Modal
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "-4%",
            }}
            show={this.state.estimationListModal}
            onHide={this.handleClose}
            centered={true}


          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Schedule New estimation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "white", width: "200%" }}>
              <Card className="NewWorkOrders">
                <Card.Body className="px-0 py-2">
                  <Table
                    responsive
                    hover
                    style={{ backgroundColor: "white" }}
                    className="table mt-3"
                    id="tablepadding"
                  >
                    <thead>
                    <tr>
                  <th>WO numb</th>
                  <th>Job location</th>
                  <th>contact</th>
                  <th>Trade</th>
                  <th>NTE</th>
                  <th>Client Name</th>
                  <th>Submitted date</th>
                  <th>Needed Date</th>
                  <th>Urgency</th>
                  <th>Job Description</th>
                </tr>
                    </thead>
                    <tbody>
                      {this.state.jobList.map((item, index) => {
                        if (item.data.status === "estimationNeeded") {
                          return (
                            <tr
                              key={index}
                              onClick={() => {
                                this.setState({
                                  estimationProcess: true,
                                  estimationListModal: false,
                                  selectedJob: item,
                                });
                              }}
                              style={{
                                backgroundColor:
                                  item.data.jobData.neededdate === "today"? "red" : "lightorange",
                              }}
                            >
                           <td>{item.data.woNum}</td>
                        <td>{item.data.jobData.joblocation}</td>
                        <td>{item.data.jobData.contact}</td>
                        <td>{item.data.jobData.trade}</td>
                        <td>{item.data.jobData.nte}</td>
                        <td>{item.data.jobData.clientName}</td>
                        <td>{item.data.jobData.submdate}</td>
                        <td>{item.data.jobData.neededdate}</td>
                        <td>{item.data.jobData.urgency}</td>
                        <td>{item.data.jobData.jobdescr}</td>
                              <td
                                style={{
                                  paddingTop: "3px",
                                  display: "flex",
                                }}
                              ></td>
                            </tr>
                          );
                        } else {
                          // Return null if the condition isn't met to skip rendering the row
                          return null;
                        }
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer
              style={{
                height: "80%",
                backgroundColor: "whitesmoke",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
            ></Modal.Footer>
          </Modal>

          {/* heda te3
           estimation list */}

       <Modal id="dynamicFormModule"
              centered={true}
              style={{
              marginLeft: "-4%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "InfoText",
            }}
            show={this.state.estimationProcess}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "130%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title  style={{ width: "130%", display: "flex",flexDirection: "row",  justifyContent: "center" }}
                 
              >
                Estimation Proccessing
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              md={3}
              style={{
                width: "130%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form>
                <Row>
                  <Col style={{ marginleft: "-55%" }}>
                  
                  <InputGroup size="sm" className="mb-3" style={{ width: '93%' }}>
            <InputGroup.Prepend style={{ width: '44%' }}>
              <InputGroup.Text>Tech Contact</InputGroup.Text>
            </InputGroup.Prepend>
            <Autocomplete
  value={this.state.techData.techCon}
  onChange={(event, newValue) => {
    this.setState((prevState) => ({
      techData: {
        ...prevState.techData,
        techCon: newValue,
      },
    }));
  }}
  options={this.state.techList} // Assuming techList contains an array of objects with a property 'techCon'
  renderInput={(params) => (
    <TextField
      {...params}
      type="text"
      style={{ width: '135%' }}
      name="techCon"
      placeholder="Search Via Contact..."
      onChange={(event) => this.handleInputChange(event)}
    /> 
  )}
/>
          </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{ width: "93%" }}>
          <InputGroup.Prepend style={{ width: "44%" }}>
            <InputGroup.Text>Tech Name</InputGroup.Text>
          </InputGroup.Prepend>
          <Autocomplete
  value={this.state.techData.techName}
  onChange={(event, newValue) => {
    this.setState((prevState) => ({
      techData: {
        ...prevState.techData,
        techName: newValue,
      },
    }));
  }}
  options={this.state.techList.map(item => item.data.techName)} // Assuming techList contains an array of objects with a property 'techCon'
  renderInput={(params) => (
    <TextField
      {...params}
      type="text"
      style={{ width: '135%' }}
      name="techName"
      placeholder="Search Via Name..."
      onChange={(event) => this.handleInputChange(event)}
    /> 
  )}
/>
         </InputGroup>

                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Profession
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimTechproffesion: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    {/* profession /////////////////////////////////////////////////////////// */}

                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Trade
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({ jobType: text.target.value });
                        }}
                      />
                    </InputGroup>
                    {/* Trade ///////////////////////////////////// */}
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          NTE
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({ estimCost: text.target.value });
                        }}
                      />
                    </InputGroup>
                    {/* NTE ///////////////////////////////////////////////////////// */}
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Date
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="date"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimscheduleddate: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>

                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Time
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="time"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimscheduledtimee: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>


                  </Col>

                  <Col md={5}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Note About Job</Form.Label>
                      <Form.Control
                        style={{
                          width: "110%",
                          display: "flex",
                          backgroundColor: "whitesmoke",
                          flexDirection: "row",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimTechDescription: text.target.value,
                          });
                        }}
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>{" "}

                    <div>
  <InputGroup
    size="sm"
    className="mb-3"
    style={{ width: "110%", marginTop: 20 }}
  >
    <InputGroup.Prepend style={{ width: "44%" }}>
      <InputGroup.Text id="inputGroup-sizing-sm">
        Submited Date
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormFileLabel
      aria-label="Small"
      style={{
        background: "whitesmoke",
        display: "flex",
        borderColor: "grey",
      }}
    />
    <div
      style={{
        marginLeft: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Assuming selectedJob is set somewhere in your component's state */}
      {this.state.selectedJob && (
        <div>
          {this.state.selectedJob?.data?.jobData?.submdate}
        </div>
      )}
    </div>
  </InputGroup>
  <InputGroup
    size="sm"
    className="mb-3"
    style={{ width: "110%", marginTop: 20 }}
  >
    <InputGroup.Prepend style={{ width: "43%" }}>
      <InputGroup.Text id="inputGroup-sizing-sm">
        Needed Date
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormFileLabel
      aria-label="Small"
      style={{
        background: "whitesmoke",
        display: "flex",
        borderColor: "grey",
      }}
    />
    <div
      style={{
        marginLeft: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Assuming selectedJob is set somewhere in your component's state */}
      {this.state.selectedJob && (
        <div>
          {this.state.selectedJob?.data?.jobData?.neededdate}
        </div>
      )}
    </div>
  </InputGroup>
  <InputGroup
    size="sm"
    className="mb-3"
    style={{ width: "110%", marginTop: 20 }}
  >
    <InputGroup.Prepend style={{ width: "43%" }}>
      <InputGroup.Text id="inputGroup-sizing-sm">
        Your Name
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormFileLabel
      aria-label="Small"
      style={{
        background: "whitesmoke",
        display: "flex",
        borderColor: "grey",
      }}
    />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {context.currentUser != null
        ? `${context.currentUser.name} ${context.currentUser.lastName}`
        : this.state.userName}
    </div>
  </InputGroup>
</div>


                    <div>
                      <div></div>{" "}
                      <div
                        style={{
                          width: "",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "-9%",
                        }}
                      >
                        <Button
                          variant="primary"
                          style={{ width: "50%", marginTop: "8%" }}
                          onClick={() => {
                            this.setState({ on1stsubmitclick: true });
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          style={{ width: "50%", marginTop: "8%" }}
                          variant="secondary"
                          onClick={() => {
                            this.handleClose();
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer
  style={{
    width: "130%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  }}
>
  <div>
    Hello there, we need someone for{" "}
    <span style={{ color: "red" }}>
      {this.state.selectedJob?.data?.jobData?.trade}
    </span>{" "}
    to:{" "}
    <span style={{ color: "red" }}>
      {this.state.selectedJob?.data?.jobData?.jobdescr}
    </span>{" "}
    At:{" "}
    <span style={{ color: "red" }}>
      {this.state.selectedJob?.data?.jobData?.joblocation}
    </span>{" "}
    Asap please, Maximum by:{" "}
    <span style={{ color: "red" }}>
      {this.state.selectedJob?.data?.jobData?.neededdate}
    </span>
    . You guys do free estimation, right?{" "}
    <span style={{ color: "green" }}>YES?</span> AWESOME!{" "}
    <span style={{ color: "green" }}>No?</span> how much you guys charge? the
    best i can do is:{" "}
    <span style={{ color: "red" }}>
      {this.state.selectedJob?.data?.jobData?.nte}-25$
    </span>{" "}
    no? ok ok give me a minute i will ask my manager, i might be able to get
    you:{" "}
    <span style={{ color: "red" }}>
      {this.state.selectedJob?.data?.jobData?.nte}
    </span>
  </div>
</Modal.Footer>

          </Modal>

          {/* //heda te3 click on work orders in table  estimation processing*/}

          <Modal
              centered={true}
            style={{
              marginLeft: "-4%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
            show={this.state.closeJobItemModal}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "130%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  width: "130%",

                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Job Proccessing
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              md={3}
              style={{
                width: "130%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form>
                <Row>
                  <Col style={{ marginleft: "-55%" }}>
                  <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%" }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text>Tech Contact</InputGroup.Text>
                      </InputGroup.Prepend>

                      <FormControl
                        aria-label="Tech Contact"
                        style={{
                          background: "whitesmoke",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobDoneTechCon: text.target.value,
                           
                          });
                          this.setState({ estimTechCon: text.target.value,})
                        }}
                        title={this.state.selectedDDdata}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%" }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text>Tech Name</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Tech Name"
                        style={{
                          background: "whitesmoke",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobDoneTechName: text.target.value,
                          });
                          this.setState({ estimTechName: text.target.value})
                        }}
                        title={this.state.selectedDDdata}
                      />
                    </InputGroup>

                   
                    
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Profession
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobdoneTechproffesion: text.target.value,
                            estimTechproffesion: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>

                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          NTE
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({ jobDoneCost: text.target.value,
                            estimCost: "No Estim. Needed"
                           });

                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Date
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="date"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobdonescheduledate: text.target.value,
                            estimscheduleddate: "No Estim. Needed"
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Time
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="time"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobdonescheduledtime: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md={5}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Note About Job</Form.Label>
                      <Form.Control
                        style={{
                          width: "110%",
                          display: "flex",
                          backgroundColor: "whitesmoke",
                          flexDirection: "row",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobDoneTechDescription: text.target.value,
                            estimTechDescription: "No Estim. Needed",
                          });
                        }}
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>{" "}

                   <div>
        <InputGroup
          size="sm"
          className="mb-3"
          style={{ width: "110%", marginTop: 20 }}
        >
          <InputGroup.Prepend style={{ width: "44%" }}>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Submited Date
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormFileLabel
            aria-label="Small"
            style={{
              background: "whitesmoke",
              display: "flex",
              borderColor: "grey",
            }}
          />
          {/* Rendering CustomComponent instead of <d> */}
          {this.state.selectedJob && (
            <CustomComponent
              data={this.state.selectedJob?.data?.jobData?.submdate}
            />
          )}
        </InputGroup>

        <InputGroup
          size="sm"
          className="mb-3"
          style={{ width: "110%", marginTop: 20 }}
        >
          <InputGroup.Prepend style={{ width: "43%" }}>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Needed Date
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormFileLabel
            aria-label="Small"
            style={{
              background: "whitesmoke",
              display: "flex",
              borderColor: "grey",
            }}
          />
          {/* Rendering CustomComponent instead of <d> */}
          {this.state.selectedJob && (
            <CustomComponent
              data={this.state.selectedJob?.data?.jobData?.neededdate}
            />
          )}
        </InputGroup>

        <InputGroup
          size="sm"
          className="mb-3"
          style={{ width: "110%", marginTop: 20 }}
        >
          <InputGroup.Prepend style={{ width: "43%" }}>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Your Name
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormFileLabel
            aria-label="Small"
            style={{
              background: "whitesmoke",
              display: "flex",
              borderColor: "grey",
            }}
          />
          {/* Rendering CustomComponent instead of <d> */}
          <CustomComponent
            data={
              context.currentUser != null
                ? context.currentUser.name +
                  " " +
                  context.currentUser.lastName
                : this.state.userName
            }
          />
        </InputGroup>
      </div>

                    <div>
                      <div></div>{" "}
                      <div
                        style={{
                          width: "",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "-9%",
                        }}
                      >
                        <Button
                          variant="primary"
                          style={{ width: "50%", marginTop: "8%" }}
                          onClick={() => {
                            this.setState({ onestimclicktoconfirm: true });
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          style={{ width: "50%", marginTop: "8%" }}
                          variant="secondary"
                          onClick={() => {
                            this.handleClose();
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer
        style={{
          width: '130%',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          Hello there, we need someone for{' '}
          <span style={{ color: 'red' }}>
            {this.state.selectedJob?.data?.jobData?.trade}
          </span>{' '}
          to:{' '}
          <span style={{ color: 'red' }}>
            {this.state.selectedJob?.data?.jobData?.jobdescr}
          </span>{' '}
          At:{' '}
          <span style={{ color: 'red' }}>
            {this.state.selectedJob?.data?.jobData?.joblocation}
          </span>{' '}
          Asap please, Maximum by:{' '}
          <span style={{ color: 'red' }}>
            {this.state.selectedJob?.data?.jobData?.neededdate}
          </span>
          . You guys do free estimation, right?{' '}
          <span style={{ color: 'green' }}>YES?</span> AWESOME!{' '}
          <span style={{ color: 'green' }}>No?</span> how much you guys charge? the best I can do is:{' '}
          <span style={{ color: 'red' }}>
            {this.state.selectedJob?.data?.jobData?.nte}-25$
          </span>{' '}
          no? ok ok give me a minute I will ask my manager, I might be able to get you:{' '}
          <span style={{ color: 'red' }}>
            {this.state.selectedJob?.data?.jobData?.nte}
          </span>
        </div>
      </Modal.Footer>
          </Modal>

          {/* //heda te3 click on work orders in table  jobdone processing*/}

          <Modal
              centered={true}
            style={{
              marginTop: "15%",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
            show={this.state.onestimclicktoconfirm}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  justifyContent: "center",
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Confirm to Submit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
              }}
            >
              <div className="input-group mb-4">
                <input
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "center",
                  }}
                  type="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
            </Modal.Body>
            <div
              style={{
                // width: "100%",
                justifyContent: "center",
                backgroundBlendMode: "darken",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              Please Enter Your Password to Confirm
            </div>
            <Modal.Footer
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <button
                onClick={() => {
                  this.onPressed();
                  this.onSubmitJobDone(this.state.selectedJob);
                  this.handleClose();
                }}
              >
                Submit
              </button>
            </Modal.Footer>
          </Modal>

          {/* heda te3 confirm password to submit  schedualed job done */}

          <Modal
              centered={true}
            style={{
              marginTop: "15%",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
            show={this.state.on1stsubmitclick}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  justifyContent: "center",
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Confirm to Submit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
              }}
            >
              <div className="input-group mb-4">
                <input
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "center",
                  }}
                  type="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
            </Modal.Body>
            <div
              style={{
                // width: "100%",
                justifyContent: "center",
                backgroundBlendMode: "darken",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              Please Enter Your Password to Confirm Schedule estimation
            </div>
            <Modal.Footer
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <button
                onClick={() => {
                  // this.updateChanges.jobStatus = "estimationScheduled";
                  this.onPressed();
                  this.onSubmitEstimation(
                    this.state.selectedJob.data.status === "estimationScheduled"
                  );
                  this.handleClose();
                }}
              >
                Submit
              </button>
            </Modal.Footer>
          </Modal>
          {/* heda te3 confirm password to submit  schedualed estimation*/}

    <Modal
           style={{
           display: "flex",
           flexDirection: "row",
           marginLeft: "-4%",
           }}
           show={this.state.modalDisplayWOdetails}
           onHide={this.handleClose}
           centered="true" 
            >  <div
          centered="true" 
          style={{
          width:"200%",
          backgroundColor: "lightblue",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          }}
          >
            STATUS:{this.state.selectedJob?.data?.status}
          </div>
      <Modal.Header
            style={{
            backgroundColor: "white",
            width: "200%",
            display: "flex",
            flexDirection: "row",
             }}
             closeButton
             >
               
     <Row>
          <h6 style={{color:"green"}}> {"=="} </h6> 
          <h6
          style={{
          display: "flex",
          color:
          this.state.selectedJob?.data?.status ===
          "estimationScheduled"
           ? "red"
           : "grey",
           }}
            >  ESTIMATION  
          </h6>
          <h6>{"===========>"}</h6>
          <h6
             style={{
                 display: "flex",
                 color:
                 this.state.selectedJob?.data?.status ===
                 "quotationPending"
                  ? "red"
                  : "grey",
                }}
            >
                      {"QUOTATION"}
                    </h6>
                    <h6>{"===========>"}</h6>
                    <h6
                      style={{
                        display: "flex",
                        color:
                          (this.state.selectedJob?.data?.status ===
                            "jobDoneScheduled") |
                          "jobDoneNeeded"
                            ? "red"
                            : "grey",
                      }}
                    >
                      {"JOBDONE"}
                    </h6>
                    <h6>{"===============>"}</h6>
                    <h6>{"INVOICING"}</h6>
                    <h6>{"===============>"}</h6>
                    <h6>{"COMPLETED"}</h6>
      </Row>
      </Modal.Header>
            {" "}
     <Modal.Body
           centered="true" 
           style={{ backgroundColor: "white", width: "200%" }}
          >
       
      

    <Card className="NewWorkOrders">
        <Card.Body className="px-0 py-2">
          <InputGroup size="sm" className="mb-3">
            
          <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
              {selectedJob && selectedJob.data && selectedJob.data.dispatcherData && (
                <>
                  <div>{selectedJob.data.dispatcherData.estimscheduleddate}</div>
                  <div>{selectedJob.data.dispatcherData.estimscheduledtime}</div>
                  <div>{selectedJob.data.dispatcherData.estimTechName}</div>
                  <div>{selectedJob.data.dispatcherData.estimTechCon}</div>
                  <div>{selectedJob.data.dispatcherData.estimCost}</div>
                  <div>{selectedJob.data.dispatcherData.estimTechDescription}</div>
                </>
              )}
          </div>
          <div style={{ width: "18%"}}>

            <div> {"Pending"}</div> 
            <div> {"Approved"}</div>
           
          </div>
          <div>
                
           </div>
        
            <div  style={{ width: "21%", display: "flex", flexDirection: "column" }}>
              {selectedJob && selectedJob.data && selectedJob.data.dispatcherData && (
                <>
                  <div>{selectedJob.data.dispatcherData.jobdonescheduledate}</div>
                  <div>{selectedJob.data.dispatcherData.jobdonescheduledtime}</div>
                  <div>{selectedJob.data.dispatcherData.jobDoneTechName}</div>
                  <div>{selectedJob.data.dispatcherData.jobDoneTechCon}</div>
                  <div>{selectedJob.data.dispatcherData.jobDoneTechproffesionzz}</div>
                  <div>{selectedJob.data.dispatcherData.jobDoneHours}</div>
                  <div>{selectedJob.data.dispatcherData.jobDoneTechDescription}</div>
                </>
              )}
            </div>
       
        <div style={{ width: "18%"}}>
          <div>    </div>

<div> {"Pending"}</div> 
<div> {"Approved"}</div>
</div>
<div>
</div>
          </InputGroup>
        </Card.Body>

        {/* Additional content based on status */}
        <div>
          {selectedJob && selectedJob.data &&
            (selectedJob.data.status === "estimationScheduled" ? tabEstimationbContent : null)}
          {selectedJob && selectedJob.data &&
            (selectedJob.data.status === "jobDoneScheduled" ? tabbJobdoneContent : null)}
        </div>
      </Card>
      </Modal.Body>
      <Modal.Footer
        style={{
           height: "80%",
           backgroundColor: "whitesmoke",
           width: "200%",
           display: "flex",
           flexDirection: "row",
           }}
        >
      </Modal.Footer>
     </Modal>

          {/* heda te3 display job schedualled details */}
        </div>
        ;
        {this.state.showTable && (
          <div>
            <Row
              style={{
                flexDirection: "row",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    this.setState({ estimationListModal: true });
                  }}
                  className="btn btn-primary"
                >
                  {"Estim. to schedule"}
                  <span style={{ color: 'red' , flexDirection: "row", backgroundColor:"white",width:"50%",
                justifyContent: "center",
                display: "flex", }}> {estimNeededCount}</span>
                </Button>
                <p>
                {""}{"  | "}    Pending :  <span style={{  color: 'red' }}> {""} {estimNeededCount} {""} </span> {" | "}   Urgent :  <span style={{ color: 'red' }}> {""} {estimNeededCount}  </span> {" | "}
                </p>  
              </div>{" "}
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  display: "flex", 
                  width: "8%",
        
                }}
              >
                {" "}
              </div>
              <div>
  <Button
    render="true" // Set render attribute to a string value
    onClick={() => {
      this.setState({ JobDoneListModal: true });
    }}
    className="btn btn-primary"
  >
    {"JOBS to schedule"}   <span style={{ color: 'red' , flexDirection: "row", backgroundColor:"white",width:"50%",
                justifyContent: "center",
                display: "flex"}}>{jobDoneNeededCount}</span>
  </Button>{" "}
  <p>
  {""}{" | "}   Pending :  <span style={{ color: 'red' }}> {""} {jobDoneNeededCount} {""} </span> {" | "}    Urgent :  <span style={{ color: 'red' }}> {""}  {jobDoneNeededCount}   </span>{" | "}
  </p>
</div>

              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  display: "flex",
                  width: "8%",
                  
                }}
              >
                {" "}
              </div>
            </Row>  

 <Table
  responsive
  hover
  style={{ backgroundColor: "white" }}
  className="table mt-3"
  id="tablepadding"
>
  <thead>
    <tr>
      <th colSpan="3">
        <h5>Scheduled W.O.</h5>
      </th>
      <th colSpan="9">
        <h6>
          <i className="fa fa-circle text-c-yellow f-10 m-r-15">
            <span className="text-c-yellow f-10 m-r-15">estim.</span>
          </i>
          <i className="fa fa-circle text-c-blue f-10 m-r-15">
            <span className="text-c-blue f-10 m-r-15">Job Done</span>
          </i>
        </h6>
      </th>
    </tr>
    <tr>
      <th>WO numb</th>
      <th>Job location</th>
      <th>Contact</th>
      <th>Trade</th>
      <th>NTE</th>
      <th>Client Name</th>
      <th>Submitted date</th>
      <th>Needed Date</th>
      <th>Urgency</th>
      <th>Job Description</th>
    </tr>
  </thead>
  <tbody>
    {this.state.jobList.map((item, index) => {
      if (
        item.data.status === "estimationScheduled" ||
        item.data.status === "jobDoneScheduled"
      ) {
        return (
          <tr
            key={index}
            onClick={() => {
              this.setState({
                modalDisplayWOdetails: true,
                selectedJob: item,
              });
            }}
            style={{
              backgroundColor:
                item.data.status === "estimationScheduled"
                  ? "lightyellow"
                  : "lightblue",
            }}
          >
            <td>{item.data.woNum}</td>
            <td>{item.data.jobData.joblocation}</td>
            <td>{item.data.jobData.contact}</td>
            <td>{item.data.jobData.trade}</td>
            <td>{item.data.jobData.nte}</td>
            <td>{item.data.jobData.clientName}</td>
            <td>{item.data.jobData.submdate}</td>
            <td>{item.data.jobData.neededdate}</td>
            <td>{item.data.jobData.urgency}</td>
            <td>{item.data.jobData.jobdescr}</td>
          </tr>
        );
      } else {
        // Return null if the condition isn't met to skip rendering the row
        return null;
      }
    })}
  </tbody>
</Table>


<Card
  style={{
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
  }}
  className="NewWorkOrders"
>
  <Card.Header>
    <Card.Title
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
      className="text-center"
      as="h5"
    >
      <InputGroup size="sm" className="mb-3" style={{ width: 300 }}>
        <InputGroup.Prepend
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <Button
            onClick={async () => {
              this.setState({ onFindWOClick: true });
              if (this.state.woNbSearch !== "") {
                try {
                  const resp = await findWoByNumber(
                    this.state.woNbSearch,
                    this.context.currentUser.uid
                  );
                  this.setState({ jobList: resp });
                } catch (e) {
                  console.log("Error: ", e);
                }
              } else {
                const jobList = await findWoForCurrentUser(
                  this.context.currentUser.uid
                );
              
                this.setState({ jobList });
              }
            }}
            className="btn btn-primary"
          >
            Find WO
          </Button>
        </InputGroup.Prepend>
        <FormControl
          onChange={(nb) => {
            this.setState({ woNbSearch: nb.target.value });
          }}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      Opened Work Orders
    </Card.Title>
  </Card.Header>
  <Card.Body className="px-0 py-2">
    <Table
      responsive
      hover
      style={{ backgroundColor: "white" }}
      className="table mt-3"
      id="tablepadding"
      label="Scheduled W.O." // Changed Label to label
    >
      <thead>
        <tr>
          <th>WO numb</th>
          <th>Job location</th>
          <th>Contact</th>
          <th>Trade</th>
          <th>NTE</th>
          <th>Client Name</th>
          <th>Submitted date</th>
          <th>Needed Date</th>
          <th>Urgency</th>
          <th>Job Description</th>
        </tr>
      </thead>
      <tbody>
        {this.state.jobList.map((item, index) => (
          <tr
            key={index}
            onClick={() => {
              this.setState({modalDisplayWOdetails
                : true,
                selectedJob: item,
              });
            }}
          >
            <td>{item.data.woNum}</td>
            <td>{item.data.jobData.joblocation}</td>
            <td>{item.data.jobData.contact}</td>
            <td>{item.data.jobData.trade}</td>
            <td>{item.data.jobData.nte}</td>
            <td>{item.data.jobData.clientName}</td>
            <td>{item.data.jobData.submdate}</td>
            <td>{item.data.jobData.neededdate}</td>
            <td>{item.data.jobData.urgency}</td>
            <td>{item.data.jobData.jobdescr}</td>
            <td
              style={{
                paddingTop: "3px",
                display: "flex",
              }}
            ></td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card.Body>
</Card>


          </div >
        )}
      </div>
    );
  }
}

export default Dispatcher;


