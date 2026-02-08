document.addEventListener('DOMContentLoaded', () => {
  const openChatbotBtn = document.getElementById('open-chatbot');
  const chatbotContainer = document.getElementById('chatbot-container');
  const closeChatbotBtn = document.getElementById('close-chatbot');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send');

  // Load chatbot HTML
  fetch('chatbot.html')
    .then(response => response.text())
    .then(data => {
      document.body.innerHTML += data;
    });

  openChatbotBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    openChatbotBtn.style.display = 'none';
    addMessage('bot', '안녕하세요! 무엇을 도와드릴까요? \'도움말\'을 입력하면 사용법을 안내해 드립니다.');
  });

  closeChatbotBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    openChatbotBtn.style.display = 'block';
  });

  chatbotSendBtn.addEventListener('click', handleUserInput);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });

  function handleUserInput() {
    const message = chatbotInput.value.trim();
    if (message) {
      addMessage('user', message);
      chatbotInput.value = '';
      processMessage(message);
    }
  }

  function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', `${sender}-message`);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function processMessage(message) {
    if (message.toLowerCase().includes('도움말')) {
      setTimeout(() => {
        addMessage('bot', '다음과 같이 질문할 수 있습니다:\n\n - \'[키워드] 검색\' : 관련 내용을 검색합니다.\n - \'안녕\': 인사를 나눕니다.');
      }, 500);
    } else if (message.toLowerCase().includes('안녕')) {
      setTimeout(() => {
        addMessage('bot', '안녕하세요! 반갑습니다.');
      }, 500);
    } else if (message.toLowerCase().startsWith('검색 ')) {
        const keyword = message.substring(3).trim();
        searchContent(keyword);
    } else if (message.toLowerCase().includes('검색')) {
        setTimeout(() => {
            addMessage('bot', "검색하시려면 '검색 [키워드]' 형식으로 입력해주세요.");
        }, 500);
    }
    else {
      setTimeout(() => {
        addMessage('bot', '죄송합니다. 아직 이해할 수 없는 말입니다. \'도움말\'을 확인해주세요.');
      }, 500);
    }
  }

    async function searchContent(keyword) {
        addMessage('bot', `'${keyword}'에 대한 콘텐츠를 검색 중입니다...`);

        const filesToSearch = ['article-1.html', 'article-2.html', 'article-3.html', 'articles.html', 'about.html', 'contact.html', 'index.html'];
        const searchResults = [];

        for (const file of filesToSearch) {
            try {
                const response = await fetch(file);
                if (!response.ok) continue;

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const title = doc.querySelector('title')?.innerText || file;
                const content = doc.body.innerText;

                if (content.toLowerCase().includes(keyword.toLowerCase())) {
                    searchResults.push({ file, title });
                }
            } catch (error) {
                console.error(`Error fetching or parsing ${file}:`, error);
            }
        }

        if (searchResults.length > 0) {
            let resultMessage = `'${keyword}'에 대한 검색 결과입니다:\n\n`;
            searchResults.forEach(result => {
                resultMessage += `- <a href="${result.file}">${result.title}</a>\n`;
            });
             addMessage('bot', resultMessage);
        } else {
            addMessage('bot', `'${keyword}'에 대한 검색 결과를 찾을 수 없습니다.`);
        }
    }
});
