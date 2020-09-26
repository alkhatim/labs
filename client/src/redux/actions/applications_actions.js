import http from "../../helpers/http";
import messages from "../../helpers/messages";
import { saveAs } from "file-saver";

export const getApplication = async (applicationId) => {
  try {
    const result = await http.get(`/api/v1/applications/${applicationId}`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteApplication = async (applicationId) => {
  try {
    const result = await http.delete(`/api/v1/applications/${applicationId}`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateApplication = async (application) => {
  try {
    const result = await http.put(
      `/api/v1/applications/${application._id}`,
      application
    );
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const addApplication = async (application) => {
  try {
    const result = await http.post(`/api/v1/applications`, application);
    if (result) {
      try {
        const file = await http.get(
          `/api/v1/applications/${result._id}/download-receipt`,
          {
            responseType: "blob",
          }
        );
        if (file) {
          const pdfBlob = new Blob([file.data], { type: "application/pdf" });
          saveAs(pdfBlob, `تفاصيل الفحص .pdf`);
        }
      } catch (error) {
        messages.error(error);
      }
    }
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const downloadReceipt = async (application) => {
  try {
    const result = await http.post(
      `/api/v1/applications/${application._id}/download-receipt`
    );
    if (result) {
      try {
        const file = await http.get(
          `/api/v1/applications/${application._id}/download-receipt`,
          {
            responseType: "blob",
          }
        );
        if (file) {
          const pdfBlob = new Blob([file.data], { type: "application/pdf" });
          saveAs(pdfBlob, `تفاصيل الفحص .pdf`);
        }
      } catch (error) {
        messages.error(error);
      }
    }
  } catch (error) {
    messages.error(error);
  }
};

export const getApplications = async () => {
  try {
    const result = await http.get(`/api/v1/applications/my-applications`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getApplicationsStats = async () => {
  try {
    const result = await http.get(`/api/v1/applications/statistics`);
    return result.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getAllStats = async () => {
  try {
    const result = await http.get(`/api/v1/applications/all-statistics`);
    return result.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getAllApplications = async () => {
  try {
    const result = await http.get(`/api/v1/applications`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};
