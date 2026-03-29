// ====================================
// Day 11 - Vue.js 框架入门
// 完整的 Vue 笔记应用
// ====================================

// 创建 Vue 实例
new Vue({
    el: '#app',

    // 数据
    data: {
        // 基础演示数据
        message: 'Hello Vue!',
        show: true,
        visible: true,
        fruits: ['苹果', '香蕉', '橘子', '葡萄'],
        newFruit: '',

        // 笔记数据
        newNote: {
            title: '',
            content: ''
        },
        notes: []
    },

    // 计算属性（自动计算，依赖数据变化时自动更新）
    computed: {
        completedCount() {
            return this.notes.filter(note => note.completed).length;
        }
    },

    // 生命周期钩子（实例创建后自动执行）
    created() {
        this.loadNotes();
    },

    // 方法
    methods: {
        // ========== 基础演示方法 ==========
        toggleVisible() {
            this.visible = !this.visible;
        },

        addFruit() {
            if (this.newFruit.trim()) {
                this.fruits.push(this.newFruit.trim());
                this.newFruit = '';
            }
        },

        removeFruit(index) {
            this.fruits.splice(index, 1);
        },

        // ========== 笔记应用方法 ==========

        // 加载笔记（从 localStorage）
        loadNotes() {
            const saved = localStorage.getItem('vue_notes');
            if (saved) {
                this.notes = JSON.parse(saved);
            } else {
                // 示例笔记
                this.notes = [
                    {
                        id: Date.now(),
                        title: '欢迎使用 Vue 笔记',
                        content: '这是一个用 Vue.js 构建的笔记应用！\n\n特点：\n- 响应式数据\n- 本地存储\n- 编辑/删除功能',
                        date: new Date().toLocaleString(),
                        completed: false,
                        isEditing: false,
                        editTitle: '',
                        editContent: ''
                    }
                ];
                this.saveNotes();
            }
        },

        // 保存笔记到 localStorage
        saveNotes() {
            localStorage.setItem('vue_notes', JSON.stringify(this.notes));
        },

        // 添加笔记
        addNote() {
            if (!this.newNote.title && !this.newNote.content) {
                alert('请填写标题或内容！');
                return;
            }

            const note = {
                id: Date.now(),
                title: this.newNote.title || '无标题',
                content: this.newNote.content || '无内容',
                date: new Date().toLocaleString(),
                completed: false,
                isEditing: false,
                editTitle: '',
                editContent: ''
            };

            this.notes.unshift(note);
            this.saveNotes();

            // 清空输入
            this.newNote.title = '';
            this.newNote.content = '';

            this.showToast('笔记添加成功！');
        },

        // 删除笔记
        deleteNote(id) {
            if (confirm('确定删除这条笔记吗？')) {
                this.notes = this.notes.filter(note => note.id !== id);
                this.saveNotes();
                this.showToast('笔记已删除');
            }
        },

        // 删除所有笔记
        deleteAllNotes() {
            if (this.notes.length === 0) return;
            if (confirm('⚠️ 确定删除所有笔记吗？')) {
                this.notes = [];
                this.saveNotes();
                this.showToast('所有笔记已删除');
            }
        },

        // 切换完成状态
        toggleComplete(id) {
            const note = this.notes.find(n => n.id === id);
            if (note) {
                note.completed = !note.completed;
                this.saveNotes();
            }
        },

        // 开始编辑
        startEdit(id) {
            const note = this.notes.find(n => n.id === id);
            if (note) {
                note.isEditing = true;
                note.editTitle = note.title;
                note.editContent = note.content;
            }
        },

        // 保存编辑
        saveEdit(id) {
            const note = this.notes.find(n => n.id === id);
            if (note) {
                note.title = note.editTitle || '无标题';
                note.content = note.editContent || '无内容';
                note.date = new Date().toLocaleString();
                note.isEditing = false;
                this.saveNotes();
                this.showToast('笔记已更新');
            }
        },

        // 取消编辑
        cancelEdit(id) {
            const note = this.notes.find(n => n.id === id);
            if (note) {
                note.isEditing = false;
            }
        },

        // 简单提示
        showToast(message) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #2c3e50;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                z-index: 1000;
                animation: fadeOut 2s forwards;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }
    }
});