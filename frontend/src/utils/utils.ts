import moment from "moment/moment";

//Set authorization token automatically for API calls
const utils = {
  formatDate: (date: string, format = "L HH:mm") => moment(date).format(format),
  toTitleTextUnderscore: (text: string) => {
    const splitText = text.replace("_", " ").toLowerCase();
    const result = splitText.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  },
  toTitleText: (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  },
  splitCamelcaseString: (string: string) =>
    string.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
  capsToTitleCase: (str: string) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (s) => s.toUpperCase())
      .replace("Qc", "QC");
  },
};

export default utils;
