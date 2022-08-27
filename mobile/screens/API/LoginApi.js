import ApiManager from "./ApiManager";

export const LoginApi = async (data) => {
  try {
    const result = await ApiManager("/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error ekak");
    return error.response.data;
  }
};
