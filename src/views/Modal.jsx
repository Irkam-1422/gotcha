import React from "react";
import "./Modal.css";

export const Modal = ({showModal, setShowModal}) => {
  return (
    <div>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="victimModal"
        tabIndex="-1"
        aria-labelledby="victimModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              Don't forget to make a screenshot of your victim. You won't be
              able to see it again!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                I will do it now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
