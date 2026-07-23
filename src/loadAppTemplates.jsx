/**
 * loadAppTemplates.js — ZWS Full-Stack App Templates
 *
 * Import this ONCE in your main.jsx or App.jsx:
 *   import './loadAppTemplates'
 *
 * The Home page reads window.ZATER_APP_HTML[id] to show
 * live previews and enable download / GitHub deploy.
 *
 * Keys: 'user-management' | 'ecommerce' | 'food-ordering' | 'appointment'
 */

// ─── 1. USER MANAGEMENT SYSTEM ────────────────────────────────────────────────
const USER_MANAGEMENT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ZATER — User Management</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a0f;--surface:#12121a;--surface2:#1a1a26;--border:#ffffff12;--border2:#ffffff20;--primary:#7c5cfc;--primary-glow:#7c5cfc44;--accent:#00e5a0;--text:#f0f0ff;--muted:#888899;--danger:#ff4d6d;--success:#00e5a0;--font:system-ui,sans-serif;}
body{font-family:var(--font);background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;}
.auth-wrap{width:100%;max-width:420px;padding:2rem;}
.auth-bg{position:fixed;inset:0;background:radial-gradient(ellipse 80% 60% at 20% 40%,#7c5cfc18,transparent),radial-gradient(ellipse 60% 80% at 80% 80%,#00e5a018,transparent);pointer-events:none;z-index:0;}
.auth-card{background:var(--surface);border:1px solid var(--border2);border-radius:20px;padding:2.5rem;position:relative;z-index:1;}
.logo{font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:.25rem;color:var(--text);}
.logo span{color:var(--primary);}
.tagline{color:var(--muted);font-size:.85rem;margin-bottom:2rem;}
.form-group{margin-bottom:1.1rem;}
.form-label{display:block;font-size:.75rem;font-weight:600;color:var(--muted);margin-bottom:.4rem;text-transform:uppercase;letter-spacing:.06em;}
.form-input{width:100%;background:var(--surface2);border:1px solid var(--border2);border-radius:10px;padding:.75rem 1rem;color:var(--text);font-size:.9rem;outline:none;}
.form-input:focus{border-color:var(--primary);outline:2px solid var(--primary-glow);}
.btn{width:100%;padding:.85rem;border-radius:10px;border:none;font-size:.95rem;font-weight:600;cursor:pointer;}
.btn-primary{background:var(--primary);color:#fff;}
.auth-switch{text-align:center;margin-top:1rem;font-size:.85rem;color:var(--muted);}
.auth-switch a{color:var(--primary);cursor:pointer;}
.demo-row{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:1rem;}
.demo-btn{padding:.6rem;background:var(--surface2);border:1px solid var(--border2);border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;color:var(--text);}
.app{display:none;min-height:100vh;background:var(--bg);width:100%;}
.sidebar{position:fixed;top:0;left:0;width:220px;height:100vh;background:var(--surface);border-right:1px solid var(--border);padding:1.5rem;display:flex;flex-direction:column;}
.sidebar-logo{font-size:1.3rem;font-weight:800;margin-bottom:2rem;color:var(--text);}
.sidebar-logo span{color:var(--primary);}
.nav-item{display:flex;align-items:center;gap:.75rem;padding:.65rem .75rem;border-radius:8px;cursor:pointer;font-size:.875rem;color:var(--muted);margin-bottom:2px;transition:all .15s;}
.nav-item.active,.nav-item:hover{background:var(--primary-glow);color:var(--primary);}
.main{margin-left:220px;padding:2rem;}
.page{display:none;}
.page.active{display:block;}
.page-title{font-size:1.6rem;font-weight:700;margin-bottom:.25rem;}
.page-sub{color:var(--muted);font-size:.875rem;margin-bottom:2rem;}
.top-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;}
.action-btn-primary{padding:.6rem 1.2rem;background:var(--primary);border:none;border-radius:8px;color:#fff;font-size:.855rem;font-weight:600;cursor:pointer;}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.25rem;}
.stat-val{font-size:2rem;font-weight:700;margin-bottom:.25rem;}
.stat-label{font-size:.78rem;color:var(--muted);}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;}
.card-title{font-size:.95rem;font-weight:600;}
.search-input{background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:.5rem .9rem;color:var(--text);font-size:.82rem;outline:none;width:200px;}
table{width:100%;border-collapse:collapse;}
th{text-align:left;padding:.65rem 1rem;font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border);}
td{padding:.85rem 1rem;border-bottom:1px solid var(--border);font-size:.85rem;}
tr:last-child td{border-bottom:none;}
.badge{display:inline-flex;padding:.2rem .65rem;border-radius:20px;font-size:.7rem;font-weight:600;}
.badge-admin{background:#7c5cfc22;color:var(--primary);}
.badge-user{background:#ffffff11;color:var(--muted);}
.badge-active{background:#00e5a018;color:var(--accent);}
.badge-inactive{background:#ff4d6d18;color:var(--danger);}
.tbl-action{padding:.28rem .65rem;border-radius:6px;border:1px solid var(--border2);background:transparent;color:var(--muted);font-size:.72rem;cursor:pointer;margin-right:4px;}
.tbl-action:hover{border-color:var(--primary);color:var(--primary);}
.tbl-action.del:hover{border-color:var(--danger);color:var(--danger);}
/* MODAL */
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:500;display:flex;align-items:center;justify-content:center;}
.modal{background:var(--surface);border:1px solid var(--border2);border-radius:16px;padding:2rem;width:400px;position:relative;}
.modal-title{font-size:1.1rem;font-weight:700;margin-bottom:1.5rem;}
.modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;color:var(--muted);font-size:1.2rem;cursor:pointer;}
.modal-footer{display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;}
.btn-sm{padding:.55rem 1.1rem;border-radius:8px;border:none;font-size:.85rem;font-weight:600;cursor:pointer;}
.btn-sm-primary{background:var(--primary);color:#fff;}
.btn-sm-ghost{background:var(--surface2);color:var(--muted);}
.profile-wrap{display:flex;flex-direction:column;gap:1.5rem;}
.profile-av{width:80px;height:80px;border-radius:50%;background:var(--primary-glow);border:2px solid var(--primary);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:var(--primary);margin:0 auto;}
</style>
</head>
<body>
<div class="auth-bg"></div>
<div id="loginPage" class="auth-wrap">
  <div class="auth-card">
    <div class="logo">ZA<span>T</span>ER</div>
    <div class="tagline">User Management System</div>
    <div class="form-group"><label class="form-label">Email</label><input id="lEmail" class="form-input" type="email" value="admin@zater.com"/></div>
    <div class="form-group"><label class="form-label">Password</label><input id="lPass" class="form-input" type="password" value="admin123"/></div>
    <button class="btn btn-primary" onclick="login()">Sign In</button>
    <div class="auth-switch">No account? <a onclick="showSignup()">Register</a></div>
    <div class="demo-row">
      <button class="demo-btn" onclick="ql('admin@zater.com','admin123')">🛡️ Admin Demo</button>
      <button class="demo-btn" onclick="ql('user@zater.com','user123')">👤 User Demo</button>
    </div>
  </div>
</div>

<div id="appPage" class="app">
  <div class="sidebar">
    <div class="sidebar-logo">ZA<span>T</span>ER</div>
    <div class="nav-item active" onclick="navTo('dashboard',this)">📊 Dashboard</div>
    <div class="nav-item" onclick="navTo('profile',this)">👤 My Profile</div>
    <div class="nav-item" onclick="navTo('users',this)">👥 Manage Users</div>
    <div class="nav-item" onclick="navTo('roles',this)">🛡️ Roles & Access</div>
    <div style="flex:1"></div>
    <div style="display:flex;align-items:center;gap:.75rem;padding:.75rem;background:var(--surface2);border-radius:10px;">
      <div style="width:32px;height:32px;border-radius:50%;background:var(--primary-glow);border:1px solid var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:var(--primary)" id="sidebarAv">A</div>
      <div><div style="font-size:.85rem;font-weight:500" id="sidebarName">Admin</div><div style="font-size:.72rem;color:var(--muted)" id="sidebarRole">Administrator</div></div>
    </div>
    <button onclick="logout()" style="margin-top:.75rem;width:100%;padding:.6rem;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--muted);cursor:pointer;font-size:.85rem;">🚪 Sign Out</button>
  </div>
  <div class="main">
    <!-- DASHBOARD -->
    <div class="page active" id="page-dashboard">
      <div class="top-row"><div><div class="page-title">Dashboard</div><div class="page-sub" id="welcome">Welcome back!</div></div></div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-val" id="st1">5</div><div class="stat-label">Total Users</div></div>
        <div class="stat-card"><div class="stat-val" id="st2">4</div><div class="stat-label">Active</div></div>
        <div class="stat-card"><div class="stat-val" id="st3">2</div><div class="stat-label">Admins</div></div>
        <div class="stat-card"><div class="stat-val" id="st4">1</div><div class="stat-label">Inactive</div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Recent Users</div><button class="action-btn-primary" onclick="navTo('users',document.querySelectorAll('.nav-item')[2])">View All</button></div>
        <table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead><tbody id="dashTable"></tbody></table>
      </div>
    </div>
    <!-- PROFILE -->
    <div class="page" id="page-profile">
      <div class="page-title">My Profile</div>
      <div class="page-sub">Manage your account settings</div>
      <div class="card" style="max-width:500px;">
        <div class="profile-wrap">
          <div class="profile-av" id="profileAv">A</div>
          <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="profileName" value="Admin User"/></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="profileEmail" value="admin@zater.com"/></div>
          <div class="form-group"><label class="form-label">Role</label><input class="form-input" id="profileRole" value="Administrator" disabled style="opacity:.6"/></div>
          <div class="form-group"><label class="form-label">New Password</label><input class="form-input" type="password" id="profilePass" placeholder="Leave blank to keep current"/></div>
          <button class="action-btn-primary" style="width:auto;align-self:flex-start;" onclick="saveProfile()">Save Changes</button>
        </div>
      </div>
    </div>
    <!-- USERS -->
    <div class="page" id="page-users">
      <div class="top-row">
        <div><div class="page-title">Manage Users</div><div class="page-sub">Add, edit and remove users</div></div>
        <button class="action-btn-primary" onclick="openAddUser()">+ Add User</button>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">All Users</div><input class="search-input" placeholder="Search users…" oninput="filterUsers(this.value)"/></div>
        <table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody id="usersTable"></tbody></table>
      </div>
    </div>
    <!-- ROLES -->
    <div class="page" id="page-roles">
      <div class="page-title">Roles & Access</div>
      <div class="page-sub">Permission matrix for each role</div>
      <div class="card">
        <table>
          <thead><tr><th>Permission</th><th>Admin</th><th>Editor</th><th>User</th></tr></thead>
          <tbody>
            <tr><td>View Dashboard</td><td>✅</td><td>✅</td><td>✅</td></tr>
            <tr><td>Manage Users</td><td>✅</td><td>❌</td><td>❌</td></tr>
            <tr><td>Create Posts</td><td>✅</td><td>✅</td><td>❌</td></tr>
            <tr><td>Delete Posts</td><td>✅</td><td>❌</td><td>❌</td></tr>
            <tr><td>View Reports</td><td>✅</td><td>✅</td><td>❌</td></tr>
            <tr><td>System Settings</td><td>✅</td><td>❌</td><td>❌</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- ADD USER MODAL -->
<div id="addUserModal" class="modal-backdrop" style="display:none">
  <div class="modal">
    <button class="modal-close" onclick="closeModal('addUserModal')">✕</button>
    <div class="modal-title">Add New User</div>
    <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="newName" placeholder="John Doe"/></div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="newEmail" type="email" placeholder="john@example.com"/></div>
    <div class="form-group"><label class="form-label">Role</label>
      <select class="form-input" id="newRole"><option value="user">User</option><option value="admin">Admin</option></select>
    </div>
    <div class="form-group"><label class="form-label">Password</label><input class="form-input" id="newPass" type="password" placeholder="Min 6 characters"/></div>
    <div class="modal-footer">
      <button class="btn-sm btn-sm-ghost" onclick="closeModal('addUserModal')">Cancel</button>
      <button class="btn-sm btn-sm-primary" onclick="addUser()">Add User</button>
    </div>
  </div>
</div>

<!-- EDIT USER MODAL -->
<div id="editUserModal" class="modal-backdrop" style="display:none">
  <div class="modal">
    <button class="modal-close" onclick="closeModal('editUserModal')">✕</button>
    <div class="modal-title">Edit User</div>
    <input type="hidden" id="editIdx"/>
    <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="editName"/></div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="editEmail" type="email"/></div>
    <div class="form-group"><label class="form-label">Role</label>
      <select class="form-input" id="editRole"><option value="user">User</option><option value="admin">Admin</option></select>
    </div>
    <div class="form-group"><label class="form-label">Status</label>
      <select class="form-input" id="editStatus"><option value="active">Active</option><option value="inactive">Inactive</option></select>
    </div>
    <div class="modal-footer">
      <button class="btn-sm btn-sm-ghost" onclick="closeModal('editUserModal')">Cancel</button>
      <button class="btn-sm btn-sm-primary" onclick="saveEdit()">Save</button>
    </div>
  </div>
</div>

<script>
let users=[
  {name:'Admin User',email:'admin@zater.com',password:'admin123',role:'admin',status:'active'},
  {name:'Priya Sharma',email:'user@zater.com',password:'user123',role:'user',status:'active'},
  {name:'Ravi Kumar',email:'ravi@zater.com',password:'pass123',role:'user',status:'active'},
  {name:'Sara Ali',email:'sara@zater.com',password:'pass123',role:'admin',status:'active'},
  {name:'Dev Nair',email:'dev@zater.com',password:'pass123',role:'user',status:'inactive'},
];
let cu=null;
function ql(e,p){document.getElementById('lEmail').value=e;document.getElementById('lPass').value=p;}
function login(){
  const e=document.getElementById('lEmail').value.trim();
  const p=document.getElementById('lPass').value;
  const u=users.find(x=>x.email===e&&x.password===p);
  if(!u){showToast('Invalid credentials','error');return;}
  cu=u;
  document.getElementById('loginPage').style.display='none';
  document.getElementById('appPage').style.display='block';
  document.getElementById('sidebarAv').textContent=cu.name[0];
  document.getElementById('sidebarName').textContent=cu.name;
  document.getElementById('sidebarRole').textContent=cu.role==='admin'?'Administrator':'User';
  document.getElementById('welcome').textContent='Welcome back, '+cu.name.split(' ')[0]+' 👋';
  document.getElementById('profileAv').textContent=cu.name[0];
  document.getElementById('profileName').value=cu.name;
  document.getElementById('profileEmail').value=cu.email;
  document.getElementById('profileRole').value=cu.role==='admin'?'Administrator':'User';
  updateStats();renderDash();renderUsers();
}
function logout(){
  document.getElementById('loginPage').style.display='flex';
  document.getElementById('appPage').style.display='none';
  cu=null;
}
function showSignup(){showToast('Registration: connect to your backend API','info');}
function navTo(id,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(el)el.classList.add('active');
}
function updateStats(){
  document.getElementById('st1').textContent=users.length;
  document.getElementById('st2').textContent=users.filter(u=>u.status==='active').length;
  document.getElementById('st3').textContent=users.filter(u=>u.role==='admin').length;
  document.getElementById('st4').textContent=users.filter(u=>u.status==='inactive').length;
}
function renderDash(){
  document.getElementById('dashTable').innerHTML=users.slice(0,4).map(u=>
    '<tr><td>'+u.name+'</td><td style="color:var(--muted)">'+u.email+'</td>'
    +'<td><span class="badge badge-'+u.role+'">'+u.role+'</span></td>'
    +'<td><span class="badge badge-'+u.status+'">'+u.status+'</span></td></tr>'
  ).join('');
}
let filteredUsers=null;
function renderUsers(){
  const list=filteredUsers||users;
  document.getElementById('usersTable').innerHTML=list.map((u,i)=>{
    const idx=filteredUsers?users.indexOf(u):i;
    return '<tr><td>'+u.name+'</td><td style="color:var(--muted)">'+u.email+'</td>'
    +'<td><span class="badge badge-'+u.role+'">'+u.role+'</span></td>'
    +'<td><span class="badge badge-'+u.status+'">'+u.status+'</span></td>'
    +'<td><button class="tbl-action" onclick="openEdit('+idx+')">✏️ Edit</button>'
    +'<button class="tbl-action del" onclick="deleteUser('+idx+')">🗑️ Delete</button></td></tr>';
  }).join('');
}
function filterUsers(q){
  filteredUsers=q?users.filter(u=>u.name.toLowerCase().includes(q.toLowerCase())||u.email.toLowerCase().includes(q.toLowerCase())):null;
  renderUsers();
}
function openAddUser(){document.getElementById('addUserModal').style.display='flex';}
function closeModal(id){document.getElementById(id).style.display='none';}
function addUser(){
  const name=document.getElementById('newName').value.trim();
  const email=document.getElementById('newEmail').value.trim();
  const role=document.getElementById('newRole').value;
  const pass=document.getElementById('newPass').value;
  if(!name||!email||!pass){showToast('All fields required','error');return;}
  if(users.find(u=>u.email===email)){showToast('Email already exists','error');return;}
  users.push({name,email,password:pass,role,status:'active'});
  updateStats();renderDash();renderUsers();
  closeModal('addUserModal');
  document.getElementById('newName').value='';
  document.getElementById('newEmail').value='';
  document.getElementById('newPass').value='';
  showToast('User added successfully!','success');
}
function openEdit(i){
  const u=users[i];
  document.getElementById('editIdx').value=i;
  document.getElementById('editName').value=u.name;
  document.getElementById('editEmail').value=u.email;
  document.getElementById('editRole').value=u.role;
  document.getElementById('editStatus').value=u.status;
  document.getElementById('editUserModal').style.display='flex';
}
function saveEdit(){
  const i=parseInt(document.getElementById('editIdx').value);
  users[i].name=document.getElementById('editName').value.trim();
  users[i].email=document.getElementById('editEmail').value.trim();
  users[i].role=document.getElementById('editRole').value;
  users[i].status=document.getElementById('editStatus').value;
  updateStats();renderDash();renderUsers();
  closeModal('editUserModal');
  showToast('User updated!','success');
}
function deleteUser(i){
  if(!confirm('Delete '+users[i].name+'?'))return;
  users.splice(i,1);
  updateStats();renderDash();renderUsers();
  showToast('User deleted','success');
}
function saveProfile(){
  const name=document.getElementById('profileName').value.trim();
  const pass=document.getElementById('profilePass').value;
  if(!name){showToast('Name required','error');return;}
  if(cu){cu.name=name;cu.email=document.getElementById('profileEmail').value;}
  if(pass&&pass.length<6){showToast('Password min 6 chars','error');return;}
  document.getElementById('sidebarName').textContent=name;
  document.getElementById('profileAv').textContent=name[0];
  document.getElementById('sidebarAv').textContent=name[0];
  showToast('Profile saved!','success');
}
function showToast(msg,type){
  const t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:24px;right:24px;padding:.75rem 1.25rem;border-radius:10px;font-size:.875rem;font-weight:600;z-index:9999;animation:fadeIn .2s;'
    +(type==='error'?'background:#ff4d6d22;border:1px solid #ff4d6d55;color:#ff4d6d;':type==='success'?'background:#00e5a022;border:1px solid #00e5a055;color:#00e5a0;':'background:#7c5cfc22;border:1px solid #7c5cfc55;color:#7c5cfc;');
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2800);
}
document.getElementById('loginPage').style.display='flex';
document.getElementById('appPage').style.display='none';
</script>
</body>
</html>`;


// ─── 4. APPOINTMENT BOOKING ───────────────────────────────────────────────────
const APPOINTMENT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ZATER Book</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#f0f4ff;--surface:#fff;--border:#c8d0e8;--primary:#2563eb;--primary-light:#dbeafe;--dark:#0f172a;--text:#0f172a;--muted:#64748b;--success:#16a34a;--font:system-ui,sans-serif;}
body{font-family:var(--font);background:var(--bg);color:var(--text);}
.topbar{background:var(--surface);border-bottom:1.5px solid var(--border);height:64px;display:flex;align-items:center;padding:0 2rem;gap:2rem;position:sticky;top:0;z-index:100;}
.tb-logo{font-size:1.3rem;font-weight:700;color:var(--dark);}
.tb-logo span{color:var(--primary);}
.tb-nav{display:flex;gap:.25rem;}
.tb-btn{padding:.45rem .9rem;border-radius:7px;border:none;background:transparent;font-size:.85rem;font-weight:500;cursor:pointer;color:var(--muted);}
.tb-btn:hover,.tb-btn.active{background:var(--primary-light);color:var(--primary);}
.main{max-width:900px;margin:0 auto;padding:2rem;}
.page-title{font-size:1.8rem;font-weight:700;margin-bottom:.25rem;}
.page-sub{color:var(--muted);font-size:.875rem;margin-bottom:2rem;}
.booking-layout{display:grid;grid-template-columns:1fr 320px;gap:1.5rem;}
.cal-card{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;}
.cal-header{padding:1rem 1.25rem;border-bottom:1.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.cal-month{font-weight:600;}
.cal-nav{width:30px;height:30px;border-radius:7px;border:1.5px solid var(--border);background:var(--bg);cursor:pointer;font-size:1rem;}
.cal-grid{padding:1rem;display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
.cal-day-lbl{text-align:center;font-size:.7rem;font-weight:600;color:var(--muted);padding:.25rem;}
.cal-date{width:34px;height:34px;border-radius:8px;border:none;background:transparent;cursor:pointer;font-size:.82rem;display:flex;align-items:center;justify-content:center;margin:0 auto;transition:all .15s;}
.cal-date:hover{background:var(--primary-light);color:var(--primary);}
.cal-date.selected{background:var(--primary);color:#fff;}
.cal-date.today{border:1.5px solid var(--primary);color:var(--primary);font-weight:600;}
.slots-card{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:1.25rem;display:flex;flex-direction:column;}
.slots-title{font-weight:600;margin-bottom:1rem;font-size:.95rem;}
.form-group{margin-bottom:1rem;}
.form-label{display:block;font-size:.72rem;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:.4rem;}
.form-input,.form-select{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:.65rem .9rem;font-size:.875rem;color:var(--text);outline:none;}
.form-input:focus,.form-select:focus{border-color:var(--primary);}
.slots-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-bottom:1.25rem;}
.slot-btn{padding:.45rem;border-radius:7px;border:1.5px solid var(--border);background:var(--bg);font-size:.78rem;font-weight:500;cursor:pointer;text-align:center;transition:all .15s;}
.slot-btn:hover{border-color:var(--primary);color:var(--primary);}
.slot-btn.selected{background:var(--primary);border-color:var(--primary);color:#fff;}
.book-btn{width:100%;padding:.8rem;background:var(--primary);color:#fff;border:none;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;margin-top:auto;}
.book-btn:hover{opacity:.9;}
</style>
</head>
<body>
<div class="topbar">
  <div class="tb-logo">ZATER <span>Book</span></div>
  <div class="tb-nav">
    <button class="tb-btn active">📅 Book Slot</button>
    <button class="tb-btn">📋 My Bookings</button>
  </div>
  <div style="margin-left:auto;display:flex;align-items:center;gap:.75rem;">
    <div style="font-size:.875rem;font-weight:500;">Meena Patel</div>
    <button onclick="alert('Sign out')" style="color:var(--muted);background:none;border:1px solid var(--border);border-radius:7px;padding:.35rem .7rem;font-size:.78rem;cursor:pointer;">Sign Out</button>
  </div>
</div>
<div class="main">
  <div class="page-title">Book an Appointment</div>
  <div class="page-sub">Choose a service, pick a date and select an available time slot</div>
  <div class="booking-layout">
    <div class="cal-card">
      <div class="cal-header">
        <button class="cal-nav" onclick="changeMonth(-1)">‹</button>
        <div class="cal-month" id="calMonth">April 2025</div>
        <button class="cal-nav" onclick="changeMonth(1)">›</button>
      </div>
      <div class="cal-grid" id="calGrid"></div>
    </div>
    <div class="slots-card">
      <div class="slots-title" id="slotTitle">Select a date</div>
      <div class="form-group">
        <label class="form-label">Service</label>
        <select class="form-select">
          <option>Haircut & Styling</option>
          <option>Beard Trim</option>
          <option>Facial Treatment</option>
          <option>Full Body Massage</option>
        </select>
      </div>
      <div class="form-label" style="margin-bottom:.5rem">Available Slots</div>
      <div class="slots-grid" id="slotsGrid"><div style="color:var(--muted);font-size:.82rem;grid-column:span 3">← Pick a date first</div></div>
      <button class="book-btn" onclick="alert('Booking confirmed! Admin will approve shortly.')">Confirm Booking</button>
    </div>
  </div>
</div>
<script>
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const slots=['09:00','09:30','10:00','10:30','11:00','12:00','14:00','14:30','15:00','16:00','16:30','17:00'];
let yr=2025,mo=3,selDate=null,selSlot=null;
function changeMonth(d){mo+=d;if(mo>11){mo=0;yr++;}if(mo<0){mo=11;yr--;}renderCal();}
function renderCal(){
  document.getElementById('calMonth').textContent=months[mo]+' '+yr;
  const first=new Date(yr,mo,1).getDay();
  const days_in=new Date(yr,mo+1,0).getDate();
  const today=new Date();
  let html=days.map(d=>'<div class="cal-day-lbl">'+d+'</div>').join('');
  for(let i=0;i<first;i++)html+='<div></div>';
  for(let d=1;d<=days_in;d++){
    const ds=yr+'-'+(mo+1).toString().padStart(2,'0')+'-'+d.toString().padStart(2,'0');
    const past=new Date(yr,mo,d)<new Date(today.getFullYear(),today.getMonth(),today.getDate());
    const isToday=d===today.getDate()&&mo===today.getMonth()&&yr===today.getFullYear();
    const weekend=[0,6].includes(new Date(yr,mo,d).getDay());
    html+='<button class="cal-date'+(selDate===ds?' selected':'')+(isToday&&selDate!==ds?' today':'')+'" '+(past||weekend?'style="opacity:.35;cursor:not-allowed"':' onclick="selD(\''+ds+'\')"')+'>'+d+'</button>';
  }
  document.getElementById('calGrid').innerHTML=html;
}
function selD(ds){
  selDate=ds;selSlot=null;
  document.getElementById('slotTitle').textContent=new Date(ds+'T12:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
  document.getElementById('slotsGrid').innerHTML=slots.map(s=>'<button class="slot-btn" onclick="selS(\''+s+'\',this)">'+s+'</button>').join('');
  renderCal();
}
function selS(s,el){selSlot=s;document.querySelectorAll('.slot-btn').forEach(b=>b.classList.remove('selected'));el.classList.add('selected');}
renderCal();
</script>
</body>
</html>`;
// ─── 3. CHAT APP ──────────────────────────────────────────────────────────────
const CHAT_APP_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ZATER — Chat</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a0f;--surface:#12121a;--surface2:#1a1a26;--border:#ffffff12;--border2:#ffffff20;--primary:#7c5cfc;--primary-glow:#7c5cfc44;--accent:#00e5a0;--text:#f0f0ff;--muted:#888899;--font:system-ui,sans-serif;}
body{font-family:var(--font);background:var(--bg);color:var(--text);height:100vh;display:flex;overflow:hidden;}
/* SIDEBAR */
.sidebar{width:260px;min-width:260px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;height:100vh;}
.sb-header{padding:1.25rem 1rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.75rem;}
.sb-logo{font-size:1.1rem;font-weight:800;color:var(--text);}
.sb-logo span{color:var(--primary);}
.sb-search{margin:.75rem;position:relative;}
.sb-search input{width:100%;background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:.55rem .75rem .55rem 2rem;color:var(--text);font-size:.82rem;outline:none;}
.sb-search::before{content:'🔍';position:absolute;left:.6rem;top:50%;transform:translateY(-50%);font-size:.75rem;}
.sb-section{font-size:.65rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;padding:.75rem 1rem .25rem;}
.chat-item{display:flex;align-items:center;gap:.75rem;padding:.65rem 1rem;cursor:pointer;border-radius:0;transition:background .15s;}
.chat-item:hover{background:var(--surface2);}
.chat-item.active{background:var(--primary-glow);}
.avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.875rem;flex-shrink:0;}
.chat-info{flex:1;min-width:0;}
.chat-name{font-size:.875rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-preview{font-size:.75rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-meta{display:flex;flex-direction:column;align-items:flex-end;gap:.2rem;flex-shrink:0;}
.chat-time{font-size:.68rem;color:var(--muted);}
.unread{background:var(--primary);color:#fff;border-radius:10px;font-size:.65rem;font-weight:700;padding:.1rem .4rem;min-width:18px;text-align:center;}
.sb-user{padding:1rem;border-top:1px solid var(--border);display:flex;align-items:center;gap:.75rem;margin-top:auto;}
.sb-user-info{flex:1;font-size:.82rem;font-weight:500;}
.sb-status{font-size:.7rem;color:var(--accent);}
/* MAIN */
.chat-main{flex:1;display:flex;flex-direction:column;height:100vh;}
.chat-topbar{padding:1rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:1rem;background:var(--surface);}
.chat-topbar-name{font-weight:600;font-size:1rem;}
.chat-topbar-status{font-size:.75rem;color:var(--accent);}
.topbar-actions{margin-left:auto;display:flex;gap:.5rem;}
.tb-icon{width:34px;height:34px;border-radius:8px;background:var(--surface2);border:1px solid var(--border2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.9rem;}
/* MESSAGES */
.messages{flex:1;overflow-y:auto;padding:1.5rem;display:flex;flex-direction:column;gap:.75rem;}
.messages::-webkit-scrollbar{width:4px;}
.messages::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px;}
.msg-row{display:flex;gap:.75rem;align-items:flex-end;}
.msg-row.mine{flex-direction:row-reverse;}
.msg-av{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0;}
.bubble{max-width:60%;padding:.75rem 1rem;border-radius:16px;font-size:.875rem;line-height:1.5;position:relative;}
.msg-row:not(.mine) .bubble{background:var(--surface2);border-bottom-left-radius:4px;}
.msg-row.mine .bubble{background:var(--primary);color:#fff;border-bottom-right-radius:4px;}
.msg-time{font-size:.65rem;color:var(--muted);margin-top:.25rem;text-align:right;}
.msg-row.mine .msg-time{color:rgba(255,255,255,.6);}
.date-divider{text-align:center;font-size:.7rem;color:var(--muted);margin:.5rem 0;position:relative;}
.date-divider::before,.date-divider::after{content:'';position:absolute;top:50%;width:35%;height:1px;background:var(--border);}
.date-divider::before{left:0;}
.date-divider::after{right:0;}
/* INPUT */
.chat-input-wrap{padding:1rem 1.5rem;border-top:1px solid var(--border);background:var(--surface);}
.chat-input-row{display:flex;align-items:center;gap:.75rem;background:var(--surface2);border:1px solid var(--border2);border-radius:14px;padding:.5rem .75rem;}
.chat-input{flex:1;background:transparent;border:none;outline:none;color:var(--text);font-size:.9rem;padding:.35rem 0;}
.chat-input::placeholder{color:var(--muted);}
.send-btn{width:36px;height:36px;background:var(--primary);border:none;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.attach-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.1rem;padding:.25rem;}
</style>
</head>
<body>
<div class="sidebar">
  <div class="sb-header">
    <div style="width:36px;height:36px;background:var(--primary-glow);border:1.5px solid var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--primary)">A</div>
    <div class="sb-logo">ZA<span>T</span>ER Chat</div>
  </div>
  <div class="sb-search"><input placeholder="Search conversations…"/></div>
  <div class="sb-section">Direct Messages</div>
  <div id="chatList"></div>
  <div class="sb-user">
    <div class="avatar" style="background:#7c5cfc22;color:var(--primary)">A</div>
    <div class="chat-info"><div class="chat-name">Arjun (You)</div><div class="sb-status">● Online</div></div>
  </div>
</div>

<div class="chat-main">
  <div class="chat-topbar">
    <div class="avatar" id="topAv" style="background:#e040fb22;color:#e040fb">P</div>
    <div><div class="chat-topbar-name" id="topName">Priya Sharma</div><div class="chat-topbar-status">● Online</div></div>
    <div class="topbar-actions">
      <div class="tb-icon" title="Voice call">📞</div>
      <div class="tb-icon" title="Video call">📹</div>
      <div class="tb-icon" title="Info">ℹ️</div>
    </div>
  </div>
  <div class="messages" id="msgArea"></div>
  <div class="chat-input-wrap">
    <div class="chat-input-row">
      <button class="attach-btn" onclick="alert('Attach file')">📎</button>
      <input class="chat-input" id="msgInput" placeholder="Type a message…" onkeydown="if(event.key==='Enter')sendMsg()"/>
      <button class="send-btn" onclick="sendMsg()">➤</button>
    </div>
  </div>
</div>

<script>
const contacts=[
  {id:1,name:'Priya Sharma',av:'P',color:'#e040fb',preview:'Sounds good! See you then 👍',time:'2:34 PM',unread:0,online:true},
  {id:2,name:'Ravi Kumar',av:'R',color:'#00bcd4',preview:'Can you review my PR?',time:'1:12 PM',unread:3,online:true},
  {id:3,name:'Sara Ali',av:'S',color:'#ff9800',preview:'Meeting at 4pm confirmed',time:'11:45 AM',unread:0,online:false},
  {id:4,name:'Dev Nair',av:'D',color:'#4caf50',preview:'Thanks for the update!',time:'Yesterday',unread:1,online:false},
  {id:5,name:'Meena Patel',av:'M',color:'#f06292',preview:'Sent you the design files',time:'Yesterday',unread:0,online:true},
];
const conversations={
  1:[
    {from:'them',text:'Hey! Are we still meeting tomorrow?',time:'2:30 PM'},
    {from:'me',text:'Yes, 3pm at the office works for me',time:'2:31 PM'},
    {from:'them',text:'Perfect. I will bring the project docs',time:'2:32 PM'},
    {from:'me',text:'Great, see you then!',time:'2:33 PM'},
    {from:'them',text:'Sounds good! See you then 👍',time:'2:34 PM'},
  ],
  2:[
    {from:'them',text:'Hi Arjun, I pushed a new feature branch',time:'1:05 PM'},
    {from:'me',text:'Cool, what does it do?',time:'1:08 PM'},
    {from:'them',text:'Adds dark mode support to the dashboard',time:'1:09 PM'},
    {from:'them',text:'Can you review my PR?',time:'1:12 PM'},
  ],
  3:[
    {from:'them',text:'Meeting at 4pm confirmed',time:'11:45 AM'},
    {from:'me',text:'Got it, I will be there',time:'11:46 AM'},
  ],
  4:[
    {from:'me',text:'Updated the staging env, please test',time:'Yesterday'},
    {from:'them',text:'Thanks for the update!',time:'Yesterday'},
  ],
  5:[
    {from:'them',text:'Hi! Here are the new design files',time:'Yesterday'},
    {from:'them',text:'Sent you the design files',time:'Yesterday'},
  ],
};
let activeCid=1;
function renderList(){
  document.getElementById('chatList').innerHTML=contacts.map(c=>
    '<div class="chat-item'+(activeCid===c.id?' active':'')+'" onclick="openChat('+c.id+')">'
    +'<div class="avatar" style="background:'+c.color+'22;color:'+c.color+'">'+c.av+'</div>'
    +'<div class="chat-info"><div class="chat-name">'+c.name+'</div><div class="chat-preview">'+c.preview+'</div></div>'
    +'<div class="chat-meta"><div class="chat-time">'+c.time+'</div>'+(c.unread?'<div class="unread">'+c.unread+'</div>':'')+'</div>'
    +'</div>'
  ).join('');
}
function openChat(id){
  activeCid=id;
  contacts.find(c=>c.id===id).unread=0;
  const c=contacts.find(c=>c.id===id);
  document.getElementById('topAv').textContent=c.av;
  document.getElementById('topAv').style.background=c.color+'22';
  document.getElementById('topAv').style.color=c.color;
  document.getElementById('topName').textContent=c.name;
  renderList();
  renderMsgs();
}
function renderMsgs(){
  const msgs=conversations[activeCid]||[];
  document.getElementById('msgArea').innerHTML=
    '<div class="date-divider">Today</div>'
    +msgs.map(m=>{
      const c=contacts.find(x=>x.id===activeCid);
      return '<div class="msg-row'+(m.from==='me'?' mine':'')+'">'
        +(m.from!=='me'?'<div class="msg-av" style="background:'+c.color+'22;color:'+c.color+'">'+c.av+'</div>':'')
        +'<div><div class="bubble">'+m.text+'</div><div class="msg-time">'+m.time+'</div></div>'
        +(m.from==='me'?'<div class="msg-av" style="background:var(--primary-glow);color:var(--primary)">A</div>':'')
        +'</div>';
    }).join('');
  const area=document.getElementById('msgArea');
  area.scrollTop=area.scrollHeight;
}
function sendMsg(){
  const inp=document.getElementById('msgInput');
  const txt=inp.value.trim();
  if(!txt)return;
  const now=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  if(!conversations[activeCid])conversations[activeCid]=[];
  conversations[activeCid].push({from:'me',text:txt,time:now});
  contacts.find(c=>c.id===activeCid).preview=txt;
  inp.value='';
  renderMsgs();
  renderList();
  setTimeout(()=>{
    const replies=['Got it!','Sure thing 👍','Let me check and get back to you','Sounds great!','On it!'];
    conversations[activeCid].push({from:'them',text:replies[Math.floor(Math.random()*replies.length)],time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})});
    renderMsgs();
  },1200);
}
openChat(1);
</script>
</body>
</html>`;
// ─── 5. BLOG / CMS ────────────────────────────────────────────────────────────
const BLOG_CMS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ZATER — Blog CMS</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#f8f9fc;--surface:#fff;--border:#e2e6f0;--primary:#6c47ff;--primary-light:#ede9ff;--dark:#18181b;--text:#18181b;--muted:#6b7280;--success:#16a34a;--danger:#dc2626;--font:system-ui,sans-serif;}
body{font-family:var(--font);background:var(--bg);color:var(--text);min-height:100vh;display:flex;}
/* SIDEBAR */
.sidebar{width:230px;min-width:230px;background:var(--surface);border-right:1.5px solid var(--border);height:100vh;position:sticky;top:0;display:flex;flex-direction:column;padding:1.25rem .75rem;}
.sb-logo{font-size:1.2rem;font-weight:800;color:var(--dark);padding:.5rem .75rem;margin-bottom:1.25rem;}
.sb-logo span{color:var(--primary);}
.nav-section{font-size:.65rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;padding:.5rem .75rem .25rem;}
.nav-item{display:flex;align-items:center;gap:.7rem;padding:.6rem .75rem;border-radius:8px;cursor:pointer;font-size:.855rem;color:var(--muted);font-weight:500;margin-bottom:2px;transition:all .15s;}
.nav-item:hover{background:var(--primary-light);color:var(--primary);}
.nav-item.active{background:var(--primary-light);color:var(--primary);font-weight:600;}
.sb-footer{margin-top:auto;padding:.75rem;background:var(--bg);border-radius:10px;display:flex;align-items:center;gap:.75rem;}
.sb-av{width:34px;height:34px;background:var(--primary-light);color:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;}
.sb-name{font-size:.82rem;font-weight:600;}
.sb-role{font-size:.7rem;color:var(--muted);}
/* MAIN */
.main{flex:1;padding:2rem;overflow-y:auto;max-height:100vh;}
/* PAGES */
.page{display:none;}
.page.active{display:block;}
.top-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.75rem;}
.page-title{font-size:1.6rem;font-weight:700;}
.btn{padding:.6rem 1.2rem;border-radius:8px;border:none;font-size:.855rem;font-weight:600;cursor:pointer;transition:all .15s;}
.btn-primary{background:var(--primary);color:#fff;}
.btn-primary:hover{opacity:.88;}
.btn-outline{background:var(--surface);border:1.5px solid var(--border);color:var(--text);}
.btn-outline:hover{border-color:var(--primary);color:var(--primary);}
/* STATS */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;}
.stat{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:1.25rem;}
.stat-val{font-size:2rem;font-weight:700;color:var(--dark);}
.stat-label{font-size:.78rem;color:var(--muted);margin-top:.2rem;}
/* POSTS TABLE */
.card{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:1.5rem;}
.card-header{padding:1rem 1.25rem;border-bottom:1.5px solid var(--border);display:flex;align-items:center;gap:.75rem;}
.card-title{font-size:.95rem;font-weight:600;flex:1;}
.filter-tabs{display:flex;gap:.25rem;}
.filter-tab{padding:.3rem .75rem;border-radius:6px;border:none;background:transparent;font-size:.78rem;font-weight:500;cursor:pointer;color:var(--muted);}
.filter-tab.active{background:var(--primary-light);color:var(--primary);}
table{width:100%;border-collapse:collapse;}
th{text-align:left;padding:.65rem 1.25rem;font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;border-bottom:1.5px solid var(--border);background:var(--bg);}
td{padding:.9rem 1.25rem;border-bottom:1px solid var(--border);font-size:.855rem;vertical-align:middle;}
tr:last-child td{border-bottom:none;}
.post-thumb{width:40px;height:40px;border-radius:8px;object-fit:cover;background:var(--primary-light);display:flex;align-items:center;justify-content:center;font-size:1.1rem;}
.badge{display:inline-flex;padding:.22rem .7rem;border-radius:20px;font-size:.7rem;font-weight:600;}
.badge-published{background:#dcfce7;color:#16a34a;}
.badge-draft{background:#fef9c3;color:#b45309;}
.badge-scheduled{background:#e0e7ff;color:#4338ca;}
.action-btns{display:flex;gap:.4rem;}
.action-btn{padding:.3rem .6rem;border-radius:6px;border:1.5px solid var(--border);background:transparent;font-size:.75rem;cursor:pointer;color:var(--muted);}
.action-btn:hover{border-color:var(--primary);color:var(--primary);}
/* EDITOR */
.editor-wrap{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;overflow:hidden;}
.editor-toolbar{padding:.75rem 1.25rem;border-bottom:1.5px solid var(--border);display:flex;gap:.4rem;flex-wrap:wrap;}
.tool-btn{width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;font-size:.875rem;display:flex;align-items:center;justify-content:center;}
.tool-btn:hover{background:var(--primary-light);border-color:var(--primary);}
.editor-meta{padding:1.25rem;border-bottom:1.5px solid var(--border);display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;}
.form-label{display:block;font-size:.7rem;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:.35rem;}
.form-input,.form-select{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:.6rem .8rem;font-size:.855rem;color:var(--text);outline:none;}
.form-input:focus,.form-select:focus{border-color:var(--primary);}
.editor-title{width:100%;font-size:1.6rem;font-weight:700;border:none;outline:none;background:transparent;color:var(--dark);padding:1.25rem 1.25rem .5rem;}
.editor-title::placeholder{color:var(--muted);}
.editor-body{width:100%;min-height:220px;border:none;outline:none;background:transparent;color:var(--text);padding:.5rem 1.25rem 1.25rem;font-size:.95rem;line-height:1.7;resize:none;}
.editor-actions{padding:1rem 1.25rem;border-top:1.5px solid var(--border);display:flex;gap:.75rem;justify-content:flex-end;}
</style>
</head>
<body>

<div class="sidebar">
  <div class="sb-logo">ZA<span>T</span>ER CMS</div>
  <div class="nav-section">Content</div>
  <div class="nav-item active" onclick="showPage('dashboard',this)">📊 Dashboard</div>
  <div class="nav-item" onclick="showPage('posts',this)">📝 All Posts</div>
  <div class="nav-item" onclick="showPage('editor',this)">✏️ New Post</div>
  <div class="nav-section">Manage</div>
  <div class="nav-item" onclick="showPage('categories',this)">🏷️ Categories</div>
  <div class="nav-item" onclick="alert('Media library coming soon')">🖼️ Media</div>
  <div class="nav-item" onclick="alert('Settings coming soon')">⚙️ Settings</div>
  <div class="sb-footer">
    <div class="sb-av">V</div>
    <div><div class="sb-name">Vaishiva</div><div class="sb-role">Editor-in-Chief</div></div>
  </div>
</div>

<div class="main">

  <!-- DASHBOARD -->
  <div class="page active" id="page-dashboard">
    <div class="top-row">
      <div class="page-title">Dashboard</div>
      <button class="btn btn-primary" onclick="showPage('editor',document.querySelector('[onclick*=editor]'))">+ New Post</button>
    </div>
    <div class="stats-row">
      <div class="stat"><div class="stat-val">24</div><div class="stat-label">Total Posts</div></div>
      <div class="stat"><div class="stat-val">18</div><div class="stat-label">Published</div></div>
      <div class="stat"><div class="stat-val">4</div><div class="stat-label">Drafts</div></div>
      <div class="stat"><div class="stat-val">12.4k</div><div class="stat-label">Total Views</div></div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Recent Posts</div></div>
      <table>
        <thead><tr><th>Post</th><th>Category</th><th>Status</th><th>Views</th><th>Date</th></tr></thead>
        <tbody id="dashPosts"></tbody>
      </table>
    </div>
  </div>

  <!-- ALL POSTS -->
  <div class="page" id="page-posts">
    <div class="top-row">
      <div class="page-title">All Posts</div>
      <button class="btn btn-primary" onclick="showPage('editor',document.querySelector('[onclick*=editor]'))">+ New Post</button>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Posts</div>
        <div class="filter-tabs">
          <button class="filter-tab active">All</button>
          <button class="filter-tab">Published</button>
          <button class="filter-tab">Drafts</button>
        </div>
      </div>
      <table>
        <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Views</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody id="allPosts"></tbody>
      </table>
    </div>
  </div>

  <!-- EDITOR -->
  <div class="page" id="page-editor">
    <div class="top-row">
      <div class="page-title">New Post</div>
      <button class="btn btn-outline" onclick="showPage('posts',document.querySelector('[onclick*=posts]'))">← Back</button>
    </div>
    <div class="editor-wrap">
      <div class="editor-toolbar">
        <button class="tool-btn" title="Bold"><b>B</b></button>
        <button class="tool-btn" title="Italic"><i>I</i></button>
        <button class="tool-btn" title="Underline"><u>U</u></button>
        <button class="tool-btn">H1</button>
        <button class="tool-btn">H2</button>
        <button class="tool-btn">🔗</button>
        <button class="tool-btn">📷</button>
        <button class="tool-btn">—</button>
        <button class="tool-btn">•≡</button>
        <button class="tool-btn">1≡</button>
      </div>
      <div class="editor-meta">
        <div>
          <label class="form-label">Category</label>
          <select class="form-select">
            <option>Technology</option><option>Design</option><option>Business</option>
            <option>Tutorial</option><option>News</option>
          </select>
        </div>
        <div>
          <label class="form-label">Status</label>
          <select class="form-select">
            <option>Draft</option><option>Published</option><option>Scheduled</option>
          </select>
        </div>
        <div>
          <label class="form-label">Publish Date</label>
          <input type="date" class="form-input"/>
        </div>
      </div>
      <input class="editor-title" placeholder="Post title…" id="postTitle"/>
      <textarea class="editor-body" placeholder="Start writing your post…" id="postBody"></textarea>
      <div class="editor-actions">
        <button class="btn btn-outline">Save Draft</button>
        <button class="btn btn-primary" onclick="publishPost()">Publish Post</button>
      </div>
    </div>
  </div>

  <!-- CATEGORIES -->
  <div class="page" id="page-categories">
    <div class="top-row">
      <div class="page-title">Categories</div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">All Categories</div></div>
      <table>
        <thead><tr><th>Name</th><th>Posts</th><th>Views</th></tr></thead>
        <tbody>
          <tr><td>Technology</td><td>8</td><td>4,210</td></tr>
          <tr><td>Design</td><td>5</td><td>2,890</td></tr>
          <tr><td>Business</td><td>4</td><td>1,740</td></tr>
          <tr><td>Tutorial</td><td>4</td><td>2,100</td></tr>
          <tr><td>News</td><td>3</td><td>1,460</td></tr>
        </tbody>
      </table>
    </div>
  </div>

</div>

<script>
const posts=[
  {emoji:'🚀',title:'Getting Started with React 19',cat:'Technology',status:'published',views:'2,341',date:'Jun 1, 2025'},
  {emoji:'🎨',title:'UI Design Trends for 2025',cat:'Design',status:'published',views:'1,892',date:'May 28, 2025'},
  {emoji:'💡',title:'Building Your First SaaS Product',cat:'Business',status:'published',views:'1,540',date:'May 22, 2025'},
  {emoji:'🔧',title:'Node.js Best Practices Guide',cat:'Tutorial',status:'draft',views:'—',date:'May 18, 2025'},
  {emoji:'📱',title:'Mobile-First Design Principles',cat:'Design',status:'scheduled',views:'—',date:'Jun 10, 2025'},
  {emoji:'⚡',title:'Vite vs Webpack in 2025',cat:'Technology',status:'published',views:'987',date:'May 15, 2025'},
];
function badgeHtml(s){
  const map={published:'badge-published',draft:'badge-draft',scheduled:'badge-scheduled'};
  return '<span class="badge '+map[s]+'">'+s+'</span>';
}
function renderDash(){
  document.getElementById('dashPosts').innerHTML=posts.slice(0,4).map(p=>
    '<tr><td><div style="display:flex;align-items:center;gap:.75rem"><div class="post-thumb">'+p.emoji+'</div><span style="font-weight:500">'+p.title+'</span></div></td>'
    +'<td style="color:var(--muted)">'+p.cat+'</td><td>'+badgeHtml(p.status)+'</td><td>'+p.views+'</td><td style="color:var(--muted)">'+p.date+'</td></tr>'
  ).join('');
}
function renderAll(){
  document.getElementById('allPosts').innerHTML=posts.map(p=>
    '<tr><td><div style="display:flex;align-items:center;gap:.75rem"><div class="post-thumb">'+p.emoji+'</div><span style="font-weight:500">'+p.title+'</span></div></td>'
    +'<td style="color:var(--muted)">'+p.cat+'</td><td>'+badgeHtml(p.status)+'</td><td>'+p.views+'</td><td style="color:var(--muted)">'+p.date+'</td>'
    +'<td><div class="action-btns"><button class="action-btn" onclick="alert(\'Edit post\')">Edit</button><button class="action-btn" onclick="alert(\'Delete?\')">Delete</button></div></td></tr>'
  ).join('');
}
function showPage(id,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(el)el.classList.add('active');
}
function publishPost(){
  const t=document.getElementById('postTitle').value.trim();
  if(!t){alert('Please enter a title');return;}
  posts.unshift({emoji:'📄',title:t,cat:'Technology',status:'published',views:'0',date:'Just now'});
  renderDash();renderAll();
  alert('Post published: '+t);
  showPage('posts',document.querySelector('[onclick*=posts]'));
}
renderDash();renderAll();
</script>
</body>
</html>`;
// ── Register on window for Home.jsx modal to access ──────────────────────────
window.ZATER_APP_HTML = {
  'user-management': USER_MANAGEMENT_HTML,
  'chat-app':        CHAT_APP_HTML,       // ← new
  'blog-cms':        BLOG_CMS_HTML,       // ← new
  'appointment':     APPOINTMENT_HTML,
}

console.log('[ZWS] App templates loaded:', Object.keys(window.ZATER_APP_HTML))
