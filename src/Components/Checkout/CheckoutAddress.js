import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import shortid from "shortid";

import "./Checkout.css";
import * as actionCreators from "../../Store/actions/index";

function CheckoutAddress(props) {
  let addressList = props.address.addressList;
  /* const apiUrl = "https://api.rightdelivers.in/user/api/v1/me";
  const getAddress = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey,
        dKey: props.config.authData.dKey,
      },
    };
    const res = await (await fetch(apiUrl, options)).json();
    if (res && res.status === 1) {
      return;
    }
  };
  useEffect(() => {
    getAddress();
  }, []);
*/
  const emptyLoginData = {
    id: "",
    name: "",
    email: "",
    phone: "",
    flat: "",
    street: "",
    pincode: "",
    city: "",
  };
  const [addNew, setAddNew] = useState(false);
  const [loginData, setLoginData] = useState(emptyLoginData);
  const [selectedAddress, setSelectedAddress] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAddNew(false);
      props.addNewAddress(loginData);
      setLoginData(emptyLoginData);
    }
  };

  const validateForm = () => {
    return true;
  };
  useEffect(() => {
    if (addNew) {
      const sid = shortid.generate();
      setLoginData({ ...loginData, id: sid });
    }
    props.setCurAddress(selectedAddress);
  }, [addNew, selectedAddress]);
  const handleAddAddress = () => {
    setAddNew(true);
  };
  const handleBack = () => {
    setAddNew(false);
  };
  const editAddress = (address) => {
    setLoginData(address);
    setAddNew(true);
    deleteAddress(address);
  };
  const deleteAddress = (address) => {
    addressList.splice(
      addressList.findIndex(function (i) {
        return i.id === address.id;
      }),
      1
    );
  };
  const showAddress = (
    <div className="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <i className="uil uil-location-point"></i>My Address
          </h4>
        </div>
      </div>
      <div className="col-lg-12 col-md-12">
        <div className="pdpt-bg">
          <div className="pdpt-title">
            <h4>Select Delivery Address</h4>
          </div>
          <div className="address-body">
            <button className="next-btn16 hover-btn" onClick={handleAddAddress}>
              Add New Address
            </button>
            <div className="address-spacing">
              {addressList &&
                addressList.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={
                      selectedAddress.id === address.id
                        ? "address-item activeAddress"
                        : "address-item"
                    }
                  >
                    <div className="address-icon1">
                      <i className="uil uil-home-alt"></i>
                    </div>
                    <div className="address-dt-all">
                      <h4>{address.name}</h4>
                      <p>
                        {address.flat}, {address.street}
                        <br />
                        {address.city}, {address.pincode}
                      </p>
                      <ul className="action-btns">
                        <li>
                          <div
                            className="action-btn"
                            onClick={() => editAddress(address)}
                          >
                            <i className="uil uil-edit"></i>
                          </div>
                        </li>
                        <li>
                          <div className="action-btn" onClick={deleteAddress}>
                            <i className="uil uil-trash-alt"></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const addAddress = (
    <div className="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <i className="uil uil-location-point"></i>Add new Address
          </h4>
        </div>
      </div>
      <div className="col-lg-12 container checout-address-step">
        <form className="" onSubmit={handleSubmit}>
          <div className="address-fieldset">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Name*</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={loginData.name}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Mobile Number*</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Mobile Number"
                    value={loginData.phone}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Email Address*</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">
                    Flat / House / Office No.*
                  </label>
                  <input
                    id="flat"
                    name="flat"
                    type="text"
                    placeholder="Address"
                    value={loginData.flat}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="control-label">
                    Street / Society / Office Name*
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    value={loginData.street}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Pincode*</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    placeholder="Pincode"
                    value={loginData.pincode}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">City*</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter City"
                    value={loginData.city}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <div className="address-btns">
                    <div className="">
                      <button type="submit" className="save-btn14 hover-btn">
                        Add Address
                      </button>
                    </div>
                    <div className="col">
                      <button
                        onClick={handleBack}
                        className="next-btn16 hover-btn float-right"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  return <div>{addNew ? addAddress : showAddress}</div>;
}
const mapStateToProps = (state) => {
  return {
    address: state.address,
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurAddress: (payload) => dispatch(actionCreators.setCurAddress(payload)),
    addNewAddress: (payload) => dispatch(actionCreators.addNewAddress(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddress);
