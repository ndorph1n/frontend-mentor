const markRead = document.querySelector('.mark-as-read');
const counter = document.querySelector('.feed__counter');
const unread = document.querySelectorAll('.notification_unread');

document.addEventListener('click', handleClick);

function handleClick(e) {
    if (e.target == markRead) {
        markAllAsRead();
    } else if (e.target.closest('.notification_unread')){
        markAsRead(e.target.closest('.notification_unread'))
    }
}

function markAsRead(target) {
    target.classList.remove('notification_unread');
    counter.innerText = +counter.innerText-1;
}

function markAllAsRead() {
    unread.forEach( (notification) => {
        notification.classList.remove('notification_unread');
    });
    counter.innerText = '0';
}