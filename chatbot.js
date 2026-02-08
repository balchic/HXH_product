document.addEventListener('DOMContentLoaded', () => {
    const openChatbotBtn = document.getElementById('open-chatbot');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send');

    let isChatbotOpen = false;

    openChatbotBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        openChatbotBtn.style.display = 'none';
        if (!isChatbotOpen) {
            addMessage('bot', '안녕하세요! 저는 이 웹사이트의 AI 비서입니다. 무엇을 도와드릴까요? \'도움말\'을 입력하시면 제가 할 수 있는 일들을 알려드릴게요.');
            isChatbotOpen = true;
        }
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
            setTimeout(() => processMessage(message), 300);
        }
    }

    function addMessage(sender, message, isHtml = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', `${sender}-message`);
        if (isHtml) {
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processMessage(message) {
        const msg = message.toLowerCase();

        if (msg.includes('도움말')) {
            const helpText = `제가 할 수 있는 일은 다음과 같습니다:
            <ul>
                <li><b>페이지 요약:</b> "이 페이지 요약해줘", "무슨 내용이야?"</li>
                <li><b>콘텐츠 검색:</b> "로또 역사에 대해 알려줘", "전략 검색해줘"</li>
                <li><b>페이지 이동:</b> "소개 페이지로 가줘", "아티클 보여줘"</li>
            </ul>`;
            addMessage('bot', helpText, true);
        } else if (msg.includes('요약') || msg.includes('무슨 내용')) {
            summarizeCurrentPage();
        } else if (msg.includes('검색') || msg.includes('알려줘') || msg.includes('찾아줘')) {
            const keyword = extractKeyword(msg);
            if (keyword) {
                searchContent(keyword);
            } else {
                addMessage('bot', '무엇을 검색할지 키워드를 알려주세요. 예: "로또 역사에 대해 알려줘"');
            }
        } else if (msg.includes('이동') || msg.includes('보여줘') || msg.includes('가줘')) {
            navigateTo(msg);
        } else if (msg.includes('안녕') || msg.includes('반가워')) {
            addMessage('bot', '안녕하세요! 만나서 반갑습니다.');
        } else {
            addMessage('bot', '죄송합니다. 아직 이해하지 못했어요. \'도움말\'을 참고하여 다시 질문해주시겠어요?');
        }
    }

    function extractKeyword(msg) {
        const keywords = ['검색', '알려줘', '찾아줘', '대해'];
        let keyword = msg;
        for (const kw of keywords) {
            keyword = keyword.replace(kw, '');
        }
        // remove " " and other unnecessary words
        keyword = keyword.replace(/ /g, '').replace(/에/g, '').trim();
        return keyword;
    }

    function navigateTo(msg) {
        const pages = {
            '홈': 'index.html',
            '메인': 'index.html',
            '아티클': 'articles.html',
            '게시글': 'articles.html',
            '소개': 'about.html',
            '누구': 'about.html',
            '개인정보': 'privacy.html',
            '연락': 'contact.html',
        };
        for (const pageName in pages) {
            if (msg.includes(pageName.toLowerCase())) {
                addMessage('bot', `'${pageName}' 페이지로 이동합니다.`);
                window.location.href = pages[pageName];
                return;
            }
        }
        addMessage('bot', '어떤 페이지로 이동할까요? (예: 홈, 아티클, 소개)');
    }

    function summarizeCurrentPage() {
        const mainContent = document.querySelector('main')?.innerText;
        if (!mainContent) {
            addMessage('bot', '이 페이지는 요약할 내용이 없네요.');
            return;
        }

        // Simple extractive summary: take the first sentence of the first 3 paragraphs.
        const paragraphs = mainContent.split('\n').filter(p => p.trim().length > 50);
        if (paragraphs.length === 0) {
            addMessage('bot', '이 페이지는 요약할 만한 긴 내용이 없습니다.');
            return;
        }

        let summary = paragraphs.slice(0, 3).map(p => {
            return p.substring(0, p.indexOf('.') + 1);
        }).join(' ');

        if (summary.length < 50) {
           summary = paragraphs[0].substring(0, 150) + '...';
        }


        addMessage('bot', '이 페이지의 주요 내용은 다음과 같습니다:\n\n' + summary);
    }

    async function searchContent(keyword) {
        addMessage('bot', `'${keyword}'에 대한 콘텐츠를 검색 중입니다...`);

        const filesToSearch = ['article-1.html', 'article-2.html', 'article-3.html', 'articles.html', 'about.html', 'index.html'];
        let searchResults = [];

        for (const file of filesToSearch) {
            try {
                const response = await fetch(file);
                if (!response.ok) continue;

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const title = doc.querySelector('title')?.innerText || file;
                const content = doc.body.innerText;
                const lowerCaseContent = content.toLowerCase();
                const lowerCaseKeyword = keyword.toLowerCase();
                
                if (lowerCaseContent.includes(lowerCaseKeyword)) {
                    let snippet = '';
                    const index = lowerCaseContent.indexOf(lowerCaseKeyword);
                    const start = Math.max(0, index - 40);
                    const end = Math.min(content.length, index + keyword.length + 40);
                    snippet = '...' + content.substring(start, end) + '...';
                    
                    // Prevent HTML tags in snippet
                    snippet = snippet.replace(/</g, "&lt;").replace(/>/g, "&gt;");

                    searchResults.push({ file, title, snippet });
                }
            } catch (error) {
                console.error(`Error fetching or parsing ${file}:`, error);
            }
        }

        if (searchResults.length > 0) {
            let resultMessage = `'${keyword}'에 대한 검색 결과입니다:<br><br>`;
            searchResults.forEach(result => {
                resultMessage += `<b><a href="${result.file}">${result.title}</a></b><br><small>${result.snippet}</small><br><br>`;
            });
            addMessage('bot', resultMessage, true);
        } else {
            addMessage('bot', `'${keyword}'에 대한 검색 결과를 찾을 수 없습니다.`);
        }
    }
});