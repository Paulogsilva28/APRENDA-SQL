// Função para inicializar o banco de dados e preencher com os dados correspondentes à lição
function loadDatabase(SQL, dbType) {
  const db = new SQL.Database();
  let sqlstr = "";
  let tableNames = [];

  switch (dbType) {
    case "family":
      sqlstr = `
        CREATE TABLE membros_familia (
          id INT,
          nome VARCHAR(50),
          genero VARCHAR(20),
          especie VARCHAR(50),
          livros_lidos INT
        );
        INSERT INTO membros_familia VALUES (1, 'Dave', 'masculino', 'humano', 200);
        INSERT INTO membros_familia VALUES (2, 'Maria', 'feminino', 'humano', 180);
        INSERT INTO membros_familia VALUES (3, 'Pickles', 'masculino', 'cachorro', 0);
      `;
      tableNames = ["membros_familia"];
      break;

    case "friends_of_pickles":
      sqlstr = `
        CREATE TABLE amigos_do_pickles (
          id INT,
          nome VARCHAR(50),
          genero VARCHAR(20),
          especie VARCHAR(50),
          altura_cm INT
        );
        INSERT INTO amigos_do_pickles VALUES (1, 'Dave', 'masculino', 'humano', 180);
        INSERT INTO amigos_do_pickles VALUES (2, 'Maria', 'feminino', 'humano', 160);
        INSERT INTO amigos_do_pickles VALUES (3, 'Fry', 'masculino', 'gato', 30);
        INSERT INTO amigos_do_pickles VALUES (4, 'Leela', 'feminino', 'gato', 25);
        INSERT INTO amigos_do_pickles VALUES (5, 'Odie', 'masculino', 'cachorro', 40);
        INSERT INTO amigos_do_pickles VALUES (6, 'Jumpy', 'masculino', 'cachorro', 35);
        INSERT INTO amigos_do_pickles VALUES (7, 'Sneakers', 'masculino', 'cachorro', 55);
      `;
      tableNames = ["amigos_do_pickles"];
      break;

    case "family_and_legs":
      sqlstr = `
        CREATE TABLE membros_familia (
          id INT,
          nome VARCHAR(50),
          especie VARCHAR(50),
          livros_lidos INT,
          quantidade_pernas INT
        );
        INSERT INTO membros_familia VALUES (1, 'Dave', 'humano', 200, 2);
        INSERT INTO membros_familia VALUES (2, 'Maria', 'humano', 180, 2);
        INSERT INTO membros_familia VALUES (3, 'Pickles', 'cachorro', 0, 4);
      `;
      tableNames = ["membros_familia"];
      break;

    case "family_null":
      sqlstr = `
        CREATE TABLE membros_familia (
          id INT,
          nome VARCHAR(50),
          genero VARCHAR(20),
          especie VARCHAR(50),
          livro_favorito VARCHAR(100)
        );
        INSERT INTO membros_familia VALUES (1, 'Dave', 'masculino', 'humano', 'O Sol é Para Todos');
        INSERT INTO membros_familia VALUES (2, 'Maria', 'feminino', 'humano', 'E o Vento Levou');
        INSERT INTO membros_familia VALUES (3, 'Pickles', 'masculino', 'cachorro', NULL);
      `;
      tableNames = ["membros_familia"];
      break;

    case "celebs_born":
      sqlstr = `
        CREATE TABLE famosos_nascidos (
          id INT,
          nome VARCHAR(100),
          data_nascimento DATE
        );
        INSERT INTO famosos_nascidos VALUES (1, 'Michael Jordan', '1963-02-17');
        INSERT INTO famosos_nascidos VALUES (2, 'Justin Timberlake', '1981-01-31');
        INSERT INTO famosos_nascidos VALUES (3, 'Taylor Swift', '1989-12-13');
      `;
      tableNames = ["famosos_nascidos"];
      break;

    case "tv":
      sqlstr = `
        CREATE TABLE personagem (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO personagem VALUES (1, 'Doogie Howser');
        INSERT INTO personagem VALUES (2, 'Barney Stinson');
        INSERT INTO personagem VALUES (3, 'Lily Aldrin');
        INSERT INTO personagem VALUES (4, 'Willow Rosenberg');

        CREATE TABLE personagem_serie_tv (
          id INT,
          personagem_id INT,
          nome_serie VARCHAR(100)
        );
        INSERT INTO personagem_serie_tv VALUES (1, 4, 'Buffy the Vampire Slayer');
        INSERT INTO personagem_serie_tv VALUES (2, 3, 'How I Met Your Mother');
        INSERT INTO personagem_serie_tv VALUES (3, 2, 'How I Met Your Mother');
        INSERT INTO personagem_serie_tv VALUES (4, 1, 'Doogie Howser, M.D.');

        CREATE TABLE personagem_ator (
          id INT,
          personagem_id INT,
          nome_ator VARCHAR(100)
        );
        INSERT INTO personagem_ator VALUES (1, 4, 'Alyson Hannigan');
        INSERT INTO personagem_ator VALUES (2, 3, 'Alyson Hannigan');
        INSERT INTO personagem_ator VALUES (3, 2, 'Neil Patrick Harris');
        INSERT INTO personagem_ator VALUES (4, 1, 'Neil Patrick Harris');
      `;
      tableNames = ["personagem", "personagem_serie_tv", "personagem_ator"];
      break;

    case "tv_normalized":
      sqlstr = `
        CREATE TABLE personagem (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO personagem VALUES (1, 'Doogie Howser');
        INSERT INTO personagem VALUES (2, 'Barney Stinson');
        INSERT INTO personagem VALUES (3, 'Lily Aldrin');
        INSERT INTO personagem VALUES (4, 'Willow Rosenberg');

        CREATE TABLE serie_tv (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO serie_tv VALUES (1, 'Buffy the Vampire Slayer');
        INSERT INTO serie_tv VALUES (2, 'How I Met Your Mother');
        INSERT INTO serie_tv VALUES (3, 'Doogie Howser, M.D.');

        CREATE TABLE personagem_serie_tv (
          id INT,
          personagem_id INT,
          serie_tv_id INT
        );
        INSERT INTO personagem_serie_tv VALUES (1, 1, 3);
        INSERT INTO personagem_serie_tv VALUES (2, 2, 2);
        INSERT INTO personagem_serie_tv VALUES (3, 3, 2);
        INSERT INTO personagem_serie_tv VALUES (4, 4, 1);

        CREATE TABLE ator (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO ator VALUES (1, 'Alyson Hannigan');
        INSERT INTO ator VALUES (2, 'Neil Patrick Harris');

        CREATE TABLE personagem_ator (
          id INT,
          personagem_id INT,
          ator_id INT
        );
        INSERT INTO personagem_ator VALUES (1, 1, 2);
        INSERT INTO personagem_ator VALUES (2, 2, 2);
        INSERT INTO personagem_ator VALUES (3, 3, 1);
        INSERT INTO personagem_ator VALUES (4, 4, 1);
      `;
      tableNames = ["personagem", "serie_tv", "personagem_serie_tv", "ator", "personagem_ator"];
      break;

    case "tv_extra":
      sqlstr = `
        CREATE TABLE personagem (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO personagem VALUES (1, 'Doogie Howser');
        INSERT INTO personagem VALUES (2, 'Barney Stinson');
        INSERT INTO personagem VALUES (3, 'Lily Aldrin');
        INSERT INTO personagem VALUES (4, 'Willow Rosenberg');
        INSERT INTO personagem VALUES (5, 'Steve Urkel');
        INSERT INTO personagem VALUES (6, 'Homer Simpson');

        CREATE TABLE serie_tv (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO serie_tv VALUES (1, 'Buffy the Vampire Slayer');
        INSERT INTO serie_tv VALUES (2, 'How I Met Your Mother');
        INSERT INTO serie_tv VALUES (3, 'Doogie Howser, M.D.');
        INSERT INTO serie_tv VALUES (4, 'Friends');

        CREATE TABLE personagem_serie_tv (
          id INT,
          personagem_id INT,
          serie_tv_id INT
        );
        INSERT INTO personagem_serie_tv VALUES (1, 1, 3);
        INSERT INTO personagem_serie_tv VALUES (2, 2, 2);
        INSERT INTO personagem_serie_tv VALUES (3, 3, 2);
        INSERT INTO personagem_serie_tv VALUES (4, 4, 1);

        CREATE TABLE ator (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO ator VALUES (1, 'Alyson Hannigan');
        INSERT INTO ator VALUES (2, 'Neil Patrick Harris');
        INSERT INTO ator VALUES (3, 'Adam Sandler');
        INSERT INTO ator VALUES (4, 'Steve Carell');

        CREATE TABLE personagem_ator (
          id INT,
          personagem_id INT,
          ator_id INT
        );
        INSERT INTO personagem_ator VALUES (1, 1, 2);
        INSERT INTO personagem_ator VALUES (2, 2, 2);
        INSERT INTO personagem_ator VALUES (3, 3, 1);
        INSERT INTO personagem_ator VALUES (4, 4, 1);
      `;
      tableNames = ["personagem", "serie_tv", "personagem_serie_tv", "ator", "personagem_ator"];
      break;

    case "self_join":
      sqlstr = `
        CREATE TABLE jokenpo (
          id INT,
          nome VARCHAR(20),
          vence_id INT
        );
        INSERT INTO jokenpo VALUES (1, 'Pedra', 3);
        INSERT INTO jokenpo VALUES (2, 'Papel', 1);
        INSERT INTO jokenpo VALUES (3, 'Tesoura', 2);

        CREATE TABLE funcionarios (
          id INT,
          nome VARCHAR(100),
          cargo VARCHAR(100),
          chefe_id INT
        );
        INSERT INTO funcionarios VALUES (1, 'Patrício Silva', 'Engenheiro de Software', 2);
        INSERT INTO funcionarios VALUES (2, 'Abigail Ramos', 'Gerente de Engenharia', 3);
        INSERT INTO funcionarios VALUES (3, 'Roberto Carlos', 'Diretor de Engenharia', 4);
        INSERT INTO funcionarios VALUES (4, 'Maxine Tang', 'CEO', NULL);
      `;
      tableNames = ["jokenpo", "funcionarios"];
      break;

    case "robot":
      sqlstr = `
        CREATE TABLE robos (
          id INT,
          nome VARCHAR(100)
        );
        INSERT INTO robos VALUES (1, 'Robô 2000');
        INSERT INTO robos VALUES (2, 'Campeão Robô 2001');
        INSERT INTO robos VALUES (3, 'Dragão');
        INSERT INTO robos VALUES (4, 'Turbo Robô 2002');
        INSERT INTO robos VALUES (5, 'Super Robô 2003');
        INSERT INTO robos VALUES (6, 'Super Turbo Robô 2004');
        INSERT INTO robos VALUES (7, 'Não É Um Robô');
        INSERT INTO robos VALUES (8, 'Turbo Robô Não Lançado 2111');
      `;
      tableNames = ["robos"];
      break;

    case "robot_code":
      sqlstr = `
        CREATE TABLE robos (
          id INT,
          nome VARCHAR(100),
          localizacao VARCHAR(100)
        );
        INSERT INTO robos VALUES (1, 'R2000 - Robô 2000', 'Nova Cidade, NY');
        INSERT INTO robos VALUES (2, 'R2001 - Campeão Robô 2001', 'Palo Alto, CA');
        INSERT INTO robos VALUES (3, 'D0001 - Dragão', 'Nova York, NY');
        INSERT INTO robos VALUES (4, 'R2002 - Turbo Robô 2002', 'Spring Valley, NY');
        INSERT INTO robos VALUES (5, 'R2003 - Super Robô 2003', 'Nyack, NY');
        INSERT INTO robos VALUES (6, 'R2004 - Super Turbo Robô 2004', 'Tampa, FL');
        INSERT INTO robos VALUES (7, 'N0001 - Não É Um Robô', 'Seattle, WA');
        INSERT INTO robos VALUES (8, 'U2111 - Turbo Robô Não Lançado 2111', 'Buffalo, NY');
      `;
      tableNames = ["robos"];
      break;

    case "fighting":
      sqlstr = `
        CREATE TABLE lutadores (
          id INT,
          nome VARCHAR(100),
          pistola VARCHAR(100),
          espada VARCHAR(100),
          tanque VARCHAR(100)
        );
        INSERT INTO lutadores VALUES (1, 'Fuzileiro Naval', 'Pistola 9mm', 'Canivete Suíço', 'Tanque M1A1 Abrams');
        INSERT INTO lutadores VALUES (2, 'John Wilkes Booth', 'Pistola .44 Derringer', NULL, NULL);
        INSERT INTO lutadores VALUES (3, 'Zorro', NULL, 'Espada do Zorro', NULL);
        INSERT INTO lutadores VALUES (4, 'Pedestre Inocente', NULL, NULL, NULL);
      `;
      tableNames = ["lutadores"];
      break;

    case "company":
      sqlstr = `
        CREATE TABLE departamentos (
          id INT PRIMARY KEY,
          nome VARCHAR(50),
          localizacao VARCHAR(50)
        );
        INSERT INTO departamentos VALUES (1, 'Tecnologia', 'São Paulo');
        INSERT INTO departamentos VALUES (2, 'Vendas', 'Rio de Janeiro');
        INSERT INTO departamentos VALUES (3, 'Marketing', 'Belo Horizonte');
        INSERT INTO departamentos VALUES (4, 'Recursos Humanos', 'São Paulo');

        CREATE TABLE funcionarios (
          id INT PRIMARY KEY,
          nome VARCHAR(100),
          cargo VARCHAR(50),
          salario DECIMAL(10,2),
          departamento_id INT,
          chefe_id INT,
          data_admissao DATE
        );
        INSERT INTO funcionarios VALUES (1, 'Ana Costa', 'Diretora Executiva', 15000.00, 1, NULL, '2020-01-15');
        INSERT INTO funcionarios VALUES (2, 'Carlos Souza', 'Gerente de TI', 9500.00, 1, 1, '2021-03-10');
        INSERT INTO funcionarios VALUES (3, 'Beatriz Lima', 'Engenheira de Software', 7500.00, 1, 2, '2022-06-01');
        INSERT INTO funcionarios VALUES (4, 'Daniel Alves', 'Engenheiro de Software Senior', 11000.00, 1, 2, '2020-11-20');
        INSERT INTO funcionarios VALUES (5, 'Eduarda Santos', 'Gerente de Vendas', 9000.00, 2, 1, '2021-05-18');
        INSERT INTO funcionarios VALUES (6, 'Fabio Neves', 'Analista de Vendas', 4500.00, 2, 5, '2023-01-10');
        INSERT INTO funcionarios VALUES (7, 'Gisele Rocha', 'Analista de Vendas', 4800.00, 2, 5, '2022-09-15');
        INSERT INTO funcionarios VALUES (8, 'Hugo Ramos', 'Coordenador de Marketing', 6200.00, 3, 1, '2022-02-11');
        INSERT INTO funcionarios VALUES (9, 'Isabela Cruz', 'Designer Grafico', 4000.00, 3, 8, '2023-04-01');
        INSERT INTO funcionarios VALUES (10, 'Jonas Pereira', 'Analista de Recursos Humanos', 5000.00, 4, 1, '2021-08-01');
      `;
      tableNames = ["departamentos", "funcionarios"];
      break;

    case "store":
      sqlstr = `
        CREATE TABLE clientes (
          id INT PRIMARY KEY,
          nome VARCHAR(100),
          cidade VARCHAR(50),
          estado VARCHAR(2)
        );
        INSERT INTO clientes VALUES (1, 'Lucas Silva', 'São Paulo', 'SP');
        INSERT INTO clientes VALUES (2, 'Mariana Oliveira', 'Campinas', 'SP');
        INSERT INTO clientes VALUES (3, 'Pedro Santos', 'Niterói', 'RJ');
        INSERT INTO clientes VALUES (4, 'Carla Diaz', 'Belo Horizonte', 'MG');
        INSERT INTO clientes VALUES (5, 'Rodrigo Lima', 'Porto Alegre', 'RS');

        CREATE TABLE produtos (
          id INT PRIMARY KEY,
          nome VARCHAR(100),
          categoria VARCHAR(50),
          preco DECIMAL(10,2),
          estoque INT
        );
        INSERT INTO produtos VALUES (1, 'Notebook Pro', 'Eletronicos', 5500.00, 15);
        INSERT INTO produtos VALUES (2, 'Smartphone X', 'Eletronicos', 3200.00, 28);
        INSERT INTO produtos VALUES (3, 'Monitor 27', 'Eletronicos', 1400.00, 8);
        INSERT INTO produtos VALUES (4, 'Mesa de Escritorio', 'Moveis', 650.00, 10);
        INSERT INTO produtos VALUES (5, 'Cadeira Ergonomica', 'Moveis', 950.00, 12);
        INSERT INTO produtos VALUES (6, 'Teclado Mecanico', 'Acessorios', 350.00, 40);
        INSERT INTO produtos VALUES (7, 'Mouse Gamer', 'Acessorios', 220.00, 50);

        CREATE TABLE vendas (
          id INT PRIMARY KEY,
          cliente_id INT,
          produto_id INT,
          quantidade INT,
          data_venda DATE
        );
        INSERT INTO vendas VALUES (101, 1, 1, 1, '2023-10-01');
        INSERT INTO vendas VALUES (102, 1, 6, 2, '2023-10-01');
        INSERT INTO vendas VALUES (103, 2, 2, 1, '2023-10-02');
        INSERT INTO vendas VALUES (104, 3, 4, 1, '2023-10-03');
        INSERT INTO vendas VALUES (105, 3, 5, 1, '2023-10-03');
        INSERT INTO vendas VALUES (106, 4, 3, 2, '2023-10-04');
        INSERT INTO vendas VALUES (107, 5, 2, 1, '2023-10-05');
        INSERT INTO vendas VALUES (108, 1, 3, 1, '2023-10-06');
        INSERT INTO vendas VALUES (109, 2, 7, 3, '2023-10-07');
        INSERT INTO vendas VALUES (110, 4, 6, 1, '2023-10-08');
      `;
      tableNames = ["clientes", "produtos", "vendas"];
      break;
  }

  // Executa o script de inicialização das tabelas
  db.run(sqlstr);

  return { db, tableNames };
}

// Helper para converter os resultados do SQL.js em formato de Tabela HTML
function generateHTMLTable(res) {
  if (!res || res.length === 0) {
    return "<div class='no-results'>Nenhum dado retornado.</div>";
  }

  let html = "<div class='table-responsive'><table class='result-table'>";
  
  // Cabeçalho
  html += "<thead><tr>";
  for (let col of res[0].columns) {
    html += `<th>${col}</th>`;
  }
  html += "</tr></thead>";

  // Linhas
  html += "<tbody>";
  for (let row of res[0].values) {
    html += "<tr>";
    for (let val of row) {
      const displayVal = val === null ? "<span class='null-value'>NULL</span>" : val;
      html += `<td>${displayVal}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table></div>";

  return html;
}
