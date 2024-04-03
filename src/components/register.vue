<template>
    <div class="login-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name" class="label-right">Name:</label>
          <input type="text" id="name" v-model="name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label for="email" class="label-right">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label for="password" class="label-right">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
        </div>
        <div class="form-group">
          <label for="role" class="label-right">Role:</label>
          <select id="role" v-model="role" required>
            <option value="" disabled>Select role</option>
            <option value="employee">Employee</option>
            <option value="team_lead">Team Lead</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <router-link to="/">Login here!</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2'

  export default {
    name: 'RegisterForm',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        role: ''
      };
    },
    methods: {
      register() {
        console.log('Registering...');
        axios.get(`http://localhost/laravel1/public/register?email=${this.email}&password=${this.password}&name=${this.name}&role=${this.role}`)
        .then(response => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Registered Successful!',
            text: 'You have successfully registered.',
          }).then(() => { 
            window.location.href = '/'; 
          });
        })
        .catch(error => {
          if (error.response.status === 422) {
            const errors = error.response.data.message;
            let errorMessage = '';

            for (let key in errors) {
              errorMessage += errors[key][0] + '\n';
            }
            Swal.fire({
              icon: 'error',
              title: 'Validation Error',
              text: errorMessage
            });
          }
          if (error.response.status === 400) {
            const errors = error.response.data.message;
            Swal.fire({
              icon: 'error',
              title: 'Validation Error',
              text: errors
            });
          }
          
          
        });
        console.log('Logging in...');
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .label-right {
    flex: 1; 
    text-align: justify; 
    margin-right: -52px; 
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    flex: 2; 
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  