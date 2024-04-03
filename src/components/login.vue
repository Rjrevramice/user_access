<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email" class="label-right">Email:</label>
        <input type="text" id="email" v-model="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password" class="label-right">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Sign up here!</router-link></p>
  </div>
</template>

<script>
  import axios from 'axios';
  import Swal from 'sweetalert2'


  export default {
    name: 'LoginForm',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      validateAndSubmit() {
        if (!this.email || !this.password) {
          alert('Please enter both email and password.');
          return;
        }
        this.login();
      },
      login() {
        axios.get(`http://localhost/laravel1/public/login?email=${this.email}&password=${this.password}`)
        .then(response => {
          console.log("ress",response.data.status); 
          localStorage.setItem('user', JSON.stringify(response.data.data));
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.'
          }).then(()=>{
            console.log(response.data.data);
            if(response.data.data.user_type == "team_lead"){
              window.location.href = '/teamlead/my-profile';
            }else if(response.data.data.user_type == "employee"){
              window.location.href = '/employee/my-profile';
            }else{
              window.location.href = '/admin/all-employees';
            }
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
            })
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
      },
      

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
input[type="password"] {
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
