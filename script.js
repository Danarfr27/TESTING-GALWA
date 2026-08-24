// Sample Data
const chatsData = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1', message: 'Hey! How are you?', time: '10:30', unread: 2, online: true },
    { id: 2, name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=2', message: 'See you tomorrow!', time: '09:15', unread: 0, online: true },
    { id: 3, name: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=3', message: 'Updated the mockups', time: '08:45', unread: 5, online: false },
    { id: 4, name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?img=4', message: 'Thanks for the help!', time: '07:30', unread: 1, online: true },
    { id: 5, name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?img=5', message: 'Call me when you can', time: '06:20', unread: 0, online: false },
    { id: 6, name: 'Project Group', avatar: 'https://i.pravatar.cc/150?img=6', message: 'Meeting at 3 PM', time: '05:00', unread: 3, online: true },
];

const messagesData = {
    1: [
        { id: 1, text: 'Hey! How are you?', sent: false, time: '10:30' },
        { id: 2, text: 'Im doing great, thanks for asking!', sent: true, time: '10:31' },
        { id: 3, text: 'Wanna grab coffee later?', sent: false, time: '10:32' },
        { id: 4, text: 'Sure! How about 3 PM?', sent: true, time: '10:33' },
        { id: 5, text: 'Perfect! See you then 😊', sent: false, time: '10:34' },
    ],
    2: [
        { id: 1, text: 'Hey Mike!', sent: true, time: '09:10' },
        { id: 2, text: 'Hi! Just finished the project', sent: false, time: '09:12' },
        { id: 3, text: 'Awesome! Can you send me the files?', sent: true, time: '09:13' },
        { id: 4, text: 'See you tomorrow!', sent: false, time: '09:15' },
    ],
    3: [
        { id: 1, text: 'Team, check the new designs', sent: false, time: '08:40' },
        { id: 2, text: 'Looking good! 👍', sent: true, time: '08:42' },
        { id: 3, text: 'Updated the mockups', sent: false, time: '08:45' },
    ],
    4: [
        { id: 1, text: 'Hey Alex!', sent: true, time: '07:20' },
        { id: 2, text: 'Hi! Thanks for your help earlier', sent: false, time: '07:25' },
        { id: 3, text: 'No problem, anytime!', sent: true, time: '07:28' },
        { id: 4, text: 'Thanks for the help!', sent: false, time: '07:30' },
    ],
    5: [
        { id: 1, text: 'Emma, can we talk?', sent: true, time: '06:10' },
        { id: 2, text: 'Sure, I can call in a bit', sent: false, time: '06:15' },
        { id: 3, text: 'Call me when you can', sent: false, time: '06:20' },
    ],
    6: [
        { id: 1, text: 'Everyone, meeting tomorrow', sent: false, time: '04:50' },
        { id: 2, text: 'What time?', sent: true, time: '04:55' },
        { id: 3, text: 'Meeting at 3 PM', sent: false, time: '05:00' },
    ],
};

let currentChatId = null;

// DOM Elements
const chatList = document.getElementById('chatList');
const messagesArea = document.getElementById('messagesArea');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const emptyState = document.getElementById('emptyState');
const chatWindow = document.getElementById('chatWindow');
const chatName = document.getElementById('chatName');
const chatStatus = document.getElementById('chatStatus');
const chatAvatar = document.getElementById('chatAvatar');
const searchInput = document.getElementById('searchInput');
const parallaxBg = document.getElementById('parallaxBg');

// Initialize
function init() {
    renderChatList();
    setupEventListeners();
    setupParallax();
}

// Render Chat List
function renderChatList(filteredChats = chatsData) {
    chatList.innerHTML = '';
    
    filteredChats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
        chatItem.innerHTML = `
            <img src="${chat.avatar}" alt="${chat.name}" class="avatar">
            <div class="chat-item-content">
                <div class="chat-item-header">
                    <span class="chat-item-name">${chat.name}</span>
                    <span class="chat-item-time">${chat.time}</span>
                </div>
                <div class="chat-item-message">${chat.message}</div>
            </div>
        `;
        
        chatItem.addEventListener('click', () => openChat(chat));
        chatList.appendChild(chatItem);
    });
}

// Open Chat
function openChat(chat) {
    currentChatId = chat.id;
    
    // Update UI
    emptyState.style.display = 'none';
    chatWindow.style.display = 'flex';
    
    // Update header
    chatName.textContent = chat.name;
    chatStatus.textContent = chat.online ? 'Online' : 'Offline';
    chatAvatar.src = chat.avatar;
    
    // Render messages
    renderMessages();
    
    // Update active state
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Focus input
    setTimeout(() => messageInput.focus(), 100);
}

// Render Messages
function renderMessages() {
    if (!currentChatId) return;
    
    messagesArea.innerHTML = '';
    const messages = messagesData[currentChatId] || [];
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sent ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="message-content">${msg.text}</div>
        `;
        messagesArea.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Send Message
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text || !currentChatId) return;
    
    // Add message to data
    if (!messagesData[currentChatId]) {
        messagesData[currentChatId] = [];
    }
    
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    messagesData[currentChatId].push({
        id: messagesData[currentChatId].length + 1,
        text: text,
        sent: true,
        time: time
    });
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Re-render messages
    renderMessages();
    
    // Simulate reply
    setTimeout(() => {
        const replies = [
            'That sounds great!',
            'I agree! 👍',
            'Awesome!',
            'Thanks for letting me know',
            'Perfect!',
            'Looking forward to it!',
            'Sounds good to me',
            'Got it! 😊'
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        messagesData[currentChatId].push({
            id: messagesData[currentChatId].length + 1,
            text: randomReply,
            sent: false,
            time: time
        });
        
        renderMessages();
    }, 1000 + Math.random() * 2000);
}

// Setup Event Listeners
function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = chatsData.filter(chat => 
            chat.name.toLowerCase().includes(query) ||
            chat.message.toLowerCase().includes(query)
        );
        renderChatList(filtered);
    });
    
    // Filter tabs
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            let filtered = chatsData;
            
            if (index === 1) {
                filtered = chatsData.filter(chat => chat.unread > 0);
            } else if (index === 2) {
                filtered = chatsData.slice(0, 3);
            } else if (index === 3) {
                filtered = chatsData.filter(chat => chat.name.includes('Team') || chat.name.includes('Group'));
            }
            
            renderChatList(filtered);
        });
    });
}

// Parallax Effect
function setupParallax() {
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.clientX * 2) / 100;
        const y = (window.innerHeight - e.clientY * 2) / 100;
        
        parallaxBg.style.transform = `translateZ(0) translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
    
    // Mobile parallax
    window.addEventListener('deviceorientation', (e) => {
        const x = e.gamma || 0;
        const y = e.beta || 0;
        
        parallaxBg.style.transform = `translateZ(0) translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
}

// Initialize App
init();

// Add some interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('WhatsApp Clone Ready!');
    console.log('🎨 Modern UI with Parallax Effects');
    console.log('💬 Real-time messaging simulation');
    console.log('📱 Fully responsive design');
});
