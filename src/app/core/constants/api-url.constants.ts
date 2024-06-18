const BASE_API_URL = 'http://localhost:8080';

const API_USER_URL = `${BASE_API_URL}/api/users`;
const API_EVENT_URL = `${BASE_API_URL}/api/events`;
const API_JOB_URL = `${BASE_API_URL}/api/jobs`;
const API_WELLNESS_CHECK_URL = `${BASE_API_URL}/api/wellness-checks`;

const userUrls = {
  pure: `${API_USER_URL}/`,
  login: `${API_USER_URL}/login`,
  register: `${API_USER_URL}/register`,
  authenticate: `${API_USER_URL}/authenticate`,
};

export default {
  user: userUrls,
  event: API_EVENT_URL,
  job: API_JOB_URL,
  wellnessCheck: API_WELLNESS_CHECK_URL
}