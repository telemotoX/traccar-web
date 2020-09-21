import React from "react"
import {
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import { tabsBasic } from "./TabSourceCode"
import StateTable from "../tables/StateTable";

class StateTab extends React.Component {
  state = {
    activeTab: "1",
    active: "1"
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  toggle = tab => {
    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Card style={{height:"50%", marginBottom:"0"}}>
          <CardBody style={{padding:"0"}}>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        this.toggle("1")
                      }}
                    >
                      State
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="py-50" activeTab={this.state.active}>
                  <TabPane tabId="1">
                    <StateTable />
                  </TabPane>
                </TabContent>
              </TabPane>
              <TabPane className="component-code" tabId="2">
                {tabsBasic}
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default StateTab
