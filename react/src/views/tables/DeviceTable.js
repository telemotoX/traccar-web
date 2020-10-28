import React from "react"
import {
  Card,
  CardBody,
} from "reactstrap"
import DataTable from "react-data-table-component"
import DeviceModal from "../modals/DeviceModal";
import {connect} from "react-redux";
import {init} from "../../redux/actions/initActions";
import {setCurrentDevice} from "../../redux/actions/device";
import {setCurrentAttribute} from "../../redux/actions/attribute";
// import axios from "axios";
// import {API_URL} from "../../configs/constant";
// import {history} from "../../history";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true
  },
  {
    name: "Status",
    selector: "status",
    sortable: true
  },
  {
    name: "Last Update",
    selector: "lastUpdate",
    sortable: true
  }
]


class DeviceTable extends React.Component {
  setCurrentAttribute = (position) => {
    // const config = {
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //   }
    // }
    // axios
    //   .get(API_URL + "/api/server/geocode", config)
    //   .then(response => {
    let temp_data = []
    temp_data.push({"attribute": "Time", "value": position[0].deviceTime})
    temp_data.push({"attribute": "Latitude", "value": position[0].latitude})
    temp_data.push({"attribute": "Longitude", "value": position[0].longitude})
    temp_data.push({"attribute": "Valid", "value": position[0].valid ? "True" : "False"})
    temp_data.push({"attribute": "Accuracy", "value": position[0].accuracy})
    temp_data.push({"attribute": "Altitude", "value": position[0].altitude})
    temp_data.push({"attribute": "Speed", "value": position[0].speed})
    temp_data.push({"attribute": "Course", "value": position[0].course})
    temp_data.push({"attribute": "Address", "value": position[0].address})
    temp_data.push({"attribute": "Protocol", "value": position[0].protocol})
    temp_data.push({"attribute": "Battery Level", "value": position[0].attributes.batteryLevel})
    temp_data.push({"attribute": "Distance", "value": position[0].attributes.distance})
    temp_data.push({"attribute": "Total Distance", "value": position[0].attributes.totalDistance})
    temp_data.push({"attribute": "Motion", "value": position[0].attributes.motion ? "True" : "False"})
    this.props.setCurrentAttribute(temp_data)
  }

  rowClicked = (row) => {
    this.props.setCurrentDevice(row)
    const position = this.props.positions.filter(position => {
      return position.deviceId === row.id
    })
    position && position.length > 0 && this.setCurrentAttribute(position)
  };

  render() {
    console.log(this.props.devices)
    const conditionalRowStyles = [
      {
        when: row => row.id === this.props.current_device.id,
        style: {
          backgroundColor: '#4d42c330',
          color: 'rgba(0,0,0,0.87)',
          '&:hover': {
            cursor: '',
          },
        },
      },
    ];

    return (
      <Card>
        <DeviceModal />

        <CardBody style={{padding:"0"}}>
          <DataTable
            data={this.props.devices}
            columns={columns}
            noHeader
            onRowClicked={this.rowClicked}
            conditionalRowStyles={conditionalRowStyles}
          />
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
    current_device: state.devices.current_device,
    positions: state.positions.positions
  }
}

export default connect(mapStateToProps, {init, setCurrentDevice, setCurrentAttribute})(DeviceTable)
