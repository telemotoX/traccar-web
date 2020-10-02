import React, {useState} from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import axios from "axios"
import * as Icon from "react-feather"
import {connect} from "react-redux"
import {logoutWithJWT} from "../../../redux/actions/auth/loginActions"
import {toggleVisible} from "../../../redux/actions/geofence"
import GeoFenceModal from "../../../views/modals/GeoFenceModal"

const UserDropdown = props => {
  const [geofence, setGeofence] = useState(false)

  const showGeoFenceModal= () => {
    setGeofence(true)
  }

  const closeGeoFenceModal= () => {
    setGeofence(false)
  }

  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Account</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Users size={14} className="mr-50" />
        <span className="align-middle">Groups</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Drivers</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#" onClick={showGeoFenceModal}>
        <Icon.MapPin size={14} className="mr-50" />
        <span className="align-middle">Geofences</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">Notifications</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Calendar size={14} className="mr-50" />
        <span className="align-middle">Calendars</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Command size={14} className="mr-50" />
        <span className="align-middle">Saved commands</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Heart size={14} className="mr-50" />
        <span className="align-middle">Maintenance</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="#"
        onClick={ ()=> props.logoutWithJWT() }
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log out</span>
      </DropdownItem>

      <GeoFenceModal show={geofence} onClose={closeGeoFenceModal} />
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: []
  }

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult })
    })
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <span data-tour="user" style={{width:"30px"}}>
              <Icon.MapPin size={28} className="mr-4 fonticon-wrap" onClick={()=> this.props.toggleVisible()} />
            </span>
          </DropdownToggle>
        </UncontrolledDropdown>

        {/*<UncontrolledDropdown tag="li" className="dropdown-user nav-item">*/}
        {/*  <DropdownToggle tag="a" className="nav-link dropdown-user-link">*/}
        {/*    <span data-tour="user" style={{width:"30px"}}>*/}
        {/*      <Icon.Target size={28} className="mr-4 fonticon-wrap" />*/}
        {/*    </span>*/}
        {/*  </DropdownToggle>*/}
        {/*</UncontrolledDropdown>*/}

        {/*<UncontrolledDropdown tag="li" className="dropdown-user nav-item">*/}
        {/*  <DropdownToggle tag="a" className="nav-link dropdown-user-link">*/}
        {/*    <span data-tour="user" style={{width:"30px"}}>*/}
        {/*      <Icon.Move size={28} className="mr-4 fonticon-wrap" />*/}
        {/*    </span>*/}
        {/*  </DropdownToggle>*/}
        {/*</UncontrolledDropdown>*/}

        <UncontrolledDropdown>
          <DropdownToggle
            color="primary"
            className="btn-icon btn-round dropdown-toggle right-menu"
          >
            <span data-tour="user">
              <Icon.Settings size={32} style={{ left: 0 }} />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}

export default connect(null, { logoutWithJWT, toggleVisible })(NavbarUser)
