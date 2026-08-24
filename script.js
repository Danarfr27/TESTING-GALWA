// ===== DATA =====
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

// ===== DOM ELEMENTS =====
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

// ===== INITIALIZE =====
function init() {
    renderChatList();
    setupEventListeners();
    setupParallax();
    console.log('🚀 WhatsApp Clone Ready!');
}

// ===== RENDER CHAT LIST =====
function renderChatList(filteredChats = chatsData) {
    chatList.innerHTML = '';
    
    filteredChats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
        
        const unreadClass = chat.unread > 0 ? 'style="font-weight: 600;"' : '';
        const onlineIndicator = chat.online ? '<span class="online-indicator"></span>' : '';
        
        chatItem.innerHTML = `
            <div style="position: relative;">
                <img src="${chat.avatar}" alt="${chat.name}" class="avatar">
                ${onlineIndicator}
            </div>
            <div class="chat-item-content">
                <div class="chat-item-header">
                    <span class="chat-item-name">${chat.name}</span>
                    <span class="chat-item-time">${chat.time}</span>
                </div>
                <div class="chat-item-message" ${unreadClass}>${chat.message}</div>
            </div>
            ${chat.unread > 0 ? `<span class="unread-badge">${chat.unread}</span>` : ''}
        `;
        
        chatItem.addEventListener('click', () => openChat(chat, chatItem));
        chatList.appendChild(chatItem);
    });
}

// ===== OPEN CHAT =====
function openChat(chat, chatItemElement) {
    currentChatId = chat.id;
    
    // Update UI
    emptyState.style.display = 'none';
    chatWindow.style.display = 'flex';
    
    // Update header
    chatName.textContent = chat.name;
    chatStatus.textContent = chat.online ? '🟢 Online' : '⚫ Offline';
    chatAvatar.src = chat.avatar;
    
    // Render messages
    renderMessages();
    
    // Update active state
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    if (chatItemElement) {
        chatItemElement.classList.add('active');
    }
    
    // Focus input
    setTimeout(() => messageInput.focus(), 100);
}

// ===== RENDER MESSAGES =====
function renderMessages() {
    if (!currentChatId) return;
    
    messagesArea.innerHTML = '';
    const messages = messagesData[currentChatId] || [];
    
    messages.forEach((msg, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sent ? 'sent' : 'received'}`;
        messageDiv.style.animationDelay = `${index * 50}ms`;
        
        messageDiv.innerHTML = `
            <div class="message-content">${msg.text}</div>
            <div class="message-time">${msg.time}</div>
        `;
        
        messagesArea.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    setTimeout(() => {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }, 50);
}

// ===== SEND MESSAGE =====
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
    
    // Simulate reply after random delay
    setTimeout(() => {
        const replies = [
            'That sounds great!',
            'I agree! 👍',
            'Awesome!',
            'Thanks for letting me know',
            'Perfect!',
            'Looking forward to it!',
            'Sounds good to me',
            'Got it! 😊',
            'Haha, I like that!',
            'Let me think about it...',
            'Sure thing! 🎉'
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        messagesData[currentChatId].push({
            id: messagesData[currentChatId].length + 1,
            text: randomReply,
            sent: false,
            time: replyTime
        });
        
        renderMessages();
    }, 1000 + Math.random() * 2000);
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Send button
    sendBtn.addEventListener('click', sendMessage);
    
    // Enter key to send
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
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
                // Unread
                filtered = chatsData.filter(chat => chat.unread > 0);
            } else if (index === 2) {
                // Favorites
                filtered = chatsData.slice(0, 3);
            } else if (index === 3) {
                // Groups
                filtered = chatsData.filter(chat => chat.name.includes('Team') || chat.name.includes('Group'));
            }
            
            renderChatList(filtered);
        });
    });
}

// ===== PARALLAX EFFECT =====
function setupParallax() {
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.clientX * 2) / 100;
        const y = (window.innerHeight - e.clientY * 2) / 100;
        
        parallaxBg.style.transform = `translateZ(0) translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
    
    // Mobile parallax with device orientation
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const x = e.gamma || 0;
            const y = e.beta || 0;
            
            parallaxBg.style.transform = `translateZ(0) translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
    }
    
    // Floating animation for background
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
}

// ===== ADDITIONAL STYLES FOR ONLINE INDICATOR =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .online-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 14px;
        height: 14px;
        background: #31a24c;
        border: 3px solid white;
        border-radius: 50%;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .unread-badge {
        background: #128C7E;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
        margin-right: 8px;
        flex-shrink: 0;
    }
`;
document.head.appendChild(additionalStyles);

// ===== START APPLICATION =====
document.addEventListener('DOMContentLoaded', init);

// ===== CONSOLE MESSAGES =====
console.log('%c🎨 WhatsApp Clone - Premium Edition', 'font-size: 16px; color: #128C7E; font-weight: bold;');
console.log('%c✅ Parallax Effects Enabled', 'color: #31a24c;');
console.log('%c✅ Real-time Messaging Active', 'color: #31a24c;');
console.log('%c✅ Fully Responsive Design', 'color: #31a24c;');
console.log('%c✅ No License Restrictions', 'color: #31a24c;');
console.log('%c💡 Tip: Click any chat to start messaging!', 'color: #666; font-style: italic;');
