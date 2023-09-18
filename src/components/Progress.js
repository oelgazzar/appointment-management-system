export default function Progress() {
  return (
    <div className="d-flex justify-content-center position-fixed top-50 start-50">
      <div
        className="spinner-grow spinner-grow-sm text-secondary me-1"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow spinner-grow-sm text-secondary me-1"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow spinner-grow-sm text-secondary me-1"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
