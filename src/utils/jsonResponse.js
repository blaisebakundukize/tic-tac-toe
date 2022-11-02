import { STATUS_CODES } from "../constants";

const jsonResponse = ({
  res,
  status = STATUS_CODES.OK,
  data,
}) => {
  res.status(status).json(data);
};

export default jsonResponse;
