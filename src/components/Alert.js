export default function Alert({ children, className, duration = 5000 }) {
  //   useEffect(() => {
  //     const id = setTimeout(() => (className += " d-none"));

  //     return () => clearTimeout(id);
  //   });

  return (
    <div
      className={
        "alert alert-danger position-fixed z-3 px-5 rounded-0 bottom-0 start-50 mb-5 translate-middle-x " +
        className
      }
    >
      {children}
      {/* <button className="btn-close" data-bs-dismiss="alert"></button> */}
    </div>
  );
}
