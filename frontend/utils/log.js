import axios from './axios';

export const sendLog = async params => {
  try {
    await axios.post(
      `/log/leave?pageNo=${params}`,
      {},
      {
        headers: { 'x-forwarded-for': '132.12.12.120' },
      },
    );
  } catch (e) {}
};

export const sendTimeLog = async params => {
  try {
    await axios.post(
      `/log/diff-time`,
      { ...params },
      {
        headers: { 'x-forwarded-for': '132.12.12.120' },
      },
    );
  } catch (e) {}
};
