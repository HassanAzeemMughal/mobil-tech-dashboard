import { Card, Col, message, notification, Row, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import InputComponent from "../../../components/InputComponent/index";
import SelectComponent from "../../../components/SelectComponent";
import TextAreaComponent from "../../../components/TextAreaComponent";
import { Link, useParams } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { FaSpinner } from "react-icons/fa";
import useFormHandler from "../../../HelperFunction/FormHandler";
import permissionslist from "../../../HelperFunction/permissions.json";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState(null); // Renamed for clarity
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { formData, handleInputChange, handleSelectChange, setFormData } =
    useFormHandler({
      name: "",
    });
  const { slug } = useParams();

  // Fetch role data and permissions
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await ApiService.get(`/roles/${slug}`);
        if (response.success === "true") {
          const { name, permissions } = response.data;
          setRoleData(response.data);
          setFormData({ name });
          setSelectedPermissions(permissions || []); // Initialize selected permissions
        } else {
          notification.error({
            message: "Error",
            description: response.message,
            placement: "topRight",
          });
        }
      } catch (error) {
        console.error("Error fetching role data", error);
        notification.error({
          message: "Failed to load role data",
          placement: "topRight",
        });
      }
    };
    if (slug) fetchRoleData();
  }, [slug, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        permissions: selectedPermissions,
      };
      const response = await ApiService.put(`/roles/${slug}`, payload);

      if (response.success === "true") {
        notification.success({
          message: "Success",
          description: "Role updated successfully",
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Error",
          description: response.message,
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: error.response?.data?.message || "An error occurred",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  // Structure permissions for TreeSelect
  const treeData = permissionslist.map((perm) => ({
    title: perm.title,
    value: perm.value,
    key: perm.value,
    children: perm.children?.map((child) => ({
      title: child.title,
      value: child.value,
      key: child.value,
    })),
  }));

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
          <h1 className="font-normal text-xl leading-6">Update User</h1>
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
                  treeData={treeData}
                  value={selectedPermissions}
                  onChange={setSelectedPermissions}
                  treeCheckable
                  showCheckedStrategy="SHOW_ALL"
                  placeholder="Select Permissions"
                  style={{ width: "100%" }}
                  className="permissions-tree-select"
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
                Update
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Edit;
