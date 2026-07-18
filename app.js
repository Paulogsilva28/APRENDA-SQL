let SQL_ENGINE = null;
let currentDb = null;
let currentLevelIndex = 0;
let codeEditor = null;

// Inicializa a aplicação
window.addEventListener('DOMContentLoaded', () => {
  // Inicializa o CodeMirror
  const textArea = document.getElementById('sql-input');
  if (textArea) {
    codeEditor = CodeMirror.fromTextArea(textArea, {
      mode: 'text/x-sql',
      theme: 'dracula',
      lineNumbers: true,
      indentWithTabs: true,
      smartIndent: true,
      matchBrackets: true,
      autofocus: true,
      viewportMargin: Infinity
    });

    // Atalho Ctrl+Enter no CodeMirror para rodar a query
    codeEditor.setOption("extraKeys", {
      "Ctrl-Enter": function(cm) {
        executeUserQuery();
      }
    });
  }

  // Inicializa o SQLite WebAssembly via CDN
  initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
  }).then(SQL => {
    SQL_ENGINE = SQL;
    
    // Escuta mudanças de hash na URL
    window.addEventListener('hashchange', handleNavigation);
    
    // Configura os botões de controle
    document.getElementById('btn-run').addEventListener('click', executeUserQuery);
    document.getElementById('btn-reset').addEventListener('click', resetCurrentLevelQuery);
    document.getElementById('btn-reset-all').addEventListener('click', resetAllProgress);
    
    // Configura botão de toggle de som
    const btnSound = document.getElementById('btn-toggle-sound');
    if (btnSound) {
      updateSoundButtonIcon(btnSound);
      btnSound.addEventListener('click', () => {
        const current = localStorage.getItem('sql_sound_enabled') !== 'false';
        localStorage.setItem('sql_sound_enabled', !current ? 'true' : 'false');
        updateSoundButtonIcon(btnSound);
      });
    }

    // Configura navegação de abas de resultados
    setupTabs();

    // Carrega a lição inicial
    handleNavigation();
  }).catch(err => {
    console.error("Erro ao carregar sql.js:", err);
    alert("Erro ao carregar o interpretador SQL. Certifique-se de que está conectado à internet.");
  });
});

// Manipula a navegação baseada no Hash
function handleNavigation() {
  const hash = window.location.hash.substr(2); // Remove '#!'
  let targetIndex = 0;

  if (hash) {
    const foundIndex = levels.findIndex(lvl => lvl.short_name === hash);
    if (foundIndex !== -1) {
      targetIndex = foundIndex;
    }
  }

  loadLevel(targetIndex);
}

// Carrega uma lição específica
function loadLevel(index) {
  currentLevelIndex = index;
  const level = levels[index];

  // Atualiza hash da URL sem disparar hashchange se já for o mesmo
  const newHash = `#!${level.short_name}`;
  if (window.location.hash !== newHash) {
    window.location.hash = newHash;
  }

  // Inicializa banco de dados correspondente
  const { db, tableNames } = loadDatabase(SQL_ENGINE, level.database_type);
  currentDb = db;

  // Renderiza explicações da lição
  document.getElementById('lesson-title').innerText = `Lição ${index + 1}: ${level.name}`;
  document.getElementById('lesson-prompt').innerHTML = level.prompt;

  // Carrega o SQL inicial no editor
  const savedQuery = localStorage.getItem(`sql_draft_${level.short_name}`);
  const queryToLoad = savedQuery !== null ? savedQuery : (level.initial_query || "");
  codeEditor.setValue(queryToLoad);
  
  // Limpa estados e feedbacks anteriores
  hideFeedback();
  switchTab('tab-db'); // Inicia mostrando as tabelas do banco

  // Renderiza as tabelas disponíveis no banco de dados para consulta
  renderAvailableTables(tableNames);

  // Renderiza o menu lateral de progresso
  renderSidebar();

  // Configura botões de paginação
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (index > 0) {
    btnPrev.style.display = 'inline-flex';
    btnPrev.href = `#!${levels[index - 1].short_name}`;
  } else {
    btnPrev.style.display = 'none';
  }

  if (index < levels.length - 1) {
    btnNext.style.display = 'inline-flex';
    btnNext.href = `#!${levels[index + 1].short_name}`;
  } else {
    btnNext.style.display = 'none';
  }

  // Rola sidebar para o item ativo aparecer na tela
  setTimeout(() => {
    const activeItem = document.querySelector('.lesson-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

// Renderiza o menu lateral com todas as lições e seus estados
function renderSidebar() {
  const sidebarList = document.getElementById('sidebar-lessons');
  sidebarList.innerHTML = '';

  levels.forEach((lvl, idx) => {
    const isCompleted = localStorage.getItem(`sql_completed_${lvl.short_name}`) === 'true';
    const isActive = idx === currentLevelIndex;

    const li = document.createElement('li');
    li.className = `lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    
    // Ícone de check ou número
    const circle = document.createElement('span');
    circle.className = 'status-circle';
    circle.innerHTML = isCompleted ? '<i class="fas fa-check"></i>' : (idx + 1);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'lesson-name';
    nameSpan.innerText = lvl.name;

    const a = document.createElement('a');
    a.href = `#!${lvl.short_name}`;
    a.appendChild(circle);
    a.appendChild(nameSpan);

    li.appendChild(a);
    sidebarList.appendChild(li);
  });
}

// Renderiza as tabelas e dados no tab "Tabelas do Banco"
function renderAvailableTables(tableNames) {
  const dbContainer = document.getElementById('db-tables-view');
  dbContainer.innerHTML = '';

  tableNames.forEach(tableName => {
    try {
      const res = currentDb.exec(`SELECT * FROM ${tableName};`);
      
      const card = document.createElement('div');
      card.className = 'db-table-card';
      
      const title = document.createElement('h4');
      title.className = 'db-table-title';
      title.innerHTML = `<i class="fas fa-table"></i> Tabela: <strong>${tableName}</strong>`;
      
      card.appendChild(title);
      
      const tableHTML = generateHTMLTable(res);
      const tableWrapper = document.createElement('div');
      tableWrapper.innerHTML = tableHTML;
      
      card.appendChild(tableWrapper);
      dbContainer.appendChild(card);
    } catch (e) {
      console.error(`Erro ao buscar dados da tabela ${tableName}:`, e);
    }
  });
}

// Executa a consulta escrita pelo usuário e compara o estado resultante
function executeUserQuery() {
  const level = levels[currentLevelIndex];
  const userQuery = codeEditor.getValue().trim();

  // Salva rascunho
  localStorage.setItem(`sql_draft_${level.short_name}`, userQuery);

  if (!userQuery) {
    showErrorFeedback("O editor está vazio. Escreva sua consulta SQL para executar!");
    playSound('wrong');
    return;
  }

  // 1. Cria instâncias limpas temporárias dos bancos de dados para comparação
  let expectedDbInstance, userDbInstance;
  let tableNames = [];
  try {
    const resExpected = loadDatabase(SQL_ENGINE, level.database_type);
    expectedDbInstance = resExpected.db;
    tableNames = resExpected.tableNames;

    const resUser = loadDatabase(SQL_ENGINE, level.database_type);
    userDbInstance = resUser.db;
  } catch (err) {
    console.error("Erro ao reinicializar bases de dados:", err);
    showErrorFeedback("Erro interno ao inicializar o ambiente de teste.");
    playSound('wrong');
    return;
  }

  // 2. Executa a query ideal no banco esperado
  let expectedResult = null;
  let expectedIsQuerySelect = false;
  try {
    expectedResult = expectedDbInstance.exec(level.correct_query);
    expectedIsQuerySelect = expectedResult.length > 0;
  } catch (err) {
    console.error("Erro interno na consulta correta de referência:", err);
  }

  // 3. Executa a query do usuário no banco do usuário
  let userResult = null;
  let userIsQuerySelect = false;
  try {
    userResult = userDbInstance.exec(userQuery);
    userIsQuerySelect = userResult.length > 0;
  } catch (err) {
    // Exibe erro de sintaxe do SQLite
    showErrorFeedback(`Erro de Sintaxe SQL: ${err.message}`);
    playSound('wrong');
    
    // Exibe o erro na aba "Seu Resultado"
    document.getElementById('user-result-view').innerHTML = `
      <div class="query-error-box">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${err.message}</span>
      </div>
    `;
    switchTab('tab-user');
    return;
  }

  // Exibe o resultado do usuário na aba correspondente
  document.getElementById('user-result-view').innerHTML = generateHTMLTable(userResult);
  
  // Exibe o resultado esperado na aba correspondente
  document.getElementById('expected-result-view').innerHTML = generateHTMLTable(expectedResult);

  // 4. Validação
  let isCorrect = false;

  if (expectedIsQuerySelect) {
    // Se a query correta for SELECT, o usuário deve retornar dados idênticos
    isCorrect = gradeResults(userResult, expectedResult);
  } else {
    // Se for DML/DDL (escritas, criação de tabela, etc), o banco de dados final modificado pelo usuário
    // deve ter exatamente as mesmas tabelas e dados finais que o banco da query esperada
    if (!userIsQuerySelect) {
      isCorrect = compareDatabaseStates(userDbInstance, expectedDbInstance);
    }
  }

  // Validação: verificar strings obrigatórias (ex: usar subconsultas, aliases específicos)
  let isRequiredPassed = true;
  if (level.required) {
    for (let req of level.required) {
      if (!userQuery.toLowerCase().includes(req.toLowerCase())) {
        isRequiredPassed = false;
        break;
      }
    }
  }

  if (isCorrect && isRequiredPassed) {
    // Sucesso!
    showSuccessFeedback();
    localStorage.setItem(`sql_completed_${level.short_name}`, 'true');
    renderSidebar();
    
    // Dispara animação de confetti e som de sucesso
    triggerConfetti();
    playSound('correct');
    
    // Muda a aba para "Seu Resultado"
    switchTab('tab-user');

    // Atualiza a tabela ativa sendo exibida no painel
    currentDb = userDbInstance;
    renderAvailableTables(tableNames);
  } else {
    // Errado!
    if (!isCorrect) {
      if (expectedIsQuerySelect && !userIsQuerySelect) {
        showErrorFeedback("A sua consulta não retornou dados. Esperava-se uma instrução SELECT.");
      } else if (!expectedIsQuerySelect && userIsQuerySelect) {
        showErrorFeedback("A sua consulta retornou dados, mas esperava-se um comando de alteração (INSERT, UPDATE, DELETE) ou DDL (CREATE, ALTER, DROP).");
      } else if (!expectedIsQuerySelect) {
        showErrorFeedback("Incorreto. A modificação que você fez no banco não deixou a tabela no estado esperado. Verifique os valores inseridos ou alterados.");
      } else {
        showErrorFeedback("Incorreto. A sua consulta não retornou os dados corretos. Compare sua tabela com o 'Resultado Esperado'.");
      }
    } else {
      showErrorFeedback(level.custom_error_message || "Incorreto. Certifique-se de usar todos os comandos exigidos no enunciado da lição.");
    }
    playSound('wrong');
    switchTab('tab-user');
  }
}

// Compara os resultados (colunas e linhas) entre a query do usuário e a correta
function gradeResults(actual, expected) {
  if (!actual || !expected) return false;
  if (actual.length === 0 || expected.length === 0) return false;

  // Normaliza e compara nomes de colunas
  const normalizeCol = c => c.toUpperCase().replace(/\s/g, "");
  const actCols = actual[0].columns.map(normalizeCol);
  const expCols = expected[0].columns.map(normalizeCol);

  if (JSON.stringify(actCols) !== JSON.stringify(expCols)) return false;

  // Compara valores das linhas
  const actVals = actual[0].values;
  const expVals = expected[0].values;

  if (actVals.length !== expVals.length) return false;

  for (let i = 0; i < actVals.length; i++) {
    for (let j = 0; j < actVals[i].length; j++) {
      // Converte tudo para String para evitar discrepâncias de tipos inteiros/flutuantes nas comparações diretas
      if (String(actVals[i][j]) !== String(expVals[i][j])) {
        return false;
      }
    }
  }

  return true;
}

// Função para comparar todos os dados de todas as tabelas em dois bancos
function compareDatabaseStates(dbUser, dbExpected) {
  try {
    // 1. Busca a lista de todas as tabelas em ambos
    const qTables = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;";
    const tablesUser = dbUser.exec(qTables);
    const tablesExpected = dbExpected.exec(qTables);

    // Se a lista de tabelas diferir, está errado
    if (JSON.stringify(tablesUser) !== JSON.stringify(tablesExpected)) {
      return false;
    }

    if (tablesExpected.length === 0) return true; // sem tabelas em ambos

    const names = tablesExpected[0].values.map(val => val[0]);

    // 2. Para cada tabela, compara todos os dados
    for (let name of names) {
      const resUser = dbUser.exec(`SELECT * FROM ${name};`);
      const resExpected = dbExpected.exec(`SELECT * FROM ${name};`);

      if (!gradeResults(resUser, resExpected)) {
        return false;
      }
    }

    return true;
  } catch (e) {
    console.error("Erro ao comparar estados do DB:", e);
    return false;
  }
}

// Mostra o banner de sucesso
function showSuccessFeedback() {
  const correctBox = document.getElementById('feedback-correct');
  const wrongBox = document.getElementById('feedback-wrong');
  
  wrongBox.style.display = 'none';
  
  // Cria o botão de próxima lição se aplicável
  let nextButtonHTML = '';
  if (currentLevelIndex < levels.length - 1) {
    nextButtonHTML = `<a href="#!${levels[currentLevelIndex + 1].short_name}" class="btn btn-next-lesson">Próxima Lição <i class="fas fa-arrow-right"></i></a>`;
  } else {
    nextButtonHTML = `<span class="congrats-end">🎉 Parabéns! Você completou todas as 100 lições do Aprenda SQL Praticando!</span>`;
  }

  correctBox.innerHTML = `
    <div class="feedback-content">
      <i class="fas fa-check-circle"></i>
      <div>
        <strong>Excelente trabalho! A sua consulta está absolutamente correta.</strong>
        <p>Você compreendeu bem este conceito e gerou o resultado esperado.</p>
      </div>
    </div>
    ${nextButtonHTML}
  `;
  correctBox.style.display = 'flex';
  
  // Rolagem suave até a caixa de feedback
  correctBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Mostra o banner de erro
function showErrorFeedback(message) {
  const correctBox = document.getElementById('feedback-correct');
  const wrongBox = document.getElementById('feedback-wrong');

  correctBox.style.display = 'none';
  wrongBox.innerHTML = `
    <i class="fas fa-times-circle"></i>
    <div>
      <strong>Opa, quase lá!</strong>
      <p>${message}</p>
    </div>
  `;
  wrongBox.style.display = 'flex';
  
  // Rolagem suave até a caixa de feedback
  wrongBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Limpa banners de feedback
function hideFeedback() {
  document.getElementById('feedback-correct').style.display = 'none';
  document.getElementById('feedback-wrong').style.display = 'none';
  document.getElementById('user-result-view').innerHTML = `<div class="no-results">Execute uma consulta para visualizar os resultados.</div>`;
  document.getElementById('expected-result-view').innerHTML = `<div class="no-results">Execute uma consulta para comparar com os resultados esperados.</div>`;
}

// Reseta o SQL no editor para a consulta padrão da lição
function resetCurrentLevelQuery() {
  const level = levels[currentLevelIndex];
  codeEditor.setValue(level.initial_query || "");
  localStorage.removeItem(`sql_draft_${level.short_name}`);
  hideFeedback();
}

// Reseta todo o progresso do usuário no localStorage
function resetAllProgress() {
  if (confirm("Tem certeza de que deseja apagar todo o seu progresso? Esta ação não pode ser desfeita.")) {
    levels.forEach(lvl => {
      localStorage.removeItem(`sql_completed_${lvl.short_name}`);
      localStorage.removeItem(`sql_draft_${lvl.short_name}`);
    });
    loadLevel(0);
  }
}

// Configura as abas dos resultados
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      switchTab(target);
    });
  });
}

// Altera a aba ativa nos painéis de resultado
function switchTab(tabId) {
  // Desativa todas as abas
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  // Ativa a aba alvo
  const activeBtn = document.querySelector(`.tab-btn[data-target="${tabId}"]`);
  const activeContent = document.getElementById(tabId);
  
  if (activeBtn && activeContent) {
    activeBtn.classList.add('active');
    activeContent.classList.add('active');
  }
}

// Dispara efeito de confetti usando canvas-confetti via CDN
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#60a5fa', '#a78bfa', '#f59e0b']
    });
  }
}

// Função para tocar som usando Web Audio API (síntese retro-game)
function playSound(type) {
  const isSoundEnabled = localStorage.getItem('sql_sound_enabled') !== 'false';
  if (!isSoundEnabled) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'correct') {
      // Arpejo alegre ascendente de ondas senoidais
      const now = ctx.currentTime;
      playTone(ctx, 523.25, 'sine', now, 0.08); // C5
      playTone(ctx, 659.25, 'sine', now + 0.07, 0.08); // E5
      playTone(ctx, 783.99, 'sine', now + 0.14, 0.08); // G5
      playTone(ctx, 1046.50, 'sine', now + 0.21, 0.22); // C6
    } else if (type === 'wrong') {
      // Buzz áspero grave e curto descendo em frequência
      const now = ctx.currentTime;
      playTone(ctx, 160, 'sawtooth', now, 0.12);
      playTone(ctx, 110, 'sawtooth', now + 0.07, 0.18);
    }
  } catch (e) {
    console.error("Erro ao tocar som sintetizado:", e);
  }
}

// Auxiliar para gerar notas de áudio sintetizadas
function playTone(ctx, freq, type, startTime, duration) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  // Envelope de volume (evita cliques de áudio e faz fade-out)
  gain.gain.setValueAtTime(0.08, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Atualiza o ícone do alto-falante
function updateSoundButtonIcon(btn) {
  const isSoundEnabled = localStorage.getItem('sql_sound_enabled') !== 'false';
  if (isSoundEnabled) {
    btn.innerHTML = '<i class="fas fa-volume-up"></i>';
    btn.setAttribute('title', 'Desativar Sons');
  } else {
    btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    btn.setAttribute('title', 'Ativar Sons');
  }
}
