import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";

function Notification(props) {
  const [show, setShow] = useState(false);
  const notification = props.config.notification;
  useEffect(() => {
    console.log("Notification Status" + props.config.showNotification);
    setShow(props.config.showNotification);
  }, [props.config.showNotification]);

  const handleClose = () => {
    setShow(false);
    props.clearNotification();
  };
  if (show) {
    return (
      <Alert variant="info" onClose={handleClose} dismissible>
        {notification}
      </Alert>
    );
  } else {
    return <></>;
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearNotification: () => dispatch(actionCreators.clearNotification()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
