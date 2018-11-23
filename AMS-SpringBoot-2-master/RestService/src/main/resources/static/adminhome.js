function init() {
    if (sessionStorage.getItem('adminUser') === null) {
        alert('Unauthorized Access');
        localStorage.clear();
        window.location = 'Login.html';
    }
}

function logout(){
    sessionStorage.clear();
    window.location="Login.html";
}