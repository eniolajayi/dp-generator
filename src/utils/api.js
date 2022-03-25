import axios from "axios";
// post banner data
async function sendBannerInfo(data) {
  try {
    const response = await axios({
      method: "post",
      url: "https://dp-generator-api.herokuapp.com/post/",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

//...data.getHeaders()
