export const errorHandling = (error) => {
  console.log(error);

  if (error.isAxiosError) {
    if (error.code === "ERR_NETWORK")
      return console.log("Network error. Please check your internet connection.");

    if (error.response) {
      const { status } = error.response;

      if (status === 403) {
        return console.log("API quota exceeded. Please try again later.");

      } else {
        return console.log(`Request failed with status ${status}. Please try again.`);
      }
    }

    if (error.code === "ECONNABORTED") {
      return console.log("Request timeout. Please check your network connection.");
    } else {
      return console.log("An error occurred while fetching data. Please try again later.");
    }

  } else {
    return console.log("An unexpected error occurred. Please try again later.");
  }
};
