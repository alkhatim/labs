import http from "../../helpers/http";
import messages from "../../helpers/messages";

export const getUser = async (userId) => {
  try {
    const result = await http.get(`/api/v1/users/${userId}`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getMyProfile = async () => {
  try {
    const result = await http.get(`/api/v1/users/my-profile`);
    return result.data.data;
  } catch (err) {
    messages.error(err);
  }
};

export const updateMyUserProfile = async (user) => {
  try {
    const result = await http.put(`/api/v1/users/my-profile`, user);
    return result.data.data;
  } catch (err) {
    messages.error(err);
  }
};

export const deleteUser = async (userId) => {
  try {
    const result = await http.delete(`/api/v1/users/${userId}`);
    return result.data.data;
  } catch (err) {
    messages.error(err);
  }
};

export const updateUser = async (user) => {
  try {
    const result = await http.put(`/api/v1/users/${user._id}`, user);
    return result.data.data;
  } catch (err) {
    messages.error(err);
  }
};

export const addUser = async (user) => {
  try {
    const result = await http.post(`/api/v1/users`, user);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getUsers = async () => {
  try {
    const result = await http.get(`/api/v1/users`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const changePassword = async (id, body) => {
  try {
    await http.post(`/api/v1/users/${id}/update-user-password`, body);
  } catch (error) {
    messages.error(error);
  }
};

export const updateMyPassword = async (body) => {
  try {
    await http.put(`/api/v1/users/update-my-password`, body);
  } catch (error) {
    messages.error(error);
  }
};
