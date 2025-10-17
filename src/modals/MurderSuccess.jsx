import React from "react";
import { useSelector } from "react-redux";
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { setShowMurderSuccess } from "../actionCreators";
import { victimTransfer } from "../routes/users";

export const MurderSuccess = () => {
  const showMurderSuccess = useSelector((state) => state.showMurderSuccess);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNextVictim = async () => {
    await victimTransfer(user)
    dispatch(setShowMurderSuccess(false));
  }
  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: showMurderSuccess ? "flex" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title">Murder succeed!</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              You have successfully killed {user.currentVictim?.victim?.name}
              <br />
              Now you can proceed with the next victim.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn-primary"
              onClick={handleNextVictim}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
