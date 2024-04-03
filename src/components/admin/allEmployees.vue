<template>
  <div class="employees-list">
    <h2>All Employees</h2>
    <table>
      <thead>
        <tr>
          <th>SI.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.user_type }}</td>
          <td>
            <button @click="editEmployee(employee)" class="btn btn-primary">Edit</button>
            <button @click="deleteEmployee(employee)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <EditEmployee v-if="showEditEmployee" :employee="selectedEmployee" @close="closeEditEmployee" @save="handleEmployeeUpdate"/>
  </div>
</template>

<script>
import axios from 'axios';
import EditEmployee from './EditEmployee.vue'; 

export default {
  components: {
    EditEmployee,
  },
  data() {
    return {
      employees: [],
      selectedEmployee: null,
      showEditEmployee: false,
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      axios
        .get('http://localhost/laravel1/public/all-employees')
        .then((response) => {
          this.employees = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching employees:', error);
        });
    },
    editEmployee(employee) {
      this.selectedEmployee = employee;
      this.showEditEmployee = true;
    },
    deleteEmployee(employee) {
      console.log('Delete employee:', employee);
    },
    closeEditEmployee() {
      this.fetchEmployees();
      this.showEditEmployee = false;
      this.selectedEmployee = null;
    },
    handleEmployeeUpdate(updatedEmployee) {
      const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
      }
      this.closeEditEmployee();
    },
  },
};
</script>


<style scoped>
.employees-list {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f0f0f0;
}

th, td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  text-align: left;
}

td {
  text-align: center; /* Align table cell content to center */
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
}

/* Modal styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  display: flex; /* Use flex display */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
