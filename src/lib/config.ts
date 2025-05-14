export const serverApi: string = `${process.env.REACT_APP_API_URL}`;
if (!process.env.REACT_APP_API_URL) {
  throw new Error("REACT_APP_API_URL is not defined in your .env file.");
}

export const Messages = {
  error1: "Something went wrong!",
  error2: "Please login first!",
  error3: "Please fullfill all inputs!",
  error4: "Message is empty!",
  error5: "Only images with jpeg, jpg, png format allowed!",
};
