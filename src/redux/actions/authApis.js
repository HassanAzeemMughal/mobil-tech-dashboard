import { REACT_BACKEND_PATH } from "../config";

export const authApi = async (
  dispatch,
  data,
  setToken,
  setLoginData,
  setLoader,
  apiName,
  router
) => {
  setLoader(true);
  try {
    function removeEmptyValues(obj) {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== "")
      );
    }
    const checkData = removeEmptyValues(data);
    console.log("======data", data, "======apiName", apiName);

    const response = await fetch(`${REACT_BACKEND_PATH}${apiName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData),
    });

    const responseData = await response.json();
    if (response.ok) {
      setLoader(false);
      dispatch(setToken(responseData?.data?.token));
      dispatch(setLoginData(responseData.data));
      if (responseData?.data?.roles?.length > 0) {
        responseData?.data?.roles.map((item) => {
          if (item.name === "Admin") {
            router.push(`http://localhost:5173/admin/${responseData.token}`);
          } else {
            router.push(`http://localhost:5173/${responseData.token}`);
          }
        });
      }
    }
    if (!response.ok) {
      setLoader(false);
    }
  } catch (error) {
    setLoader(false);
  }
};
