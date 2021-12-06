import React, { useState } from "react";
import "./todoItem.css";
import EditBtn from "../../assets/edit-button.png";
import TrashIcon from "../../assets/TrashIcon.png";
import ModalDeleteIcon from "../../assets/modal-delete-icon.png";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { API } from "../../constants/api";
import Indicator from "../Indicator";
import Buttons from "../Button";
import Dropdowns from "../Dropdown";

const TodoItem = (props) => {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(Boolean(!props.data.is_active));
  const [selected, setSelected] = useState(props.data.priority);
  const [editTodoList, setEditTodoList] = useState(props.data.title);

  const handleClose = () => {
    setShow(false);
    setSelected(props.data.priority);
    setEditTodoList(props.data.title);
  };
  const handleShow = () => {
    setSelected(props.data.priority);
    setEditTodoList(props.data.title);
    setShow(true);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleCheck = (e) => {
    setIsChecked(e.currentTarget.checked);
    axios.patch(`${API}/todo-items/${props.data.id}`, {
      is_active: isChecked,
    });
  };

  const hanldeEditTodo = (e) => {
    setEditTodoList(e.target.value);
  };

  const handleClose3 = () => {
    handleClose();
    props.handleEditTodo(props.data.id, editTodoList, selected);
  };

  return (
    <div className="card mb-2 p-4 todo-card rounded-3" data-cy="todo-item">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <input
            data-cy="todo-item-checkbox"
            type="checkbox"
            aria-label="Checkbox for following text input"
            className="form-check-input me-4 p-3"
            onChange={handleCheck}
            checked={isChecked}
          />
          <Indicator priority={props.data.priority} />

          <h6
            className={
              isChecked ? " m-0 mt-1 text-decoration-line-through" : "m-0 mt-1"
            }
            data-cy="todo-item-title"
          >
            {props.data.title}
          </h6>
          <div className="ms-3 icon" onClick={handleShow}>
            <img src={EditBtn} width={20} height={20} alt="Edit Icon Button" />
          </div>
        </div>

        <img
          src={TrashIcon}
          width={24}
          height={24}
          alt="Trash Icon Button"
          data-cy="todo-item-delete-button"
          className="icon"
          onClick={handleShow2}
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size={"lg"}
        data-cy="modal-add"
      >
        <Modal.Header closeButton className="px-4 py-4">
          <h6 className="fw-bold" data-cy="modal-add-title">
            Edit Item
          </h6>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <span className="input-title" data-cy="modal-add-name-title">
            NAMA LIST ITEM
          </span>
          <input
            type="text"
            className="form-control mt-2 mb-4"
            placeholder="Tambahkan nama Activity"
            value={editTodoList}
            onChange={hanldeEditTodo}
            data-cy="modal-add-name-input"
          />
          <label
            htmlFor="priority"
            className="input-title mb-3"
            data-cy="modal-add-priority-title"
          >
            PRIORITY
          </label>

          <Dropdowns
            selected={selected}
            setSelected={setSelected}
            data-cy="modal-add-priority-dropdown"
          />
        </Modal.Body>

        <Modal.Footer className="px-5 py-4">
          <Buttons
            onClick={handleClose3}
            title={"Simpan"}
            disabled={editTodoList === ""}
          >
            Simpan
          </Buttons>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} centered data-cy="modal-delete">
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
            Apakah anda yakin menghapus List Item{" "}
            <strong>"{props.data.title}"</strong> ?
          </h5>
        </Modal.Body>

        <div className="d-flex justify-content-center p-5">
          <button
            type="danger"
            className="btn btn-secondary rounded-pill px-5 fs-5 py-2 me-3 fw-bold"
            data-bs-dismiss="modal"
            data-cy="modal-delete-cancel-button"
            onClick={handleClose2}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger text-white rounded-pill px-5 fs-5 text-white py-2 fw-bold"
            data-cy="modal-delete-confirm-button"
            onClick={() => props.onDelete(props.data.id)}
          >
            Hapus
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoItem;
