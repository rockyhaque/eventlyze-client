import moment from "moment";

export const formatDate = (
  dateString: string | Date,
  format: string = "MMMM Do YYYY" // Default to full date
) => {
  if (!dateString) return "";
  return moment(dateString).format(format);
};
