<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Navbar from "./components/navbar/Navbar.svelte"
    import Login from "./components/login/Login.svelte";
    import Signup from "./components/login/Signup.svelte"
    import ForgotPassword from "./components/login/ForgotPassword.svelte"
    import Home from "./components/home/Home.svelte"
    import Admin from "./components/admin/Admin.svelte";
    import AdminNavbar from "./components/navbar/AdminNavbar.svelte";
    import CreateAdmin from "./components/login/CreateAdmin.svelte";
    import {SvelteToast} from '@zerodevx/svelte-toast'


    let role;
    fetch("/api/isadmin")
    .then(res => res.json())
    .then(result => {
        role = result.role
    })
    
</script>

<Router>
    <main>
        <Route path="/home">
        {#if role === "ADMIN"}
            <AdminNavbar />
            <Home />
        {:else}
            <Navbar />
            <Home />
        {/if}
        </Route>
        

        <Route path="/login">
            <Navbar />
            <Login />
        </Route>

        <Route path="/signup">
            <Navbar />
            <Signup />
        </Route>

        <Route path="/admin">
            <AdminNavbar />
            <Admin />
        </Route>
            
        <Route path="/createnewadmin">
            <AdminNavbar />
            <CreateAdmin />
        </Route>

        <Route path="/forgotpassword">
            <Navbar />
            <ForgotPassword />
        </Route>

        <SvelteToast />
    </main>
</Router>
