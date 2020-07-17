import React from "react"
import {Toast, ToastHeader, ToastBody} from "reactstrap"
import {connect} from "react-redux";

class ToastBasic extends React.Component {
  toggle = () => {
    this.props.toggle(this.props.err_show)
  }

  render() {
    const err_show = this.props.err_show
    const err_msg = this.props.err_msg

    return(
      <Toast isOpen={err_show}>
        <ToastHeader toggle={this.toggle}>Toast title</ToastHeader>
        <ToastBody>
          {err_msg}
        </ToastBody>
      </Toast>
    )
  }
}

const mapStateToProps = state => {
  return {
    err_show: state.toast.err_show,
    err_msg: state.toast.err_msg
  }
}

const mapDispatchToProps = dispatch => ({
  toggle: (err_show) => dispatch({type: "CHANGE_TOAST_STATE", err_show})
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastBasic)
