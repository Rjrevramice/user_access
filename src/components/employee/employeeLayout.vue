<template>
  <div class="app">
    <header class="header">
      <h1>Employee Dashboard</h1>
    </header>

    <div class="main">
      <div class="sidebar">
        <ul>
          <li><router-link to="/employee/my-profile">My Profile</router-link></li>
          <!-- <li><router-link to="/employee/team-leader">Team Leader</router-link></li> -->
          <li><router-link to="/logout" @click="logout">Logout</router-link></li>
          <!-- <li><router-link to="/employee/software">Software</router-link></li>
          <li><router-link to="/employee/hr">HR</router-link></li> -->
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
  background-color: #333;
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
  color: #333;
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
  background-color: #333;
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
