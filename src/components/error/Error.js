import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <p className="text-danger text-center">
      {error.statusText || error.message}
    </p>
  );
}
