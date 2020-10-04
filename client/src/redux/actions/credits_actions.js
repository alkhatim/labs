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
