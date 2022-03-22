export const getUpdateFields = (
  text?: string | null,
  status_id?: number | null
) => {
  if (text && status_id) {
    return {
      text,
      status_id,
    };
  }

  if (text) {
    return {
      text,
    };
  }

  if (status_id) {
    return {
      status_id,
    };
  }
};
