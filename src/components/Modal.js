export default function Modal({ id, message, title, onConfirm }) {
  return (
    <div className="modal" tabIndex="-1" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{title || "confirm?"}</h1>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
