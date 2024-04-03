<template>
    <div class="app">
      <header class="header">
        <h1>Admin Dashboard</h1>
      </header>
  
      <div class="main">
        <div class="sidebar">
          <ul>
            <li><router-link to="/admin/all-employees">All Users</router-link></li>
            <!-- <li><router-link to="/admin/team-leader">All Team Leads</router-link></li> -->
            <li><router-link to="/admin/my-profile">My Profile</router-link></li>
            <li><router-link to="/logout" @click="logout">Logout</router-link></li>
            <!-- <li><router-link to="/employee/hr">HR</router-link></li> -->
          </ul>
        </div>
  
        <main class="content">
          <router-view></router-view>
        </main>
      </div>
  
      <footer class="footer">
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';

  export default {
    name: 'App',
    methods: {
      logout() {
        localStorage.removeItem('user');
        window.location.href = '/'; 
      }
    }
  };
  </script>
  
  <style scoped>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header {
    background-color: #6c0a0a;
    color: #fff;
    padding: 1px;
    text-align: center;
  
  }
  
  .main {
    display: flex;
    flex: 1;
  }
  
  /* .sidebar {
    width: 200px;
    background-color: #f0f0f0;
  } */
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  router-link {
    display: block;
    text-decoration: none;
    color: #670303;
    cursor: pointer;
  }
  
  router-link:hover {
    color: #007bff;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  
  .footer {
    background-color: #6c0a0a;
    color: #fff;
    padding: 0px;
    text-align: center;
  }
  
  .sidebar li a{
    text-decoration: none;
  }
  .sidebar{
    width: 200px;
      height: 300px;
      margin-left: 25px;
      margin-top: 25px;
      border-radius: 15px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      background: white;
     
  }
  
  .sidebar li{
    border: none;
  }
  
  </style>
  