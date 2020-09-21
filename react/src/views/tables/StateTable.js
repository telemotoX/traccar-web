import React from "react"
import {
  Card,
  CardBody,
} from "reactstrap"
import DataTable from "react-data-table-component"
import {connect} from "react-redux";
import {init} from "../../redux/actions/initActions";

const columns = [
  {
    name: "Attribute",
    selector: "attribute",
    sortable: true
  },
  {
    name: "Value",
    selector: "value",
    sortable: true
  }
]


class StateTable extends React.Component {

  rowClicked = (row) => {

  };

  render() {
    const data = this.props.current_attribute

    return (
      <Card>
        {/*<DeviceModal />*/}

        <CardBody style={{padding:"0"}}>
          <DataTable
            data={data}
            columns={columns}
            noHeader
          />
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    current_device: state.devices.current_device,
    positions: state.positions.positions,
    current_attribute: state.attributes.current_attribute
  }
}

export default connect(mapStateToProps, {init})(StateTable)
