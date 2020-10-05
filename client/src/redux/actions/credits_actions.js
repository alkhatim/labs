import http from "../../helpers/http";
import messages from "../../helpers/messages";

export const getCredits = async (creditSummaryDate) => {
  try {
    const result = await http.post(`/api/v1/credits`, creditSummaryDate);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const postHaggana = async (haggana) => {
  try {
    const result = await http.post(`/api/v1/haggana`, haggana);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getHagganas = async () => {
  try {
    const result = await http.get(`/api/v1/haggana`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getHagganasNotDone = async () => {
  try {
    const result = await http.get(`/api/v1/haggana/notdone`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const doneHaggana = async (hagganaId) => {
  try {
    const result = await http.post(`/api/v1/haggana/${hagganaId}/done`);
    return result.data.data;
  } catch (error) {
    messages.error(error);
  }
};
