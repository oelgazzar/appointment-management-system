import Sidebar from "./Sidebar";

export default function Main({ children }) {
  return (
    <>
      <Sidebar />
      <div
        className="p-4 position-relative"
        style={{
          marginLeft: "var(--sidebar-width)",
          marginTop: "var(--navbar-height)",
        }}
      >
        {children}
      </div>
    </>
  );
}
