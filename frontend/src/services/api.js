import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('awc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Public
export const getProfile = () => api.get('/profile').then(r => r.data);
export const getSkills = () => api.get('/skills').then(r => r.data);
export const getServices = () => api.get('/services').then(r => r.data);
export const getProjects = () => api.get('/projects').then(r => r.data);
export const getTestimonials = () => api.get('/testimonials').then(r => r.data);
export const getBlogs = () => api.get('/blogs').then(r => r.data);
export const getBlog = (slug) => api.get(`/blogs/${slug}`).then(r => r.data);
export const getComments = (blogId) => api.get(`/blogs/${blogId}/comments`).then(r => r.data);
export const postComment = (blogId, data) => api.post(`/blogs/${blogId}/comments`, data).then(r => r.data);
export const postReply = (blogId, cid, data) => api.post(`/blogs/${blogId}/comments/${cid}/reply`, data).then(r => r.data);
export const likeBlog = (blogId, liked) => api.post(`/blogs/${blogId}/like`, { liked }).then(r => r.data);
export const postOrder = (data) => api.post('/orders', data).then(r => r.data);
export const postMessage = (data) => api.post('/messages', data).then(r => r.data);

// Admin
export const adminLogin = (username, password) => api.post('/admin/login', { username, password }).then(r => r.data);
export const adminStats = () => api.get('/admin/stats').then(r => r.data);
export const adminOrders = () => api.get('/orders').then(r => r.data);
export const adminMessages = () => api.get('/messages').then(r => r.data);
export const updateOrder = (id, data) => api.patch(`/orders/${id}`, data).then(r => r.data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`).then(r => r.data);
export const deleteMessage = (id) => api.delete(`/messages/${id}`).then(r => r.data);

export const crud = (name) => ({
  list: () => api.get(`/${name}`).then(r => r.data),
  create: (data) => api.post(`/${name}`, data).then(r => r.data),
  update: (id, data) => api.put(`/${name}/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/${name}/${id}`).then(r => r.data),
});

export const putProfile = (data) => api.put('/profile', data).then(r => r.data);

export default api;
