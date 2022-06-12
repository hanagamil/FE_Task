import axios from 'axios';

export default {

  getPerformance() {
    return axios
      .get('https://fe-task.getsandbox.com/performance')
      .then(({ data }) => data);
  },

};
