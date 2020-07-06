export const api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://glacial-lake-57564.herokuapp.com";
