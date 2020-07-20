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

  rowClicked = (row) => {
    this.props.setCurrentDevice(row)
  };

  conditionalRowStyles = [
    {
      when: row => row.id === this.props.current_device.id,
      style: {
        backgroundColor: '#7367f075',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  render() {
    return (
      <Card>
        <DeviceModal />

        <CardBody style={{padding:"0"}}>
          <DataTable
            data={this.props.devices}
            columns={columns}
            noHeader
            onRowClicked={this.rowClicked}
            conditionalRowStyles={this.conditionalRowStyles}
          />
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
    current_device: state.devices.current_device
  }
}

export default connect(mapStateToProps, {init, setCurrentDevice})(DeviceTable)
