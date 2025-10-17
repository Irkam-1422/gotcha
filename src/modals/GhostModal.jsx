import React from "react";
import { useSelector } from "react-redux";
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { setShowGhostModal } from "../actionCreators";

export const GhostModal = () => {
  const showGhostModal = useSelector((state) => state.showGhostModal);
  const dispatch = useDispatch();
  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: showGhostModal ? "flex" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title">Welcome to the underworld!</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Now that you are a ghost, you can continue your existance in the
              spirit form. <br />
              You can no longer interact with the living, but you can still
              observe the game, and prevent murders from happenning by
              witnessing them. <br />
              You are given a chance to revenge for your death and steal the
              coin from your killer. In order to do so you need to do the
              following.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn-primary"
              onClick={() => dispatch(setShowGhostModal(false))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
