import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ActivityItem from "../../components/ActivityItem";
import Buttons from "../../components/Button";

import ActivityEmptyState from "../../assets/activity-empty-state.png";
import SuccessIcon from "../../assets/success-icon.png";

import { API } from "../../constants/api";

const Dashboard = () => {
  const [activityList, setActivityList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    axios
      .get(`${API}/activity-groups`, {
        params: {
          email: "gun@gunsman.com",
        },
      })
      .then((res) => {
        setActivityList(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderActivityList = () => {
    return activityList.map((item, index) => {
      return (
        <div className="col-3 mb-4" key={item.id}>
          <ActivityItem data={item} onDelete={deleteActivity} />
        </div>
      );
    });
  };

  const addActivity = () => {
    axios
      .post(`${API}/activity-groups`, {
        title: "New Activity",
        email: "gun@gunsman.com",
        _comment:
          "email digunakan untuk membedakan list data yang digunakan antar aplikasi",
      })
      .then((res) => {
        fetchTodoList();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteActivity = (id) => {
    axios
      .delete(`${API}/activity-groups/${id}`)
      .then((res) => {
        fetchTodoList();
        handleShow();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className=" my-5 d-flex justify-content-between align-items-center">
          <h2 data-cy="activity-title" className="fw-bold ">
            Activity
          </h2>
          <Buttons onClick={addActivity} title={"+ Tambah"} />
        </div>
        <div className="row">
          {/* If Empty */}
          {activityList.length ? (
            renderActivityList()
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              data-cy="activity-empty-state"
            >
              <img
                onClick={addActivity}
                src={ActivityEmptyState}
                alt="Empty Activity"
                className=" w-75"
              />
            </div>
          )}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          data-cy="modal-information"
          centered
        >
          <Modal.Body className="px-4 py-3 rounded-3">
            <img
              src={SuccessIcon}
              width={24}
              height={24}
              className="me-2"
              alt="Success Icon"
              data-cy="modal-information-icon"
            />

            <span data-cy="modal-information-title">
              Activity berhasil dihapus
            </span>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
