import axios from "axios";
// post banner data
export async function sendBannerInfo(data) {
  try {
    const response = await axios({
      method: "post",
      url: "https://dp-generator-api.herokuapp.com/post/",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getBannerInfo(bannerid) {
  try {
    const response = await axios({
      method: "get",
      url: `https://dp-generator-api.herokuapp.com/${bannerid}/`,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function makeBanner(data, id) {
  try {
    const response = await axios({
      method: "post",
      url: `https://dp-generator-api.herokuapp.com/make/dp/${id}/`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

// Stax API Calls
export async function makeBannerStaxLink(data) {
  try {
    const response = await axios({
      method: "post",
      url: `https://dp-generator-api.herokuapp.com/linkStax/`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function makeBannerStaxCampus(data) {
  try {
    const response = await axios({
      method: "post",
      url: `https://dp-generator-api.herokuapp.com/staxcampus/`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
