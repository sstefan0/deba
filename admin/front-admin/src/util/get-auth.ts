import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const getAuth = () => {
  const user = useSelector((state: RootState) => state.user.role);
  return user;
};
