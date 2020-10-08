import http from "../../helpers/http";
import messages from "../../helpers/messages";

export const getAudits = async () => {
  try {
    const result = await http.get(`/api/v1/audits`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getAudit = async (auditId) => {
  try {
    const result = await http.get(`/api/v1/audits/${auditId}`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};