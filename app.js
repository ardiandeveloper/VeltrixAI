
const proxyUrl = "https://veltrixai-proxy.vercel.app/chat";
const chatContainer = document.getElementById('chat-container');

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  addMessage('user', message);
  input.value = '';

  const responseElement = addMessage('bot', 'Mengetik...');

  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    responseElement.textContent = data.reply.trim();
  } catch (error) {
    responseElement.textContent = 'Terjadi kesalahan saat menghubungi AI.';
  }
}

function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = role;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return div;
}
