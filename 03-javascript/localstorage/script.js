// ====================================
// Day 9 - 笔记应用 (localStorage 实战)
// ====================================

// ========== 1. 数据模型 ==========
let notes = [];  // 存储所有笔记

// ========== 2. localStorage 操作 ==========
// 保存数据到 localStorage
function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// 从 localStorage 加载数据
function loadFromLocalStorage() {
    const stored = localStorage.getItem('notes');
    if (stored) {
        notes = JSON.parse(stored);
    } else {
        // 如果没有数据，添加示例笔记
        notes = [
            {
                id: Date.now(),
                title: '欢迎使用笔记应用！',
                content: '这是第一条示例笔记。你可以添加、编辑、删除笔记，所有数据都会自动保存到浏览器中。刷新页面也不会丢失！',
                date: new Date().toLocaleString()
            },
            {
                id: Date.now() + 1,
                title: '使用提示',
                content: '1. 点击"编辑"可以修改笔记\n2. 点击"删除"可以移除笔记\n3. 使用搜索框可以快速查找笔记\n4. 所有更改会自动保存',
                date: new Date().toLocaleString()
            }
        ];
        saveToLocalStorage();
    }
}

// ========== 3. 渲染笔记列表 ==========
function renderNotes() {
    const notesListDiv = document.getElementById('notesList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // 过滤笔记
    let filteredNotes = notes;
    if (searchTerm) {
        filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm)
        );
    }

    // 更新统计
    document.getElementById('totalCount').textContent = filteredNotes.length;

    // 空状态
    if (filteredNotes.length === 0) {
        notesListDiv.innerHTML = `
            <div class="empty-state">
                <p>📭 暂无笔记</p>
                <small>点击上方"添加笔记"开始记录吧！</small>
            </div>
        `;
        return;
    }

    // 渲染笔记卡片
    notesListDiv.innerHTML = filteredNotes.map(note => `
        <div class="note-card" data-id="${note.id}">
            <div class="note-title">${escapeHtml(note.title)}</div>
            <div class="note-content">${escapeHtml(note.content).replace(/\n/g, '<br>')}</div>
            <div class="note-date">
                <span>📅 ${note.date}</span>
                <div class="note-actions">
                    <button class="btn-edit" onclick="editNote(${note.id})">✏️ 编辑</button>
                    <button class="btn-delete" onclick="deleteNote(${note.id})">🗑️ 删除</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 防止 XSS 攻击的简单转义函数
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ========== 4. 添加笔记 ==========
function addNote() {
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) {
        alert('请输入笔记标题！');
        return;
    }

    const newNote = {
        id: Date.now(),
        title: title,
        content: content || '（无内容）',
        date: new Date().toLocaleString()
    };

    notes.unshift(newNote);  // 添加到开头
    saveToLocalStorage();
    renderNotes();

    // 清空输入框
    titleInput.value = '';
    contentInput.value = '';

    // 显示成功提示（可选）
    showToast('✅ 笔记已添加');
}

// ========== 5. 删除笔记 ==========
function deleteNote(id) {
    if (confirm('确定要删除这条笔记吗？')) {
        notes = notes.filter(note => note.id !== id);
        saveToLocalStorage();
        renderNotes();
        showToast('🗑️ 笔记已删除');
    }
}

// ========== 6. 编辑笔记 ==========
function editNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    // 找到对应的卡片元素
    const card = document.querySelector(`.note-card[data-id="${id}"]`);
    if (!card) return;

    // 保存原始内容（用于取消编辑）
    const originalTitle = note.title;
    const originalContent = note.content;

    // 替换卡片内容为编辑表单
    card.innerHTML = `
        <div class="edit-form">
            <input type="text" id="editTitle-${id}" class="edit-input" value="${escapeHtml(note.title)}">
            <textarea id="editContent-${id}" class="edit-textarea" rows="4">${escapeHtml(note.content)}</textarea>
            <div class="edit-actions">
                <button class="btn-primary" onclick="saveEdit(${id})">💾 保存</button>
                <button class="btn-danger" onclick="cancelEdit(${id}, '${escapeHtml(originalTitle)}', '${escapeHtml(originalContent)}')">❌ 取消</button>
            </div>
        </div>
    `;

    card.classList.add('editing');
}

// 保存编辑
function saveEdit(id) {
    const newTitle = document.getElementById(`editTitle-${id}`).value.trim();
    const newContent = document.getElementById(`editContent-${id}`).value;

    if (!newTitle) {
        alert('标题不能为空！');
        return;
    }

    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title: newTitle,
            content: newContent || '（无内容）',
            date: new Date().toLocaleString() + ' (已编辑)'
        };
        saveToLocalStorage();
        renderNotes();
        showToast('✏️ 笔记已更新');
    }
}

// 取消编辑
function cancelEdit(id, originalTitle, originalContent) {
    // 重新渲染（恢复到原始状态）
    renderNotes();
}

// ========== 7. 清空所有笔记 ==========
function clearAllNotes() {
    if (notes.length === 0) {
        showToast('📭 已经没有笔记了');
        return;
    }

    if (confirm('⚠️ 确定要删除所有笔记吗？此操作不可撤销！')) {
        notes = [];
        saveToLocalStorage();
        renderNotes();
        showToast('🗑️ 所有笔记已清空');
    }
}

// ========== 8. 搜索功能 ==========
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        renderNotes();
    });
}

// ========== 9. 提示消息（轻提示） ==========
function showToast(message) {
    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 30px;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    `;

    document.body.appendChild(toast);

    // 淡入
    setTimeout(() => { toast.style.opacity = '1'; }, 10);

    // 2秒后淡出并移除
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 2000);
}

// ========== 10. 初始化应用 ==========
function init() {
    // 加载数据
    loadFromLocalStorage();

    // 渲染笔记
    renderNotes();

    // 绑定事件
    document.getElementById('addBtn').addEventListener('click', addNote);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllNotes);

    // 回车键添加（在标题输入框）
    document.getElementById('noteTitle').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNote();
        }
    });

    // 搜索功能
    setupSearch();

    // 显示启动提示
    console.log('✅ 笔记应用已启动！');
}

// 将函数挂载到 window 上，供 HTML 调用
window.editNote = editNote;
window.deleteNote = deleteNote;
window.saveEdit = saveEdit;
window.cancelEdit = cancelEdit;

// 启动应用
init();