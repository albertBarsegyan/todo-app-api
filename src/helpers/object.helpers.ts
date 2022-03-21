export const getUpdateFields = (
  text?: string | null,
  statusId?: number | null
) => {
  if (text && statusId) {
    return {
      text,
      statusId,
    };
  }

  if (text) {
    return {
      text,
    };
  }

  if (statusId) {
    return {
      statusId,
    };
  }
};
