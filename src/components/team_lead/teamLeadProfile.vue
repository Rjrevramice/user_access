<template>
  <form @submit.prevent="submitForm" class="update-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="formData.name" required placeholder="Name">
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" required placeholder="Email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password" placeholder="Password">
    </div>
    <button type="submit" class="btn-submit">Update</button>
  </form>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  mounted() {
    this.getEmployeeDetails();
  },
  methods: {
   
    getEmployeeDetails() {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      axios.get(`http://localhost/laravel1/public/getUser/${userDetails.id}`)
        .then(response => {
          console.log('res',response)
          const employeeData = response.data.data; 
          this.formData.name = employeeData.name;
          this.formData.email = employeeData.email;
        })
        .catch(error => {
          console.error('Error fetching employee details:', error);
        });
    },
    submitForm() {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      console.log('Form submitted:', this.formData);
      axios.get(`http://localhost/laravel1/public/updateUser/${userDetails.id}?userDetails=${JSON.stringify(this.formData)}`)
      .then(response => {
          console.log('res',response)
          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            text: 'Profile updated successfully.'
          })
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.update-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 96%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
