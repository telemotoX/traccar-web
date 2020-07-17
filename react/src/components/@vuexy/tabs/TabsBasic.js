import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import classnames from "classnames"
import { Eye, Code } from "react-feather"
import { tabsBasic } from "./TabSourceCode"

class TabsBasic extends React.Component {
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
        <Card style={{height:"100%"}}>
          <CardBody>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.active === "1"
                      })}
                      onClick={() => {
                        this.toggle("1")
                      }}
                    >
                      Devices
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.active === "2"
                      })}
                      onClick={() => {
                        this.toggle("2")
                      }}
                    >
                      State
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="py-50" activeTab={this.state.active}>
                  <TabPane tabId="1">
                    Macaroon danish gummies icing sesame snaps macaroon jelly-o
                    carrot cake pastry. Apple pie macaroon jelly-o dragée tart
                    sweet lollipop candy. Lemon drops ice cream cake gingerbread
                    I love liquorice lollipop carrot cake. Dragée cake muffin. I
                    love I love apple pie biscuit carrot cake croissant macaroon
                    candy. Cheesecake I love cupcake I love candy canes I love.
                    Cupcake macaroon bonbon biscuit jelly sesame snaps tart I
                    love gingerbread.
                  </TabPane>
                  <TabPane tabId="2">
                    Pie muffin cake macaroon marzipan pudding pastry. Marzipan
                    muffin oat cake sweet roll tootsie roll I love marshmallow
                    pie pastry. Jelly beans I love pie sugar plum sugar plum
                    soufflé liquorice bonbon sesame snaps. Bear claw sugar plum
                    apple pie sesame snaps wafer chocolate bar chocolate cookie
                    gingerbread. Gummies chocolate cake jujubes tart halvah. I
                    love sesame snaps apple pie. Cupcake cookie bear claw pie
                    cotton candy gummies.
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
export default TabsBasic
