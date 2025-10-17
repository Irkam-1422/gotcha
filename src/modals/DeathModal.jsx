import React from "react";
import { useSelector } from "react-redux";
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { setShowDeathModal, setShowGhostModal } from "../actionCreators";
import { confirmDeath, rejectDeath } from "../routes/users";

export const DeathModal = () => {
  const user = useSelector((state) => state.user)
  const {show, killer} = useSelector((state) => state.showDeathModal);
  const dispatch = useDispatch();

    const handleConfirm = async () => {
    await confirmDeath(user);
    dispatch(setShowDeathModal(false));
    // dispatch(setShowGhostModal(true));
  }

  const handleReject = async () => {
    await rejectDeath(user);
    dispatch(setShowDeathModal(false));
  }

  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: show ? "flex" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title">You've been killed</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Oh, no! The player <b>{killer?.name}</b> has claimed that they have
              killed you. Please, confirm your death.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              // className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleReject}
            >
              That's wrong!
            </button>
            <button type="button" className="btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
