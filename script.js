let currentThemeIndex = parseInt(localStorage.getItem('fadyy_theme_index')) || 0;
let weatherCity = localStorage.getItem('fadyy_weather_city') || '';

const themes = [
    {
        "--bg-color": "#0a0c10",
        "--accent": "#38bdf8",
        "--bg-image": "url('images/bg1.jpg?v=10')"
    },
    {
        "--bg-color": "#050805",
        "--accent": "#4ade80",
        "--bg-image": "url('images/bg2.jpg?v=10')"
    },
    {
        "--bg-color": "#0f0514",
        "--accent": "#c084fc",
        "--bg-image": "url('images/bg3.jpg?v=10')"
    },
    {
        "--bg-color": "#150505",
        "--accent": "#ff003c",
        "--bg-image": "url('images/bg4.jpg?v=10')"
    }
];

const quotes = [
    { text: "The best revenge is to be unlike him who performed the injury.", author: "Marcus Aurelius" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "A fit body, a calm mind, a house full of love. These things cannot be bought - they must be earned.", author: "Naval Ravikant" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.", author: "Socrates" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.", author: "Heraclitus" },
    { text: "Life is very simple, but we insist on making it complicated.", author: "Confucius" }
];

function applyTheme(index) {
    const theme = themes[index];
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

function focusSearchInput(force = false) {
    const activeElement = document.activeElement;
    const isTypingField = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
    );

    if (!force && isTypingField && activeElement.id !== 'search-input') {
        return;
    }

    document.getElementById('search-input').focus({ preventScroll: true });
}

function handleGlobalSearchFocus(event) {
    const activeElement = document.activeElement;
    const isTypingField = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
    );

    if (isTypingField || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
        return;
    }

    const searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.value += event.key;
    event.preventDefault();
}

function updateStatus() {
    const cpu = document.getElementById('cpu-load');
    const mem = document.getElementById('mem-usage');
    
    cpu.textContent = `${Math.floor(Math.random() * 15) + 5}%`;
    mem.textContent = `${(Math.random() * 2 + 4).toFixed(1)}GB`;
}

function getWeatherUrl() {
    const cityPath = weatherCity ? `${encodeURIComponent(weatherCity)}/` : '';
    return `https://wttr.in/${cityPath}?format=j1`;
}

function showCachedWeather() {
    let cachedWeather = null;

    try {
        cachedWeather = JSON.parse(localStorage.getItem('fadyy_weather_cache') || 'null');
    } catch {
        localStorage.removeItem('fadyy_weather_cache');
    }

    if (cachedWeather && cachedWeather.text) {
        document.getElementById('weather').textContent = cachedWeather.text;
    }
}

function fetchWeather() {
    const weatherElement = document.getElementById('weather');
    fetch(getWeatherUrl())
        .then(response => response.json())
        .then(data => {
            const current = data.current_condition[0];
            const city = data.nearest_area[0].areaName[0].value;
            const tempF = current.temp_F;
            const weatherText = `${city}: ${tempF} F`;
            weatherElement.textContent = weatherText;
            localStorage.setItem('fadyy_weather_cache', JSON.stringify({
                text: weatherText,
                updatedAt: Date.now()
            }));
        })
        .catch(err => {
            console.error('Weather fetch failed', err);
            if (!weatherElement.textContent || weatherElement.textContent === 'Loading...') {
                weatherElement.textContent = 'Weather Unavailable';
            }
        });
}

function getTodos() {
    const rawTodos = JSON.parse(localStorage.getItem('fadyy_todos') || '[]');
    return rawTodos.map(todo => {
        if (typeof todo === 'string') {
            return { text: todo, completed: false };
        }

        return {
            text: todo.text || '',
            completed: Boolean(todo.completed)
        };
    }).filter(todo => todo.text);
}

function saveTodos(todos) {
    localStorage.setItem('fadyy_todos', JSON.stringify(todos));
}

function loadTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = getTodos();
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        const row = document.createElement('div');
        const checkbox = document.createElement('input');
        const text = document.createElement('span');
        const deleteButton = document.createElement('button');

        row.className = 'todo-row';
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));

        text.className = `todo-text${todo.completed ? ' completed' : ''}`;
        text.textContent = todo.text;

        deleteButton.type = 'button';
        deleteButton.className = 'todo-delete';
        deleteButton.textContent = 'x';
        deleteButton.setAttribute('aria-label', `Delete ${todo.text}`);
        deleteButton.addEventListener('click', () => deleteTodo(index));

        row.append(checkbox, text);
        li.append(row, deleteButton);
        todoList.appendChild(li);
    });
    saveTodos(todos);
}

function addTodo(event) {
    if (event.key === 'Enter' && event.target.value.trim()) {
        const todos = getTodos();
        todos.push({ text: event.target.value.trim(), completed: false });
        saveTodos(todos);
        event.target.value = '';
        loadTodos();
    }
}

function toggleTodo(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    loadTodos();
}

function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    loadTodos();
}

function saveWeatherCity() {
    const weatherInput = document.getElementById('weather-city-input');
    const nextCity = weatherInput.value.trim();

    if (nextCity === weatherCity) {
        return;
    }

    weatherCity = nextCity;
    localStorage.setItem('fadyy_weather_city', weatherCity);
    document.getElementById('weather').textContent = 'Loading...';
    fetchWeather();
}

function initSettings() {
    const weatherInput = document.getElementById('weather-city-input');

    weatherInput.value = weatherCity;
    weatherInput.addEventListener('blur', saveWeatherCity);
    weatherInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            saveWeatherCity();
            focusSearchInput(true);
        }
    });
}

function displayQuote() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quote = quotes[dayOfYear % quotes.length];
    document.getElementById('quote-text').textContent = `"${quote.text}"`;
    document.getElementById('quote-author').textContent = `- ${quote.author}`;
}

// Initial calls
applyTheme(currentThemeIndex);
initSettings();
updateTime();
updateStatus();
loadTodos();
showCachedWeather();
fetchWeather();
displayQuote();

setInterval(updateTime, 1000);
setInterval(updateStatus, 3000);
setInterval(fetchWeather, 600000);

document.getElementById('search-input').addEventListener('keydown', handleSearch);
document.getElementById('todo-input').addEventListener('keydown', addTodo);
document.addEventListener('keydown', handleGlobalSearchFocus);
window.addEventListener('pageshow', () => setTimeout(focusSearchInput, 0));
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(focusSearchInput, 0);
    }
});
setTimeout(focusSearchInput, 0);
setTimeout(focusSearchInput, 250);

const greeting = document.getElementById('greeting');
const hour = new Date().getHours();
if (hour < 12) greeting.textContent = 'Good morning, Fady';
else if (hour < 18) greeting.textContent = 'Good afternoon, Fady';
else greeting.textContent = 'Good evening, Fady';
