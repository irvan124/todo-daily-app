import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import dateFormat from "../../helper/dateFormat";
import TrashIcon from "../../assets/TrashIcon.png";
import ModalDeleteIcon from "../../assets/modal-delete-icon.png";

import "./activityItem.css";

const ActivityItem = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    handleClose();
    props.onDelete(props.data.id);
  };

  return (
    <>
      <div
        className="card activity-card d-flex flex-column p-3 rounded-3"
        data-cy="activity-item"
      >
        <Link
          className="card-body text-decoration-none text-black"
          to={`/detail/${props.data.id}`}
        >
          <h5 className="card-title fw-bold" data-cy="activity-item-title">
            {props.data.title}
          </h5>
        </Link>
        <div className="d-flex flex-row justify-content-around">
          <span
            className="text-black-50 fw-fw-normal"
            data-cy="activity-item-date"
          >
            {dateFormat(props.data.created_at)}
          </span>
          <img
            data-cy="activity-item-delete-button"
            className="btn-trash"
            src={TrashIcon}
            width={18}
            height={20}
            alt="Trash Icon"
            onClick={handleShow}
          />
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered data-cy="modal-delete">
        <Modal.Header className="border-0 mt-3 align-self-center">
          <div data-cy="modal-delete-icon">
            <img
              src={ModalDeleteIcon}
              alt="Delete icon"
              width={84}
              height={84}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="px-4 text-center">
          <h5
            className="modal-title text-center fw-normal"
            data-cy="modal-delete-title"
          >
            Apakah anda yakin menghapus activity{" "}
            <strong>"{props.data.title}"</strong> ?
          </h5>
        </Modal.Body>

        <div className="d-flex justify-content-center p-5">
          <button
            type="danger"
            className="btn btn-secondary rounded-pill px-5 fs-5 py-2 me-3 fw-bold"
            data-bs-dismiss="modal"
            data-cy="modal-delete-cancel-button"
            onClick={handleClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger text-white rounded-pill px-5 fs-5 text-white py-2 fw-bold"
            data-cy="modal-delete-confirm-button"
            onClick={handleDelete}
          >
            Hapus
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ActivityItem;
