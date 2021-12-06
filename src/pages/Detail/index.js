import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "../../components/Button";
import EmptyItem from "../../assets/empty-item.png";
import { useParams } from "react-router";
import BackIcon from "../../assets/todo-back-button.png";
import axios from "axios";
import { API } from "../../constants/api";
import { Link } from "react-router-dom";
import TodoItem from "../../components/TodoItem";
import EditBtn from "../../assets/edit-button.png";
import OutsideClickHandler from "react-outside-click-handler";
import "./detail.css";
import Dropdowns from "../../components/Dropdown";
import SortDropdown from "../../components/SortDropdwon";

const Detail = (props) => {
  const [todoItem, setTodoItem] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("very-high");
  const [sorted, setSorted] = useState("Terbaru");
  const [inputAddTodo, setInputAddTodo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { id } = useParams();

  useEffect(() => {
    fetchTodoItem();
  }, [sorted]);

  const fetchTodoItem = () => {
    axios
      .get(`${API}/activity-groups/${id}`)
      .then((res) => {
        let sortData = res.data.todo_items;
        switch (sorted) {
          case "Terlama":
            sortData.reverse();
            break;
          case "A-Z":
            sortData.sort((a, b) =>
              a.title > b.title ? 1 : b.title > a.title ? -1 : 0
            );
            break;
          case "Z-A":
            sortData
              .sort((a, b) =>
                a.title > b.title ? 1 : b.title > a.title ? -1 : 0
              )
              .reverse();
            break;
          case "Belum Selesai":
            sortData
              .sort((a, b) =>
                a.is_active > b.is_active
                  ? 1
                  : b.is_active > a.is_active
                  ? -1
                  : 0
              )
              .reverse();
            break;
          default:
            break;
        }
        setTodoItem(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderTodoItem = () => {
    return todoItem.todo_items?.map((item) => {
      return (
        <TodoItem
          data={item}
          key={item.id}
          onDelete={handleDelete}
          handleEditTodo={handleEditTodoList}
        />
      );
    });
  };

  const editHandler = (e) => {
    setTodoItem({
      ...todoItem,
      title: e.target.value,
    });
  };

  const handleEditActivity = () => {
    setOnEdit(false);
    axios.patch(`${API}/activity-groups/${id}`, {
      title: todoItem.title,
    });
  };
  const handleEditActivity2 = () => {
    setOnEdit(!onEdit);
    axios.patch(`${API}/activity-groups/${id}`, {
      title: todoItem.title,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/todo-items/${id}`)
      .then(() => {
        fetchTodoItem();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleAddTodoList = (e) => {
    setInputAddTodo(e.target.value);
  };

  const addTodo = () => {
    axios
      .post(`${API}/todo-items`, {
        activity_group_id: id,
        title: inputAddTodo,
        priority: selected,
      })
      .then(() => {
        fetchTodoItem();
        setSelected("very-high");
        setInputAddTodo("");
      });
  };

  const handleAddTodo = () => {
    addTodo();
    setShow(false);
  };

  const handleEditTodoList = (idTodoList, titleTodo, priority) => {
    axios
      .patch(`${API}/todo-items/${idTodoList}`, {
        title: titleTodo,

        priority: priority,
      })
      .then(() => {
        fetchTodoItem();
      });
  };

  return (
    <>
      <div className="container">
        <div className=" my-5 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link data-cy="todo-back-button" to="/">
              <img
                src={BackIcon}
                width={32}
                height={32}
                alt="Back Icon"
                className="mb-2 me-2"
              />
            </Link>
            <OutsideClickHandler onOutsideClick={handleEditActivity}>
              <div className="d-flex flex-row">
                {onEdit ? (
                  <input
                    id="detail-name"
                    type="text"
                    value={todoItem?.title}
                    onChange={editHandler}
                    className="fs-2 fw-bold border-0 bg-transparent border-bottom border-dark no-outline"
                  />
                ) : (
                  <h2 data-cy="todo-title" className="fw-bold ">
                    {todoItem?.title}
                  </h2>
                )}
                <div
                  className="ms-3 btn"
                  onClick={handleEditActivity2}
                  data-cy="todo-title-edit-button"
                >
                  <label htmlFor="detail-name" className="cursor">
                    <img
                      src={EditBtn}
                      width={24}
                      height={24}
                      alt="Edit Icon Button"
                    />
                  </label>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
          <div className="d-flex align-items-center">
            <SortDropdown sorted={sorted} setSorted={setSorted} />
            <Buttons
              title={"+ Tambah"}
              onClick={handleShow}
              data-cy="todo-add-button"
            />
          </div>
        </div>
        <div className="row mx-2">
          {todoItem.todo_items?.length ? (
            renderTodoItem()
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              data-cy="todo-empty-state"
            >
              <img
                onClick={handleShow}
                src={EmptyItem}
                alt="Empty Item"
                className=" w-50"
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size={"lg"}
        data-cy="modal-add"
      >
        <Modal.Header
          closeButton
          className="px-4 py-4"
          data-cy="modal-add-close-button"
        >
          <h6 className="fw-bold" data-cy="modal-add-title">
            Tambah Item
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
            onChange={handleAddTodoList}
            data-cy="modal-add-name-input"
          />
          <label
            htmlFor="priority"
            className="input-title mb-3"
            data-cy="modal-add-priority-title"
          >
            PRIORITY
          </label>

          <Dropdowns selected={selected} setSelected={setSelected} />
        </Modal.Body>

        <Modal.Footer className="px-5 py-4">
          <Buttons
            onClick={handleAddTodo}
            title={"Simpan"}
            disabled={inputAddTodo === ""}
            data-cy="modal-add-save-button"
          >
            Simpan
          </Buttons>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Detail;
