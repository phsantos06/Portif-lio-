import type { ProjectCode } from "./types";

export const taskManagerCode: ProjectCode = {
  slug: "task-manager",
  title: "Sistema de Gestão de Tarefas",
  files: [
    {
      name: "index.html",
      language: "html",
      content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskFlow - Gestão de Tarefas</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none">
          <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2"/>
          <path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke="currentColor" stroke-width="2"/>
        </svg>
        <h1>TaskFlow</h1>
      </div>
      <div class="header-stats">
        <span class="stat-item">
          <span class="stat-value" id="totalTasks">0</span>
          <span class="stat-label">Total</span>
        </span>
        <span class="stat-item">
          <span class="stat-value" id="pendingTasks">0</span>
          <span class="stat-label">Pendentes</span>
        </span>
        <span class="stat-item">
          <span class="stat-value" id="doneTasks">0</span>
          <span class="stat-label">Concluídas</span>
        </span>
      </div>
    </header>

    <main class="main-content">
      <section class="task-form-section">
        <h2 class="section-title">Nova Tarefa</h2>
        <form id="taskForm" class="task-form">
          <div class="form-group">
            <input
              type="text"
              id="taskTitle"
              placeholder="O que você precisa fazer?"
              required
              autocomplete="off"
            />
          </div>
          <div class="form-row">
            <select id="taskPriority" class="form-select">
              <option value="baixa">Baixa Prioridade</option>
              <option value="media" selected>Média Prioridade</option>
              <option value="alta">Alta Prioridade</option>
            </select>
            <button type="submit" class="btn-add">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2"/>
              </svg>
              Adicionar
            </button>
          </div>
        </form>
      </section>

      <section class="tasks-section">
        <div class="tasks-header">
          <h2 class="section-title">Minhas Tarefas</h2>
          <div class="filter-tabs" id="filterTabs">
            <button class="filter-tab active" data-filter="todas">Todas</button>
            <button class="filter-tab" data-filter="pendente">Pendentes</button>
            <button class="filter-tab" data-filter="andamento">Em Andamento</button>
            <button class="filter-tab" data-filter="concluida">Concluídas</button>
          </div>
        </div>
        <div class="tasks-list" id="tasksList">
          <!-- Tarefas renderizadas dinamicamente via JavaScript -->
        </div>
        <div class="empty-state" id="emptyState">
          <svg viewBox="0 0 24 24" fill="none" class="empty-icon">
            <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <p>Nenhuma tarefa encontrada</p>
          <span>Comece adicionando uma nova tarefa acima</span>
        </div>
      </section>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
    },
    {
      name: "styles.css",
      language: "css",
      content: `/* ===== CSS Custom Properties ===== */
:root {
  --bg-primary: #0f1117;
  --bg-secondary: #161822;
  --bg-card: #1a1d2e;
  --bg-card-hover: #1f2338;
  --border-color: rgba(255, 255, 255, 0.06);
  --text-primary: #e8eaed;
  --text-secondary: #9aa0a6;
  --text-muted: #5f6368;
  --accent: #6366f1;
  --accent-hover: #818cf8;
  --accent-glow: rgba(99, 102, 241, 0.15);
  --success: #34d399;
  --warning: #fbbf24;
  --danger: #f87171;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== Reset & Base ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

/* ===== Header ===== */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 2rem;
}

.logo { display: flex; align-items: center; gap: 0.75rem; }
.logo-icon { width: 28px; height: 28px; color: var(--accent); }
.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ===== Task Card ===== */
.task-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all var(--transition);
  animation: slideIn 300ms ease-out;
}
.task-card:hover {
  background: var(--bg-card-hover);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}
.task-card.completed { opacity: 0.6; }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Priority Badges ===== */
.priority-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.priority-badge.baixa { background: rgba(52, 211, 153, 0.1); color: var(--success); }
.priority-badge.media { background: rgba(251, 191, 36, 0.1); color: var(--warning); }
.priority-badge.alta { background: rgba(248, 113, 113, 0.1); color: var(--danger); }

/* ===== Form ===== */
.task-form-section { margin-bottom: 2rem; }
.section-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; }

#taskTitle {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: border-color var(--transition);
}
#taskTitle:focus { outline: none; border-color: var(--accent); }

.form-row {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.form-select {
  flex: 1;
  padding: 0.65rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background var(--transition);
}
.btn-add:hover { background: var(--accent-hover); }
.btn-add svg { width: 18px; height: 18px; }

/* ===== Filter Tabs ===== */
.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.filter-tabs { display: flex; gap: 0.25rem; }
.filter-tab {
  padding: 0.35rem 0.85rem;
  background: transparent;
  border: none;
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}
.filter-tab.active {
  background: var(--accent-glow);
  color: var(--accent);
}
.filter-tab:hover:not(.active) { color: var(--text-primary); }

/* ===== Empty State ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
  text-align: center;
}
.empty-icon { width: 48px; height: 48px; margin-bottom: 1rem; }

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .app-container { padding: 1rem; }
  .app-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .form-row { flex-direction: column; }
  .tasks-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
}`,
    },
    {
      name: "app.js",
      language: "javascript",
      content: `/**
 * TaskFlow - Gerenciador de Tarefas
 * CRUD completo com persistência em Local Storage
 */

// ===== Estado da aplicação =====
const STORAGE_KEY = 'taskflow_tasks';
let tasks = [];
let currentFilter = 'todas';

// ===== Elementos DOM =====
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskPriority = document.getElementById('taskPriority');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const filterTabs = document.getElementById('filterTabs');
const totalTasksEl = document.getElementById('totalTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const doneTasksEl = document.getElementById('doneTasks');

// ===== Persistência =====
function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    tasks = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
}

// ===== Gerenciamento de Tarefas =====
function addTask(title, priority = 'media') {
  const task = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    title: title.trim(),
    priority,
    status: 'pendente',
    createdAt: new Date().toISOString(),
  };
  tasks.unshift(task);
  saveTasks();
  render();
}

function updateTaskStatus(id, status) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = status;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// ===== Filtro e renderização =====
function getFilteredTasks() {
  if (currentFilter === 'todas') return tasks;
  return tasks.filter(t => t.status === currentFilter);
}

function updateStats() {
  totalTasksEl.textContent = tasks.length;
  pendingTasksEl.textContent = tasks.filter(t => t.status === 'pendente').length;
  doneTasksEl.textContent = tasks.filter(t => t.status === 'concluida').length;
}

function render() {
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    tasksList.innerHTML = '';
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
    tasksList.innerHTML = filtered.map(task => \`
      <div class="task-card \${task.status === 'concluida' ? 'completed' : ''}">
        <input type="checkbox" class="task-checkbox"
          \${task.status === 'concluida' ? 'checked' : ''}
          onchange="updateTaskStatus('\${task.id}', '\${task.status === 'concluida' ? 'pendente' : 'concluida'}')" />
        <div class="task-content">
          <span class="task-title">\${escapeHtml(task.title)}</span>
          <div class="task-meta">
            <span class="priority-badge \${task.priority}">\${task.priority}</span>
            <span class="status-badge \${task.status}">\${getStatusLabel(task.status)}</span>
          </div>
        </div>
        <button class="btn-delete" onclick="deleteTask('\${task.id}')" aria-label="Excluir">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M19 7L18.1 18.1C17.9 19.7 17 20 16 20H8C7.4 20 6.2 19.7 5.9 18.1L5 7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10 11V17M14 11V17" stroke="currentColor" stroke-width="1.5"/>
            <path d="M3 7H21" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
    \`).join('');
  }
  updateStats();
}

// ===== Utilitários =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getStatusLabel(status) {
  const labels = { pendente: 'Pendente', andamento: 'Em Andamento', concluida: 'Concluída' };
  return labels[status] || status;
}

// ===== Event Listeners =====
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  if (!title || title.length < 3) return;
  addTask(title, taskPriority.value);
  taskTitle.value = '';
  taskTitle.focus();
});

filterTabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  currentFilter = tab.dataset.filter;
  render();
});

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  render();
});`,
    },
  ],
};