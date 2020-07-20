import React from "react"
import {
  Card,
  CardBody,
  Badge,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary">Add</Button.Ripple>
      </div>
    </div>
  )
}

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.name}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: row => (
          <Badge
            color={row.status === "offline" ? "light-danger" : "light-success"}
            pill>
            {row.status}
          </Badge>
        )
      },
      {
        name: "Date Created",
        selector: "date",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
        )
      }
    ],
    data: [
      {
        image: require("../../assets/img/portrait/small/avatar-s-2.jpg"),
        name: "Alyss Lillecrop",
        email: "alillecrop0@twitpic.com",
        date: "May 13, 2018",
        status: "online",
        revenue: "$32,000",
        ratings: "good"
      },
      {
        image: require("../../assets/img/portrait/small/avatar-s-1.jpg"),
        name: "Shep Pentlow",
        email: "spentlow1@home.pl",
        date: "June 5, 2019",
        status: "online",
        revenue: "$50,000",
        ratings: "good"
      },
      {
        image: require("../../assets/img/portrait/small/avatar-s-3.jpg"),
        name: "Gasper Morley",
        email: "gmorley2@chronoengine.com",
        date: "December 24, 2019",
        status: "offline",
        revenue: "$78,000",
        ratings: "average"
      }
    ],
    filteredData: [],
    value: ""
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.date.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Card>
        <CardBody className="rdt_Wrapper" style={{padding:"0"}}>
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            pagination
            subHeader
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            }
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableCustom
