let users = JSON.parse(localStorage.getItem('users')) || [];
let bloodRequests = JSON.parse(localStorage.getItem('bloodRequests')) || [];

function initDashboard() {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark') document.body.classList.add('dark');
    loadDashboard();
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark')?'dark':'light');
}

function showSection(sectionId){
    ['offlineSMS','notifications','searchBlood'].forEach(id=>{
        document.getElementById(id).style.display=id===sectionId?'block':'none';
    });
}

function registerUser() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    if(!name||!email||!password){alert('Fill all fields');return;}
    if(users.find(u=>u.email===email)){alert('User exists');return;}
    users.push({name,email,password});
    localStorage.setItem('users',JSON.stringify(users));
    alert('Registered!'); window.location.href='index.html';
}

function loginUser() {
    const email=document.getElementById('loginEmail').value;
    const password=document.getElementById('loginPassword').value;
    const user=users.find(u=>u.email===email && u.password===password);
    if(user){localStorage.setItem('loggedInUser',JSON.stringify(user));window.location.href='dashboard.html';}
    else{alert('Invalid credentials');}
}

function logoutUser(){
    localStorage.removeItem('loggedInUser');
    window.location.href='index.html';
}

function loadDashboard(){
    const user=JSON.parse(localStorage.getItem('loggedInUser'));
    if(!user){window.location.href='index.html'; return;}
    document.getElementById('welcomeUser').innerText=`Welcome, ${user.name}!`;
}

// Search blood
function searchBlood(){
    const group=document.getElementById('searchBloodGroup').value;
    const urgent=document.getElementById('searchUrgent').value;
    const filtered=bloodRequests.filter(r=>{
        let g=group?r.bloodGroup===group:true;
        let u=urgent?r.urgent.toString()===urgent:true;
        return g&&u;
    });
    const container=document.getElementById('searchResults');
    container.innerHTML='';
    filtered.forEach(r=>{
        const div=document.createElement('div');
        div.className='dashboard-section';
        div.innerHTML=`<strong>${r.bloodGroup}</strong> - ${r.units} units at <strong>${r.hospital}</strong> ${r.urgent?'⚠️ Urgent':''}`;
        container.appendChild(div);
    });
}
