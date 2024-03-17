import axios from 'axios';
import {restUrl} from '../../config';

const axiosIns = axios.create({
  baseURL: restUrl,
  timeout: 100000,
});

export default axiosIns;
