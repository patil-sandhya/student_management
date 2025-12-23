import { create } from 'domain';
import axios from '../../axios';

const ApiSercies = {
    post_signIn(data) {
    // console.log(data);
    return axios.post('/api/user/sign-in', data);
  },
  post_signUp(data) {
    // console.log(data);
    return axios.post('/api/user/sign-up', data);
  },
   
  get_logout(){
    return axios.get('/api/user/');
  },
  add_student(data){
    return axios.post('/api/student/enroll', data);
    },

    get_students(page, limit){
    return axios.get(`/api/student/all?page=${page}&limit=${limit}`);
    },

    get_profile(id){
    return axios.get(`/api/student/${id}`);
    },

    update_profile(id, data){
    return axios.put(`/api/student/${id}`, data);
    },

    delete_student(id){
    return axios.delete(`/api/student/${id}`);
    }
    
}

export default ApiSercies;