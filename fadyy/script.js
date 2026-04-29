let currentThemeIndex = parseInt(localStorage.getItem('fadyy_theme_index')) || 0;

const themes = [
    {
        "--bg-color": "#0a0a0c",
        "--accent": "#bb9af7",
        "--bg-image": "url('bg1.png?v=5')"
    },
    {
        "--bg-color": "#050505",
        "--accent": "#ffffff",
        "--bg-image": "url('bg2.png?v=5')"
    },
    {
        "--bg-color": "#051105",
        "--accent": "#73daca",
        "--bg-image": "url('bg3.png?v=5')"
    },
    {
        "--bg-color": "#0a0514",
        "--accent": "#bb9af7",
        "--bg-image": "url('bg4.png?v=5')"
    }
];







function applyTheme(index) {
    const theme = themes[index];
    // Reset defaults first for themes that don't specify them
    document.documentElement.style.setProperty("--text-primary", "#ffffff");
    document.documentElement.style.setProperty("--text-secondary", "rgba(255, 255, 255, 0.6)");
    document.documentElement.style.setProperty("--glass-bg", "rgba(255, 255, 255, 0.03)");
    document.documentElement.style.setProperty("--glass-border", "rgba(255, 255, 255, 0.08)");
    
    for (const [property, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(property, value);
    }
}


function nextTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    localStorage.setItem('fadyy_theme_index', currentThemeIndex);
    applyTheme(currentThemeIndex);
}

function updateTime() {

    const clock = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value;
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
}

function updateStatus() {
    const cpu = document.getElementById('cpu-load');
    const mem = document.getElementById('mem-usage');
    
    cpu.textContent = `CPU: ${Math.floor(Math.random() * 15) + 5}%`;
    mem.textContent = `MEM: ${(Math.random() * 2 + 4).toFixed(1)}GB`;
}

function fetchWeather() {
    const weatherElement = document.getElementById('weather');
    // Using JSON format (j1) to get structured data safely
    fetch('https://wttr.in/?format=j1')
        .then(response => response.json())
        .then(data => {
            const current = data.current_condition[0];
            const city = data.nearest_area[0].areaName[0].value;
            const tempF = current.temp_F;
            weatherElement.textContent = `${city}: ${tempF}°F`;
        })
        .catch(err => {
            console.error('Weather fetch failed', err);
            weatherElement.textContent = 'Weather Unavailable';
        });
}





const todoInput = document.getElementById('todo-input');

const todoList = document.getElementById('todo-list');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('fadyy_todos')) || [];
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" class="todo-checkbox" onclick="deleteTodo(${index})">
                <span>${todo}</span>
            </div>
            <span class="todo-delete" onclick="deleteTodo(${index})">󰅖</span>
        `;
        todoList.appendChild(li);
    });
}


function addTodo(event) {
    if (event.key === 'Enter' && event.target.value.trim()) {
        const todos = JSON.parse(localStorage.getItem('fadyy_todos')) || [];
        todos.push(event.target.value.trim());
        localStorage.setItem('fadyy_todos', JSON.stringify(todos));
        event.target.value = '';
        loadTodos();
    }
}

function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('fadyy_todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('fadyy_todos', JSON.stringify(todos));
    loadTodos();
}

// Initial calls
applyTheme(currentThemeIndex);
updateTime();
updateStatus();
loadTodos();
fetchWeather();

setInterval(updateTime, 1000);
setInterval(updateStatus, 3000);
setInterval(fetchWeather, 600000); // Update weather every 10 minutes


document.getElementById('search-input').addEventListener('keydown', handleSearch);
todoInput.addEventListener('keydown', addTodo);

// Add a simple welcome message based on time of day
const greeting = document.getElementById('greeting');
const hour = new Date().getHours();
if (hour < 12) greeting.textContent = 'Good morning, Fady';
else if (hour < 18) greeting.textContent = 'Good afternoon, Fady';
else greeting.textContent = 'Good evening, Fady';

