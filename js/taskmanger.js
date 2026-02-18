  // --- Navigation Logic ---
  function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('link-' + id.replace('Section','')).classList.add('active');
}


// --- Live Clock ---
setInterval(() => { document.getElementById('liveTime').textContent = new Date().toLocaleTimeString(); }, 1000);


// --- Todo & Notes (Data) ---
let tasks = JSON.parse(localStorage.getItem('tasks_v3')) || [];
function renderTasks() {

    const list = document.getElementById('taskList'); list.innerHTML = "";
    tasks.forEach((t, i) => {
        list.innerHTML += `<div style="display:flex; align-items:center; padding:12px; background:#f8fafc; border:1px solid #eee; border-radius:12px; margin-bottom:8px;">
            <span>${t}</span>
            <button onclick="tasks.splice(${i},1); saveT();" style="margin-left:auto; border:none; color:red; cursor:pointer; background:none;"><i class="fa-solid fa-trash"></i></button>`;
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function clearTasks() { tasks.splice(0, tasks.length); saveT(); }
function addTask() { const inp = document.getElementById('taskInput'); if(inp.value){ tasks.push(inp.value); inp.value=""; saveT(); } }
function saveT() { localStorage.setItem('tasks_v3', JSON.stringify(tasks)); renderTasks(); }


let notes = JSON.parse(localStorage.getItem('notes_v3')) || [];
function renderNotes() {
    const grid = document.getElementById('notesGrid'); grid.innerHTML = "";
    notes.forEach((n, i) => {
        grid.innerHTML += `<div class="card" style="padding:15px;"><p>${n}</p><button onclick="notes.splice(${i},1); saveN();" style="margin-top:10px; border:none; color:red; cursor:pointer; background:none;">Delete</button></div>`;
    });
}

function addNote() { const inp = document.getElementById('noteInput'); if(inp.value){ notes.unshift(inp.value); inp.value=""; saveN(); } }
function saveN() { localStorage.setItem('notes_v3', JSON.stringify(notes)); renderNotes(); }


// --- Pomodoro Logic ---
let pomoInterval, pomoSeconds = 1500, isPomoRunning = false, pomoBase = 25;
function updatePomoDisplay() {
    const m = Math.floor(pomoSeconds / 60), s = pomoSeconds % 60;
    document.getElementById('pomoDisplay').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function setPomoMode(mins, btn) {
    clearInterval(pomoInterval); isPomoRunning = false; pomoBase = mins; pomoSeconds = mins * 60;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    document.getElementById('pomoStartBtn').textContent = "Start Focus"; updatePomoDisplay();
}

function togglePomo() {
    if(!isPomoRunning) {
        pomoInterval = setInterval(() => {
            pomoSeconds--; updatePomoDisplay();
            if(pomoSeconds <= 0) { clearInterval(pomoInterval); alert("Time's up! Take a break."); resetPomo(); }
        }, 1000);
        document.getElementById('pomoStartBtn').textContent = "Pause";
    } else { clearInterval(pomoInterval); document.getElementById('pomoStartBtn').textContent = "Resume"; }
    isPomoRunning = !isPomoRunning;
}

function resetPomo() { clearInterval(pomoInterval); isPomoRunning = false; pomoSeconds = pomoBase * 60; updatePomoDisplay(); document.getElementById('pomoStartBtn').textContent = "Start Focus"; }

// --- Custom Timer Logic ---
let cInterval, cSeconds = 600, isCRunning = false;
function updateCDisplay() {
    const m = Math.floor(cSeconds / 60), s = cSeconds % 60;
    document.getElementById('customTimerDisplay').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function toggleCustomTimer() {
    if(!isCRunning) {
        if(cSeconds === 600) cSeconds = parseInt(document.getElementById('customMin').value) * 60;
        cInterval = setInterval(() => {
            cSeconds--; updateCDisplay();
            if(cSeconds <= 0) { clearInterval(cInterval); alert("Timer Finished!"); resetCustomTimer(); }
        }, 1000);
        document.getElementById('customTimerBtn').textContent = "Pause";
    } else { clearInterval(cInterval); document.getElementById('customTimerBtn').textContent = "Resume"; }
    isCRunning = !isCRunning;
}
function resetCustomTimer() { clearInterval(cInterval); isCRunning = false; cSeconds = parseInt(document.getElementById('customMin').value) * 60; updateCDisplay(); document.getElementById('customTimerBtn').textContent = "Start Timer"; }


// --- Calendar Logic ---
let d = new Date(), currM = d.getMonth(), currY = d.getFullYear();
function renderCal() {
    const grid = document.getElementById('calendarGrid'); grid.innerHTML = "";
    document.getElementById('monthLabel').textContent = new Intl.DateTimeFormat('en-US', {month:'long', year:'numeric'}).format(new Date(currY, currM));
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(h => grid.innerHTML += `<div class="day-header">${h}</div>`);
    let first = new Date(currY, currM, 1).getDay(), days = new Date(currY, currM + 1, 0).getDate();
    for(let i=0; i<first; i++) grid.innerHTML += `<div></div>`;
    for(let i=1; i<=days; i++) {
        const isToday = i === d.getDate() && currM === d.getMonth() && currY === d.getFullYear();
        grid.innerHTML += `<div class="day ${isToday ? 'today' : ''}">${i}</div>`;
    }
}
function moveMonth(v) { currM += v; if(currM<0){currM=11; currY--;} if(currM>11){currM=0; currY++;} renderCal(); }

// Start
renderTasks(); renderNotes(); renderCal(); updatePomoDisplay(); updateCDisplay();