import { Card, Col, message, notification, Row, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import InputComponent from "../.././../components/InputComponent/index";
import SelectComponent from "../../../components/SelectComponent";
import TextAreaComponent from "../../../components/TextAreaComponent";
import { Link } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { FaSpinner } from "react-icons/fa";
import useFormHandler from "../../../HelperFunction/FormHandler";
import permissionslist from "../../../HelperFunction/permissions.json";

const Add = () => {
  const [loading, setLoading] = useState();
  const [roles, setRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { formData, handleInputChange, setFormData } = useFormHandler({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      permissions: selectedPermissions,
    };

    try {
      const response = await ApiService.post("/roles", payload);
      if (response.success === "true") {
        notification.success({
          message: "Success",
          description: response.message,
          placement: "topRight",
        });
        // Reset form fields after successful submission
        setFormData({
          name: "",
        });
        setSelectedPermissions("");
      } else if (response.success === "false") {
        notification.error({
          message: "Error",
          description: response.message,
          placement: "topRight", // Position of the notification
        });
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      // Displaying dynamic error messages based on error type
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      notification.error({
        message: "Failed to Create Role",
        description: errorMessage,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTreeSelectChange = (selectedValues, info) => {
    const selectedKeys = [];

    // Helper function to traverse the tree and collect keys
    const traverseTree = (data) => {
      data.forEach((item) => {
        if (item.children) {
          traverseTree(item.children); // Recursively process children
        } else if (selectedValues.includes(item.value)) {
          selectedKeys.push(item.value); // Add the value to the array
        }
      });
    };

    // Call the helper function with your tree data
    traverseTree(permissionslist);

    setSelectedPermissions(selectedKeys); // Update the state with the array
  };

  const tProps = {
    treeData: permissionslist,
    onChange: handleTreeSelectChange,
    treeCheckable: true,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-3">
        <Link
          to={"/users/list"}
          className="bg-[#FFFFFF1A] px-[6px] py-2 rounded"
        >
          <IoArrowBack size={20} />
        </Link>
        <div>
          <h1 className="font-normal text-xl leading-6">Add Roles</h1>
          <p className="font-normal text-xs leading-4 text-text-800">
            This is the description text that will go under the title header
          </p>
        </div>
      </div>
      <div>
        <Card
          style={{
            backgroundColor: "#141421",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <InputComponent
                  label="Name"
                  type={"text"}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={24}>
                <TreeSelect
                  {...tProps}
                  required
                  className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-text-900 dark:bg-[#000000] border-0 border-b-2 border-b-[#000000] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000]`}
                />
                {/* <TextAreaComponent
                      label="Role Description"
                      name="description"
                      onChange={handleInputChange}
                      value={data?.description}
                    /> */}
              </Col>
            </Row>
            {/* <Row gutter={[20, 20]} className="mt-7">
              <Col xs={24}>
                <TextAreaComponent label={"About User..."} />
              </Col>
            </Row> */}
            <div className="flex items-center justify-end mt-7">
              {/* <Link
                loading={loading}
                className="flex items-center justify-center w-[250px] h-[50px] rounded text-text-900 font-semibold text-[14px] leading-4 hover:bg-black hover:border-black hover:text-black"
                style={{
                  background:
                    "linear-gradient(225.2deg, #FFC700 0.18%, #FF5C00 99.82%)",
                  border: "1px solid transparent",
                }}
              >
                Submit
              </Link> */}
              <button
                type="submit"
                disabled={loading} // Disable the button while loading
                className="flex items-center justify-center w-[250px] h-[50px] rounded text-text-900 font-semibold text-[14px] leading-4 hover:bg-black hover:border-black hover:text-black"
                style={{
                  background:
                    "linear-gradient(225.2deg, #FFC700 0.18%, #FF5C00 99.82%)",
                  border: "1px solid transparent",
                }}
              >
                {loading ? (
                  <FaSpinner
                    className="animate-spin"
                    style={{ marginRight: "6px" }}
                  />
                ) : null}{" "}
                Submit
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Add;
