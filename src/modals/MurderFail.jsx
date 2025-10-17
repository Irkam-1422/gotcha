import React from "react";
import { useSelector } from "react-redux";
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { setShowMurderFail } from "../actionCreators";

export const MurderFail = () => {
  const showMurderFail = useSelector((state) => state.showMurderFail);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: showMurderFail ? "flex" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title">Murder failed!</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              {user.currentVictim?.victim?.name} rejected your murder attempt.
              <br />
              If you think there was a misunderstanding, please contact the
              staff members.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn-primary"
              onClick={() => dispatch(setShowMurderFail(false))}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
