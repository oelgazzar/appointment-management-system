import { useEffect } from "react";
import Progress from "./Progress";
import { useNavigate } from "react-router";

export default function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return <Progress />;
}
