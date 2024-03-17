import axios from 'axios';
import baseURL from '@/ts//baseURL';

export default axios.create({
  baseURL,
});
