import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TextInputState } from "../redux/feature/loginSlice";

export const getToken = () => {
  const { token } = useSelector<RootState, TextInputState>((state) => state.login);
  return token;
};
