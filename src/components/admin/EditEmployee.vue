<template>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Employee</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveChanges">
              <div class="mb-3">
                <input type="hidden" class="form-control" id="id" v-model="editedEmployee.id">

                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="editedEmployee.name">
                </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="editedEmployee.email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="editedEmployee.password">
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    props: {
      employee: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editedEmployee: {
          name: this.employee.name,
          id: this.employee.id,
          email: this.employee.email,
          password: '', 
        },
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      saveChanges() {


        const requestData = {
            id: this.editedEmployee.id,
            name: this.editedEmployee.name,
            email: this.editedEmployee.email,
            password: this.editedEmployee.password,
        };
        const queryParams = encodeURIComponent(JSON.stringify(requestData));
        const url = `http://localhost/laravel1/public/updateUser/${this.editedEmployee.id}?userDetails=${queryParams}`;
       
        axios.get(url)
            .then(response => {
                console.log('Employee updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            });

        this.$emit('save', this.editedEmployee);
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  