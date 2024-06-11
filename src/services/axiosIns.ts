import axios from 'axios';
import {restUrl} from '../../config';

const axiosIns = axios.create({
  baseURL: restUrl,
  timeout: 15000,
});

export default axiosIns;
