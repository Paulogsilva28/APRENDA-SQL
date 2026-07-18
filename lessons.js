const levels = [
  {
    name: "SELECT *",
    short_name: "select",
    database_type: "family",
    correct_query: "SELECT * FROM membros_familia;",
    initial_query: "",
    prompt: `No SQL, os dados ficam em tabelas. Vamos selecionar todos os dados da tabela de exemplo. Execute:<br/>
    <code>SELECT * FROM membros_familia;</code><br/>
    O caractere <code>*</code> retorna todas as colunas da tabela.`
  },
  {
    name: "SELECT colunas específicas",
    short_name: "select_columns",
    database_type: "family",
    correct_query: "SELECT nome, especie FROM membros_familia;",
    initial_query: "",
    prompt: `Podemos buscar apenas colunas específicas separando os seus nomes por vírgula.<br/>
    Selecione apenas as colunas <strong>nome</strong> e <strong>especie</strong> da tabela <strong>membros_familia</strong>.`
  },
  {
    name: "WHERE ... Igualdade",
    short_name: "where_equals",
    database_type: "family",
    correct_query: "SELECT * FROM membros_familia WHERE especie = 'cachorro';",
    initial_query: "",
    prompt: `Use a cláusula <code>WHERE</code> para filtrar linhas. Para textos, use aspas simples.<br/>
    Retorne as linhas de <strong>membros_familia</strong> onde a coluna <strong>especie</strong> seja igual a <strong>'cachorro'</strong>.`
  },
  {
    name: "WHERE ... Maior que",
    short_name: "where_greater_than",
    database_type: "family",
    correct_query: "SELECT * FROM membros_familia WHERE livros_lidos > 190;",
    initial_query: "",
    prompt: `Use o operador <code>&gt;</code> para filtrar valores maiores que um número.<br/>
    Busque os registros em <strong>membros_familia</strong> onde <strong>livros_lidos</strong> seja maior que 190.`
  },
  {
    name: "WHERE ... Maior ou igual",
    short_name: "where_greater_than_or_equal",
    database_type: "family",
    correct_query: "SELECT * FROM membros_familia WHERE livros_lidos >= 180;",
    initial_query: "",
    prompt: `Use o operador <code>&gt;=</code> para filtrar valores maiores ou iguais a um número.<br/>
    Retorne os registros em <strong>membros_familia</strong> onde <strong>livros_lidos</strong> seja maior ou igual a 180.`
  },
  {
    name: "Operador AND",
    short_name: "and",
    database_type: "friends_of_pickles",
    correct_query: "SELECT * FROM amigos_do_pickles WHERE especie = 'cachorro' AND altura_cm < 45;",
    initial_query: "",
    prompt: `Combine filtros com o operador <code>AND</code> (ambas as condições devem ser verdadeiras).<br/>
    Encontre os amigos que sejam da espécie <strong>'cachorro'</strong> E tenham <strong>altura_cm</strong> menor que 45.`
  },
  {
    name: "Operador OR",
    short_name: "or",
    database_type: "friends_of_pickles",
    correct_query: "SELECT * FROM amigos_do_pickles WHERE especie = 'cachorro' OR altura_cm < 45;",
    initial_query: "",
    prompt: `Combine filtros com o operador <code>OR</code> (pelo menos uma das condições deve ser verdadeira).<br/>
    Encontre os amigos que sejam da espécie <strong>'cachorro'</strong> OU tenham <strong>altura_cm</strong> menor que 45.`
  },
  {
    name: "Operador IN",
    short_name: "in",
    database_type: "friends_of_pickles",
    correct_query: "SELECT * FROM amigos_do_pickles WHERE especie NOT IN ('gato', 'cachorro');",
    initial_query: "",
    prompt: `O operador <code>IN</code> verifica se um valor pertence a uma lista. O <code>NOT IN</code> nega a lista.<br/>
    Retorne as linhas de <strong>amigos_do_pickles</strong> onde a <strong>especie</strong> <strong>não</strong> esteja na lista <strong>('gato', 'cachorro')</strong>.`
  },
  {
    name: "DISTINCT (Valores Únicos)",
    short_name: "distinct",
    database_type: "friends_of_pickles",
    correct_query: "SELECT DISTINCT especie FROM amigos_do_pickles WHERE altura_cm > 50;",
    initial_query: "",
    prompt: `Insira <code>DISTINCT</code> antes das colunas para remover linhas duplicadas no resultado.<br/>
    Retorne a lista de espécies <strong>distintas</strong> dos amigos que possuem <strong>altura_cm</strong> maior que 50.`
  },
  {
    name: "ORDER BY (Ordenação)",
    short_name: "order_by",
    database_type: "friends_of_pickles",
    correct_query: "SELECT * FROM amigos_do_pickles ORDER BY altura_cm DESC;",
    initial_query: "",
    prompt: `Ordene os resultados com <code>ORDER BY nome_coluna</code>. Adicione <code>DESC</code> para ordem decrescente.<br/>
    Ordene a tabela <strong>amigos_do_pickles</strong> pela coluna <strong>altura_cm</strong> do maior para o menor.`
  },
  {
    name: "LIMIT (Limitar Resultados)",
    short_name: "limit",
    database_type: "friends_of_pickles",
    correct_query: "SELECT * FROM amigos_do_pickles ORDER BY altura_cm DESC LIMIT 1;",
    initial_query: "",
    prompt: `Limite a quantidade de linhas retornadas com o comando <code>LIMIT número</code>.<br/>
    Retorne apenas a linha correspondente ao amigo <strong>mais alto</strong> da tabela <strong>amigos_do_pickles</strong>.`
  },
  {
    name: "COUNT(*)",
    short_name: "count",
    database_type: "friends_of_pickles",
    correct_query: "SELECT COUNT(*) FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `A função <code>COUNT(*)</code> conta a quantidade de registros em uma tabela.<br/>
    Execute uma consulta para contar a quantidade total de amigos na tabela <strong>amigos_do_pickles</strong>.`
  },
  {
    name: "COUNT(*) ... WHERE",
    short_name: "count_where",
    database_type: "friends_of_pickles",
    correct_query: "SELECT COUNT(*) FROM amigos_do_pickles WHERE especie = 'cachorro';",
    initial_query: "",
    prompt: `Você pode usar <code>COUNT(*)</code> combinado com filtros <code>WHERE</code>.<br/>
    Retorne a quantidade total de amigos que são da espécie <strong>'cachorro'</strong>.`
  },
  {
    name: "SUM (Soma)",
    short_name: "sum",
    database_type: "family_and_legs",
    correct_query: "SELECT SUM(livros_lidos) FROM membros_familia;",
    initial_query: "",
    prompt: `A função <code>SUM(coluna)</code> soma todos os valores numéricos de uma coluna.<br/>
    Escreva uma consulta que retorne a soma total de <strong>livros_lidos</strong> por todos na tabela <strong>membros_familia</strong>.`
  },
  {
    name: "AVG (Média)",
    short_name: "avg",
    database_type: "family_and_legs",
    correct_query: "SELECT AVG(livros_lidos) FROM membros_familia;",
    initial_query: "",
    prompt: `A função <code>AVG(coluna)</code> calcula a média aritmética de uma coluna numérica.<br/>
    Retorne a média de <strong>livros_lidos</strong> pelos membros da família.`
  },
  {
    name: "MAX e MIN (Máximo e Mínimo)",
    short_name: "max_min",
    database_type: "family_and_legs",
    correct_query: "SELECT MAX(livros_lidos) FROM membros_familia;",
    initial_query: "",
    prompt: `As funções <code>MAX(coluna)</code> e <code>MIN(coluna)</code> encontram os valores máximo e mínimo.<br/>
    Busque o valor máximo de <strong>livros_lidos</strong> na tabela <strong>membros_familia</strong>.`
  },
  {
    name: "GROUP BY (Agrupamento)",
    short_name: "group_by",
    database_type: "friends_of_pickles",
    correct_query: "SELECT MAX(altura_cm), especie FROM amigos_do_pickles GROUP BY especie;",
    initial_query: "",
    prompt: `Agrupe linhas com <code>GROUP BY nome_coluna</code> para calcular valores agregados por grupo.<br/>
    Retorne a <strong>altura máxima</strong> (usando <code>MAX</code>) e o nome da <strong>especie</strong>, agrupando por <strong>especie</strong>.`
  },
  {
    name: "Subconsultas (Nested Queries)",
    short_name: "nested",
    database_type: "family_and_legs",
    correct_query: "SELECT * FROM membros_familia WHERE livros_lidos = (SELECT MAX(livros_lidos) FROM membros_familia);",
    initial_query: "",
    required: ["(", ")"],
    custom_error_message: "Utilize parênteses para fazer uma subconsulta.",
    prompt: `Você pode aninhar uma consulta dentro de outra usando parênteses.<br/>
    Retorne os dados dos membros da família que leram a quantidade <strong>máxima</strong> de livros (use <code>(SELECT MAX(livros_lidos) FROM...)</code>).`
  },
  {
    name: "NULL (Valores Nulos)",
    short_name: "null",
    database_type: "family_null",
    correct_query: "SELECT * FROM membros_familia WHERE livro_favorito IS NOT NULL;",
    initial_query: "",
    prompt: `Valores em branco são representados por <code>NULL</code>. Filtre usando <code>IS NULL</code> ou <code>IS NOT NULL</code>.<br/>
    Busque todos os membros da família cuja coluna <strong>livro_favorito</strong> <strong>não seja nula</strong>.`
  },
  {
    name: "Datas",
    short_name: "date",
    database_type: "celebs_born",
    correct_query: "SELECT * FROM famosos_nascidos WHERE data_nascimento > '1980-09-01';",
    initial_query: "",
    prompt: `Comparamos datas no formato padrão AAAA-MM-DD.<br/>
    Retorne as celebridades na tabela <strong>famosos_nascidos</strong> que nasceram <strong>depois de 1980-09-01</strong>.`
  },
  {
    name: "INNER JOIN (Junção)",
    short_name: "joins",
    database_type: "tv",
    correct_query: "SELECT personagem.nome, personagem_ator.nome_ator FROM personagem INNER JOIN personagem_ator ON personagem.id = personagem_ator.personagem_id;",
    initial_query: "",
    prompt: `Use <code>INNER JOIN tabela2 ON col1 = col2</code> para cruzar tabelas com colunas em comum.<br/>
    Junte as tabelas <strong>personagem</strong> e <strong>personagem_ator</strong> com base no ID do personagem. Retorne <strong>personagem.nome</strong> e <strong>personagem_ator.nome_ator</strong>.`
  },
  {
    name: "Múltiplos Joins",
    short_name: "multiple_joins",
    database_type: "tv_normalized",
    correct_query: "SELECT personagem.nome, ator.nome FROM personagem INNER JOIN personagem_ator ON personagem.id = personagem_ator.personagem_id INNER JOIN ator ON personagem_ator.ator_id = ator.id;",
    initial_query: "",
    prompt: `Você pode realizar vários JOINs encadeados em sequência para buscar dados em tabelas normalizadas.<br/>
    Junte as tabelas <strong>personagem</strong>, <strong>personagem_ator</strong> e <strong>ator</strong>. Retorne as colunas <strong>personagem.nome</strong> e <strong>ator.nome</strong>.`
  },
  {
    name: "Joins com WHERE",
    short_name: "joins_with_where",
    database_type: "tv_normalized",
    correct_query: "SELECT personagem.nome, serie_tv.nome FROM personagem INNER JOIN personagem_serie_tv ON personagem.id = personagem_serie_tv.personagem_id INNER JOIN serie_tv ON personagem_serie_tv.serie_tv_id = serie_tv.id WHERE personagem.nome != 'Willow Rosenberg' AND serie_tv.nome != 'How I Met Your Mother';",
    initial_query: "",
    required: ["Willow Rosenberg", "How I Met Your Mother"],
    prompt: `Você pode filtrar resultados de junções de tabelas adicionando a cláusula <code>WHERE</code> após os joins.<br/>
    Junte personagem e sua respectiva série. Filtre para <strong>excluir</strong> o personagem <strong>'Willow Rosenberg'</strong> E a série <strong>'How I Met Your Mother'</strong>.`
  },
  {
    name: "LEFT JOIN (Junção Esquerda)",
    short_name: "left_joins",
    database_type: "tv_extra",
    correct_query: "SELECT personagem.nome, ator.nome FROM personagem LEFT JOIN personagem_ator ON personagem.id = personagem_ator.personagem_id LEFT JOIN ator ON personagem_ator.ator_id = ator.id;",
    initial_query: "",
    prompt: `O <code>LEFT JOIN</code> preserva todas as linhas da primeira tabela, mesmo sem par na segunda.<br/>
    Use <code>LEFT JOIN</code> entre as tabelas <strong>personagem</strong>, <strong>personagem_ator</strong> e <strong>ator</strong>. Retorne <strong>personagem.nome</strong> e <strong>ator.nome</strong>.`
  },
  {
    name: "Alias de Tabela (Apelidos)",
    short_name: "table_alias",
    database_type: "tv_extra",
    correct_query: "SELECT c.nome, a.nome FROM personagem AS c LEFT JOIN personagem_ator AS pa ON c.id = pa.personagem_id LEFT JOIN ator AS a ON pa.ator_id = a.id;",
    initial_query: "",
    required: ["AS", "c.nome", "a.nome"],
    prompt: `Apelide tabelas no FROM usando <code>AS apelido</code> para encurtar suas queries.<br/>
    Reescreva a consulta anterior usando os apelidos <strong>c</strong> para personagem, <strong>pa</strong> para personagem_ator e <strong>a</strong> para ator.`
  },
  {
    name: "Alias de Colunas",
    short_name: "column_alias",
    database_type: "tv_extra",
    correct_query: "SELECT personagem.nome AS personagem, ator.nome AS ator FROM personagem LEFT JOIN personagem_ator ON personagem.id = personagem_ator.personagem_id LEFT JOIN ator ON personagem_ator.ator_id = ator.id;",
    initial_query: "",
    prompt: `Apelide colunas do SELECT com <code>AS novo_nome</code> para renomear os cabeçalhos das colunas.<br/>
    Refaça o LEFT JOIN anterior, apelidando a coluna do nome do personagem de <strong>personagem</strong> e a do ator de <strong>ator</strong>.`
  },
  {
    name: "SELF JOIN (Junção Consigo)",
    short_name: "self_join",
    database_type: "self_join",
    correct_query: "SELECT f1.nome AS nome_funcionario, f2.nome AS nome_chefe FROM funcionarios AS f1 INNER JOIN funcionarios AS f2 ON f1.chefe_id = f2.id;",
    initial_query: "",
    prompt: `Um SELF JOIN junta uma tabela consigo mesma. Use apelidos distintos como <code>f1</code> e <code>f2</code>.<br/>
    Junte a tabela <strong>funcionarios</strong> consigo mesma para descobrir o nome do funcionário e o de seu respectivo chefe. Apelide as colunas de <strong>nome_funcionario</strong> e <strong>nome_chefe</strong>.`
  },
  {
    name: "Operador LIKE (Busca Textual)",
    short_name: "like",
    database_type: "robot",
    correct_query: "SELECT * FROM robos WHERE nome LIKE '%Robô 20__%';",
    initial_query: "",
    prompt: `Use <code>LIKE</code> com curingas: <code>%</code> (qualquer quantidade de caracteres) ou <code>_</code> (um único caractere).<br/>
    Busque os robôs na tabela <strong>robos</strong> que contenham a palavra <strong>'Robô'</strong> seguida de um ano nos anos 2000 (entre 2000 e 2099).`
  },
  {
    name: "Expressão CASE (Condicionais)",
    short_name: "case",
    database_type: "friends_of_pickles",
    correct_query: "SELECT *, CASE WHEN especie = 'humano' THEN 'falar' WHEN especie = 'cachorro' THEN 'latir' ELSE 'miar' END AS som FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `A estrutura <code>CASE WHEN cond THEN val ELSE padrao END</code> cria colunas condicionais.<br/>
    Selecione todos os campos da tabela <strong>amigos_do_pickles</strong> e crie a coluna <strong>som</strong>: retorne 'falar' para humanos, 'latir' para cachorros e 'miar' para gatos.`
  },
  {
    name: "Função SUBSTR (Substrings)",
    short_name: "substr",
    database_type: "robot_code",
    correct_query: "SELECT * FROM robos WHERE SUBSTR(localizacao, -2) = 'NY';",
    initial_query: "",
    prompt: `A função <code>SUBSTR(coluna, inicio, tamanho)</code> extrai partes de textos. Índices negativos contam a partir do final.<br/>
    Selecione os robôs na tabela <strong>robos</strong> localizados no estado de <strong>'NY'</strong> (últimos dois caracteres da localização).`
  },
  {
    name: "Função COALESCE",
    short_name: "coalesce",
    database_type: "fighting",
    correct_query: "SELECT nome, COALESCE(tanque, pistola, espada) AS arma FROM lutadores;",
    initial_query: "",
    prompt: `A função <code>COALESCE(c1, c2, c3)</code> avalia os campos e retorna o primeiro valor não nulo encontrado da esquerda para a direita.<br/>
    Selecione a coluna <strong>nome</strong> e uma coluna apelidada de <strong>arma</strong> que retorne o primeiro valor não nulo entre <strong>tanque</strong>, <strong>pistola</strong> e <strong>espada</strong>.`
  },
  {
    name: "CROSS JOIN (Junção Cruzada)",
    short_name: "cross_join",
    database_type: "self_join",
    correct_query: "SELECT r1.nome AS jogada1, r2.nome AS jogada2 FROM jokenpo AS r1 CROSS JOIN jokenpo AS r2;",
    initial_query: "",
    prompt: `O <code>CROSS JOIN</code> produz o produto cartesiano (todas as combinações possíveis entre as tabelas).<br/>
    Realize um CROSS JOIN da tabela <strong>jokenpo</strong> consigo mesma. Apelide as colunas resultantes de <strong>jogada1</strong> e <strong>jogada2</strong>.`
  },
  {
    name: "NATURAL JOIN",
    short_name: "natural_join",
    database_type: "tv_normalized",
    correct_query: "SELECT * FROM personagem NATURAL JOIN personagem_ator;",
    initial_query: "",
    prompt: `O <code>NATURAL JOIN</code> junta tabelas automaticamente pelas colunas com nomes idênticos de forma implícita.<br/>
    Execute uma consulta cruzando as tabelas <strong>personagem</strong> e <strong>personagem_ator</strong> usando <strong>NATURAL JOIN</strong>.`
  },
  {
    name: "Self Join Avançado",
    short_name: "self_join_advanced",
    database_type: "self_join",
    correct_query: "SELECT r1.nome AS vencedor, r2.nome AS perdedor FROM jokenpo AS r1 INNER JOIN jokenpo AS r2 ON r1.vence_id = r2.id;",
    initial_query: "",
    prompt: `Utilize junções internas (INNER JOIN) com aliases de tabela para mapear relações complexas de um mesmo arquivo.<br/>
    Junte a tabela <strong>jokenpo</strong> consigo mesma para retornar duas colunas: <strong>vencedor</strong> e <strong>perdedor</strong>, baseando-se no ID do perdedor derrotado.`
  },
  {
    name: "LENGTH (Tamanho de Texto)",
    short_name: "length",
    database_type: "friends_of_pickles",
    correct_query: "SELECT nome, LENGTH(nome) AS tamanho FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `A função <code>LENGTH(coluna)</code> retorna a quantidade de caracteres em uma string.<br/>
    Selecione a coluna <strong>nome</strong> de todos os amigos e uma coluna apelidada de <strong>tamanho</strong> contendo o tamanho do nome.`
  },
  {
    name: "UPPER (Maiúsculas)",
    short_name: "upper",
    database_type: "friends_of_pickles",
    correct_query: "SELECT UPPER(nome) AS nome_maiusculo FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `A função <code>UPPER(coluna)</code> converte todos os caracteres de uma string para maiúsculas.<br/>
    Retorne a coluna <strong>nome</strong> formatada em maiúsculas com o apelido de <strong>nome_maiusculo</strong>.`
  },
  {
    name: "LOWER (Minúsculas)",
    short_name: "lower",
    database_type: "friends_of_pickles",
    correct_query: "SELECT LOWER(nome) AS nome_minusculo FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `A função <code>LOWER(coluna)</code> converte todos os caracteres de uma string para minúsculas.<br/>
    Retorne o nome de todos os amigos em minúsculas com a coluna apelidada de <strong>nome_minusculo</strong>.`
  },
  {
    name: "REPLACE (Substituição)",
    short_name: "replace",
    database_type: "robot",
    correct_query: "SELECT REPLACE(nome, 'Robô', 'Cyborg') AS nome_alterado FROM robos;",
    initial_query: "",
    prompt: `A função <code>REPLACE(coluna, texto_antigo, texto_novo)</code> substitui trechos de texto em uma coluna.<br/>
    Substitua a palavra 'Robô' por 'Cyborg' na coluna nome da tabela <strong>robos</strong>. Nomeie a coluna como <strong>nome_alterado</strong>.`
  },
  {
    name: "TRIM (Aparar Espaços)",
    short_name: "trim",
    database_type: "robot_code",
    correct_query: "SELECT TRIM(location) AS local_limpo FROM (SELECT '  São Paulo  ' AS location);",
    initial_query: "SELECT '  São Paulo  ' AS location;",
    prompt: `A função <code>TRIM(coluna)</code> remove espaços em branco extras no início e no final de um texto.<br/>
    Aplique a função <code>TRIM</code> na string de entrada fornecida na consulta inicial e nomeie a coluna resultante como <strong>local_limpo</strong>.`
  },
  {
    name: "INSTR (Localizar caractere)",
    short_name: "instr",
    database_type: "robot_code",
    correct_query: "SELECT nome, INSTR(nome, '-') AS posicao_traco FROM robos;",
    initial_query: "",
    prompt: `A função <code>INSTR(coluna, caractere)</code> retorna a posição (1-indexada) da primeira ocorrência de um caractere em um texto.<br/>
    Encontre a posição do caractere traço (<strong>'-'</strong>) na coluna <strong>nome</strong> de todos os registros da tabela <strong>robos</strong>. Nomeie a coluna como <strong>posicao_traco</strong>.`
  },
  {
    name: "Concatenação com ||",
    short_name: "concat",
    database_type: "friends_of_pickles",
    correct_query: "SELECT nome || ' é um ' || especie AS descricao FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `No SQLite, juntamos strings usando o operador de concatenação <code>||</code>.<br/>
    Crie uma coluna chamada <strong>descricao</strong> que junte o nome, o texto ' é um ' e a espécie do amigo (ex: 'Dave é um humano').`
  },
  {
    name: "ROUND (Arredondamento)",
    short_name: "round",
    database_type: "company",
    correct_query: "SELECT nome, ROUND(salario / 3, 2) AS divisao_salario FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>ROUND(numero, casas_decimais)</code> arredonda números decimais.<br/>
    Selecione a coluna <strong>nome</strong> e divida o salário por 3, arredondando o resultado com 2 casas decimais na coluna <strong>divisao_salario</strong>.`
  },
  {
    name: "ABS (Valor Absoluto)",
    short_name: "abs",
    database_type: "friends_of_pickles",
    correct_query: "SELECT nome, ABS(altura_cm - 100) AS diferenca_absoluta FROM amigos_do_pickles;",
    initial_query: "",
    prompt: `A função <code>ABS(numero)</code> retorna o valor positivo (absoluto) de um número, removendo qualquer sinal negativo.<br/>
    Calcule a diferença absoluta da altura de cada amigo em relação a 100cm (ou seja: <code>ABS(altura_cm - 100)</code>). Apelide de <strong>diferenca_absoluta</strong>.`
  },
  {
    name: "Resto da Divisão (%)",
    short_name: "mod",
    database_type: "friends_of_pickles",
    correct_query: "SELECT id, nome FROM amigos_do_pickles WHERE id % 2 = 0;",
    initial_query: "",
    prompt: `O operador <code>%</code> (módulo) retorna o resto de uma divisão inteira.<br/>
    Retorne o <strong>id</strong> e o <strong>nome</strong> de todos os amigos da tabela cujo <strong>id seja um número par</strong> (resto da divisão por 2 igual a 0).`
  },
  {
    name: "Operações Aritméticas",
    short_name: "arithmetic",
    database_type: "company",
    correct_query: "SELECT nome, salario, salario * 1.10 AS novo_salario FROM funcionarios;",
    initial_query: "",
    prompt: `Você pode somar (+), subtrair (-), multiplicar (*) e dividir (/) valores de colunas diretamente no SELECT.<br/>
    Retorne o <strong>nome</strong>, o <strong>salario</strong> atual e uma coluna com 10% de aumento chamada <strong>novo_salario</strong>.`
  },
  {
    name: "Função NULLIF",
    short_name: "nullif",
    database_type: "company",
    correct_query: "SELECT nome, NULLIF(cargo, 'Analista de Vendas') AS cargo_filtrado FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>NULLIF(c1, c2)</code> compara dois argumentos e retorna <code>NULL</code> se eles forem iguais. Caso contrário, retorna o valor de c1.<br/>
    Selecione a coluna <strong>nome</strong> e aplique a função <code>NULLIF</code> na coluna <strong>cargo</strong>, retornando NULL se o cargo for 'Analista de Vendas'. Nomeie a coluna como <strong>cargo_filtrado</strong>.`
  },
  {
    name: "Função IFNULL",
    short_name: "ifnull",
    database_type: "self_join",
    correct_query: "SELECT nome, IFNULL(chefe_id, 0) AS id_chefe FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>IFNULL(c1, substituto)</code> substitui um valor por um padrão caso c1 seja nulo (similar ao COALESCE).<br/>
    Retorne o <strong>nome</strong> e a coluna <strong>chefe_id</strong> substituída por <strong>0</strong> caso o funcionário não tenha chefe. Apelide a coluna de <strong>id_chefe</strong>.`
  },
  {
    name: "Função DATE (Tratamento de Datas)",
    short_name: "date_func",
    database_type: "celebs_born",
    correct_query: "SELECT DATE(birthdate) AS data_formatada FROM celebs_born;",
    initial_query: "",
    prompt: `A função <code>DATE(coluna)</code> formata e extrai a data de campos de data e hora.<br/>
    Use a função <code>DATE</code> sobre a coluna <strong>birthdate</strong> e nomeie como <strong>data_formatada</strong>.`
  },
  {
    name: "Função TIME",
    short_name: "time_func",
    database_type: "celebs_born",
    correct_query: "SELECT TIME('13:30:15') AS hora_extraida;",
    initial_query: "",
    prompt: `A função <code>TIME(tempo)</code> formata strings ou dados de tempo no padrão HH:MM:SS.<br/>
    Execute a função <code>TIME</code> com a string '13:30:15' e apelide o resultado de <strong>hora_extraida</strong>.`
  },
  {
    name: "Função DATETIME",
    short_name: "datetime_func",
    database_type: "celebs_born",
    correct_query: "SELECT DATETIME('2026-07-18 13:30:15') AS data_hora;",
    initial_query: "",
    prompt: `A função <code>DATETIME(valor)</code> retorna a data e hora combinadas no formato AAAA-MM-DD HH:MM:SS.<br/>
    Selecione a string '2026-07-18 13:30:15' formatada como datetime na coluna <strong>data_hora</strong>.`
  },
  {
    name: "Função STRFTIME",
    short_name: "strftime",
    database_type: "celebs_born",
    correct_query: "SELECT STRFTIME('%Y', birthdate) AS ano_nascimento FROM celebs_born;",
    initial_query: "",
    prompt: `Use a função <code>STRFTIME(formato, data)</code> para extrair partes específicas de uma data (como <code>%Y</code> para ano, <code>%m</code> para mês, <code>%d</code> para dia).<br/>
    Extraia apenas o **ano de nascimento** da coluna <strong>birthdate</strong> e nomeie a coluna resultante como <strong>ano_nascimento</strong>.`
  },
  {
    name: "Operações com Intervalo de Dias",
    short_name: "date_add",
    database_type: "celebs_born",
    correct_query: "SELECT DATE(birthdate, '+1 year') AS ano_seguinte FROM celebs_born;",
    initial_query: "",
    prompt: `Podemos somar ou subtrair períodos de tempo em datas passando modificadores extras, como <code>'+1 day'</code> ou <code>'-2 months'</code>.<br/>
    Selecione a data de nascimento adicionada de **1 ano** (<code>'+1 year'</code>). Nomeie a coluna como <strong>ano_seguinte</strong>.`
  },
  {
    name: "Diferença com JULIANDAY",
    short_name: "julianday",
    database_type: "company",
    correct_query: "SELECT nome, CAST(JULIANDAY('2023-12-31') - JULIANDAY(data_admissao) AS INT) AS dias_empresa FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>JULIANDAY(data)</code> retorna o dia juliano correspondente. Subtrair dois dias julianos dá a diferença em dias corridos.<br/>
    Calcule quantos dias cada funcionário tinha de empresa no dia '2023-12-31' baseando-se na **data_admissao**. Use <code>CAST(... AS INT)</code> e apelide de <strong>dias_empresa</strong>.`
  },
  {
    name: "Subconsultas Correlacionadas",
    short_name: "correlated_subquery",
    database_type: "company",
    correct_query: "SELECT nome, salario FROM funcionarios AS f1 WHERE salario > (SELECT AVG(salario) FROM funcionarios AS f2 WHERE f2.departamento_id = f1.departamento_id);",
    initial_query: "",
    prompt: `Uma subconsulta correlacionada depende de valores da consulta externa (referenciando os aliases de fora).<br/>
    Busque os funcionários cujo salário seja **maior que a média salarial do seu próprio departamento**.`
  },
  {
    name: "Operador EXISTS",
    short_name: "exists",
    database_type: "company",
    correct_query: "SELECT * FROM departamentos AS d WHERE EXISTS (SELECT 1 FROM funcionarios AS f WHERE f.departamento_id = d.id AND f.salario > 10000);",
    initial_query: "",
    prompt: `O operador <code>EXISTS(subquery)</code> verifica se a subconsulta retorna pelo menos uma linha.<br/>
    Retorne os registros de <strong>departamentos</strong> que possuem pelo menos um funcionário com salário maior que 10000.`
  },
  {
    name: "Operador NOT EXISTS",
    short_name: "not_exists",
    database_type: "company",
    correct_query: "SELECT * FROM departamentos AS d WHERE NOT EXISTS (SELECT 1 FROM funcionarios AS f WHERE f.departamento_id = d.id);",
    initial_query: "",
    prompt: `O operador <code>NOT EXISTS</code> filtra registros de forma oposta, selecionando quando a subconsulta não encontra nada.<br/>
    Selecione os departamentos que **não possuem nenhum funcionário cadastrado** neles.`
  },
  {
    name: "Cláusula HAVING",
    short_name: "having",
    database_type: "company",
    correct_query: "SELECT departamento_id, AVG(salario) AS media_salario FROM funcionarios GROUP BY departamento_id HAVING media_salario > 6000;",
    initial_query: "",
    prompt: `Use a cláusula <code>HAVING</code> para aplicar filtros após o agrupamento (em cima de funções agregadoras).<br/>
    Retorne a média salarial e o **departamento_id** agrupado, mantendo apenas os grupos com **média de salário superior a 6000**.`
  },
  {
    name: "INSERT INTO (Inserir Registro)",
    short_name: "insert_basic",
    database_type: "family",
    correct_query: "INSERT INTO membros_familia VALUES (4, 'Totó', 'masculino', 'cachorro', 0);",
    initial_query: "",
    prompt: `O comando <code>INSERT INTO tabela VALUES (val1, val2, ...);</code> insere novos registros na tabela de dados.<br/>
    Insira o cachorro **Totó** (id=4, nome='Totó', gênero='masculino', espécie='cachorro', livros_lidos=0) na tabela <strong>membros_familia</strong>.`
  },
  {
    name: "INSERT INTO Múltiplas Linhas",
    short_name: "insert_multiple",
    database_type: "family",
    correct_query: "INSERT INTO membros_familia VALUES (4, 'Totó', 'masculino', 'cachorro', 0), (5, 'Mimi', 'feminino', 'gato', 0);",
    initial_query: "",
    prompt: `Podemos inserir vários registros de uma vez separando as tuplas de dados por vírgula.<br/>
    Insira os animais **Totó** (4, 'Totó', 'masculino', 'cachorro', 0) e **Mimi** (5, 'Mimi', 'feminino', 'gato', 0) na tabela <strong>membros_familia</strong>.`
  },
  {
    name: "INSERT INTO a partir de SELECT",
    short_name: "insert_select",
    database_type: "company",
    correct_query: "INSERT INTO funcionarios (id, nome, cargo, salario) SELECT 11, nome, 'Amigo', 1000.00 FROM amigos_do_pickles WHERE id = 3;",
    initial_query: "",
    prompt: `Podemos inserir registros retornados por uma consulta SELECT diretamente em outra tabela.<br/>
    Joguei a tabela amigos na base de dados desta lição. Copie o amigo com id=3 da tabela <strong>amigos_do_pickles</strong> e o insira na tabela <strong>funcionarios</strong> com as colunas: id=11, nome, cargo='Amigo' e salario=1000.00.`
  },
  {
    name: "UPDATE (Atualizar Campos)",
    short_name: "update_basic",
    database_type: "family",
    correct_query: "UPDATE membros_familia SET livros_lidos = 10;",
    initial_query: "",
    prompt: `O comando <code>UPDATE tabela SET col = valor;</code> altera registros existentes. Cuidado: sem WHERE, ele altera todas as linhas!<br/>
    Atualize o número de **livros_lidos** para **10** de **todos** os membros da tabela <strong>membros_familia</strong>.`
  },
  {
    name: "UPDATE com filtros WHERE",
    short_name: "update_where",
    database_type: "family",
    correct_query: "UPDATE membros_familia SET livros_lidos = 5 WHERE nome = 'Pickles';",
    initial_query: "",
    prompt: `Adicione a cláusula <code>WHERE</code> ao UPDATE para modificar apenas registros específicos da tabela.<br/>
    Atualize a coluna <strong>livros_lidos</strong> para **5** apenas do membro da família que se chama <strong>'Pickles'</strong>.`
  },
  {
    name: "DELETE FROM (Deletar Registros)",
    short_name: "delete_basic",
    database_type: "family",
    correct_query: "DELETE FROM membros_familia;",
    initial_query: "",
    prompt: `O comando <code>DELETE FROM tabela;</code> limpa registros. Sem a cláusula WHERE, remove todos os dados da tabela.<br/>
    Escreva uma consulta que delete **todos** os registros da tabela <strong>membros_familia</strong>.`
  },
  {
    name: "DELETE FROM com WHERE",
    short_name: "delete_where",
    database_type: "family",
    correct_query: "DELETE FROM membros_familia WHERE especie = 'cachorro';",
    initial_query: "",
    prompt: `Use a cláusula <code>WHERE</code> para excluir registros específicos de uma tabela.<br/>
    Exclua da tabela <strong>membros_familia</strong> apenas os membros pertencentes à espécie <strong>'cachorro'</strong>.`
  },
  {
    name: "CREATE TABLE (Criar Tabela)",
    short_name: "create_table",
    database_type: "family",
    correct_query: "CREATE TABLE carros (id INT, modelo TEXT);",
    initial_query: "",
    prompt: `O comando DDL <code>CREATE TABLE nome (col1 tipo1, col2 tipo2);</code> cria uma nova tabela no banco de dados.<br/>
    Crie uma tabela chamada <strong>carros</strong> que tenha as colunas: <strong>id</strong> do tipo <code>INT</code> e <strong>modelo</strong> do tipo <code>TEXT</code>.`
  },
  {
    name: "Tipos de Dados: TEXT, INTEGER, REAL",
    short_name: "data_types",
    database_type: "family",
    correct_query: "CREATE TABLE estoque (produto TEXT, quantidade INTEGER, preco REAL);",
    initial_query: "",
    prompt: `No SQLite, usamos tipos de afinidade comuns: <code>TEXT</code> (textos), <code>INTEGER</code> (inteiros) e <code>REAL</code> (números de ponto flutuante).<br/>
    Crie uma tabela chamada <strong>estoque</strong> com as colunas: <strong>produto</strong> (TEXT), <strong>quantidade</strong> (INTEGER) e <strong>preco</strong> (REAL).`
  },
  {
    name: "Chave Primária (PRIMARY KEY)",
    short_name: "primary_key",
    database_type: "family",
    correct_query: "CREATE TABLE tarefas (id INTEGER PRIMARY KEY, descricao TEXT);",
    initial_query: "",
    prompt: `Uma chave primária garante que cada registro tenha uma identificação única na tabela.<br/>
    Crie uma tabela chamada <strong>tarefas</strong> contendo as colunas: <strong>id</strong> (INTEGER PRIMARY KEY) e <strong>descricao</strong> (TEXT).`
  },
  {
    name: "Restrição NOT NULL",
    short_name: "not_null_constraint",
    database_type: "family",
    correct_query: "CREATE TABLE contatos (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);",
    initial_query: "",
    prompt: `A restrição <code>NOT NULL</code> impede que uma coluna seja inserida com valores em branco (nulos).<br/>
    Crie uma tabela chamada <strong>contatos</strong> com as colunas: <strong>id</strong> (INTEGER PRIMARY KEY) e <strong>nome</strong> (TEXT NOT NULL).`
  },
  {
    name: "Restrição UNIQUE",
    short_name: "unique_constraint",
    database_type: "family",
    correct_query: "CREATE TABLE contas (id INTEGER PRIMARY KEY, email TEXT UNIQUE);",
    initial_query: "",
    prompt: `A restrição <code>UNIQUE</code> garante que não existam valores duplicados em uma coluna.<br/>
    Crie uma tabela chamada <strong>contas</strong> com as colunas: <strong>id</strong> (INTEGER PRIMARY KEY) e <strong>email</strong> (TEXT UNIQUE).`
  },
  {
    name: "Restrição DEFAULT",
    short_name: "default_constraint",
    database_type: "family",
    correct_query: "CREATE TABLE logs (id INTEGER PRIMARY KEY, status TEXT DEFAULT 'ativo');",
    initial_query: "",
    prompt: `A restrição <code>DEFAULT valor</code> insere um valor padrão automático caso nenhum seja especificado no insert.<br/>
    Crie uma tabela chamada <strong>logs</strong> com as colunas: <strong>id</strong> (INTEGER PRIMARY KEY) e <strong>status</strong> (TEXT com valor padrão de 'ativo').`
  },
  {
    name: "Restrição CHECK",
    short_name: "check_constraint",
    database_type: "family",
    correct_query: "CREATE TABLE usuarios (id INTEGER PRIMARY KEY, idade INTEGER CHECK (idade >= 18));",
    initial_query: "",
    prompt: `A restrição <code>CHECK (condicao)</code> valida se os dados inseridos atendem a uma condição booleana de validação.<br/>
    Crie a tabela <strong>usuarios</strong> com as colunas: <strong>id</strong> (INTEGER PRIMARY KEY) e <strong>idade</strong> (INTEGER validando para que a idade seja maior ou igual a 18).`
  },
  {
    name: "Chave Estrangeira (FOREIGN KEY)",
    short_name: "foreign_key",
    database_type: "family",
    correct_query: "CREATE TABLE pets (id INTEGER PRIMARY KEY, nome TEXT, dono_id INTEGER, FOREIGN KEY(dono_id) REFERENCES membros_familia(id));",
    initial_query: "",
    prompt: `Uma chave estrangeira relaciona colunas entre tabelas diferentes para manter a integridade referencial do banco.<br/>
    Crie uma tabela chamada <strong>pets</strong> com: <strong>id</strong> (INTEGER PRIMARY KEY), <strong>nome</strong> (TEXT), <strong>dono_id</strong> (INTEGER) e com uma chave estrangeira que relacione <strong>dono_id</strong> à coluna <strong>id</strong> da tabela <strong>membros_familia</strong>.`
  },
  {
    name: "ALTER TABLE (Adicionar Coluna)",
    short_name: "alter_table_add",
    database_type: "family",
    correct_query: "ALTER TABLE membros_familia ADD COLUMN idade INT;",
    initial_query: "",
    prompt: `O comando <code>ALTER TABLE nome_tabela ADD COLUMN nome_coluna tipo;</code> adiciona uma nova coluna a uma tabela existente.<br/>
    Adicione uma coluna chamada <strong>idade</strong> do tipo <code>INT</code> na tabela de <strong>membros_familia</strong>.`
  },
  {
    name: "ALTER TABLE (Renomear Tabela)",
    short_name: "alter_table_rename",
    database_type: "family",
    correct_query: "ALTER TABLE membros_familia RENAME TO pessoas;",
    initial_query: "",
    prompt: `Use <code>ALTER TABLE nome RENAME TO novo_nome;</code> para renomear tabelas inteiras de dados.<br/>
    Renomeie a tabela <strong>membros_familia</strong> para o novo nome de <strong>pessoas</strong>.`
  },
  {
    name: "DROP TABLE (Excluir Tabela)",
    short_name: "drop_table",
    database_type: "family",
    correct_query: "DROP TABLE membros_familia;",
    initial_query: "",
    prompt: `O comando DDL <code>DROP TABLE nome_tabela;</code> apaga permanentemente a tabela e todos os seus registros do banco.<br/>
    Apague a tabela de dados <strong>membros_familia</strong> do banco de dados.`
  },
  {
    name: "CREATE INDEX (Criar Índices)",
    short_name: "create_index",
    database_type: "family",
    correct_query: "CREATE INDEX idx_nome ON membros_familia(nome);",
    initial_query: "",
    prompt: `Índices aceleram a velocidade de buscas textuais em colunas pesquisadas com frequência.<br/>
    Crie um índice chamado <strong>idx_nome</strong> associado à coluna <strong>nome</strong> da tabela <strong>membros_familia</strong>.`
  },
  {
    name: "DROP INDEX (Excluir Índices)",
    short_name: "drop_index",
    database_type: "family",
    correct_query: "DROP INDEX idx_nome;",
    initial_query: "",
    prompt: `Podemos excluir um índice existente que não seja mais útil com o comando <code>DROP INDEX nome_indice;</code>.<br/>
    Nesta lição, o índice **idx_nome** já está criado. Apague o índice <strong>idx_nome</strong> do banco de dados.`
  },
  {
    name: "CREATE VIEW (Criar Visões)",
    short_name: "create_view",
    database_type: "family",
    correct_query: "CREATE VIEW vw_humanos AS SELECT * FROM membros_familia WHERE especie = 'humano';",
    initial_query: "",
    prompt: `Uma view é uma consulta SELECT salva que pode ser consultada como se fosse uma tabela física do banco de dados.<br/>
    Crie uma visão (view) chamada <strong>vw_humanos</strong> que retorne todas as colunas de todos os membros humanos da tabela.`
  },
  {
    name: "DROP VIEW (Excluir Visões)",
    short_name: "drop_view",
    database_type: "family",
    correct_query: "DROP VIEW vw_humanos;",
    initial_query: "",
    prompt: `Para remover uma view que não é mais necessária, usamos o comando DDL <code>DROP VIEW nome_view;</code>.<br/>
    Nesta lição, a view **vw_humanos** já existe. Apague a view <strong>vw_humanos</strong> do banco de dados.`
  },
  {
    name: "Tabelas Temporárias",
    short_name: "temp_table",
    database_type: "family",
    correct_query: "CREATE TEMP TABLE temp_membros (nome TEXT);",
    initial_query: "",
    prompt: `Tabelas temporárias duram apenas durante a sessão de conexão ativa com o banco de dados.<br/>
    Crie uma tabela temporária (<code>CREATE TEMP TABLE</code>) chamada <strong>temp_membros</strong> contendo apenas uma coluna: <strong>nome</strong> (TEXT).`
  },
  {
    name: "Operação UNION",
    short_name: "union",
    database_type: "tv_normalized",
    correct_query: "SELECT nome FROM personagem UNION SELECT nome FROM ator;",
    initial_query: "",
    prompt: `O operador <code>UNION</code> une o resultado de duas consultas em uma única tabela, removendo linhas duplicadas.<br/>
    Junte a lista de nomes da tabela <strong>personagem</strong> com os nomes da tabela <strong>ator</strong> usando <strong>UNION</strong>.`
  },
  {
    name: "Operação UNION ALL",
    short_name: "union_all",
    database_type: "tv_normalized",
    correct_query: "SELECT nome FROM personagem UNION ALL SELECT nome FROM ator;",
    initial_query: "",
    prompt: `Diferente do UNION simples, o <code>UNION ALL</code> une os resultados de consultas mantendo os registros duplicados.<br/>
    Una os nomes de <strong>personagem</strong> com os de <strong>ator</strong> mantendo as repetições (use <strong>UNION ALL</strong>).`
  },
  {
    name: "Operação INTERSECT",
    short_name: "intersect",
    database_type: "tv_normalized",
    correct_query: "SELECT nome FROM personagem INTERSECT SELECT nome FROM ator;",
    initial_query: "",
    prompt: `O operador <code>INTERSECT</code> retorna apenas os registros que existem em ambas as consultas simultaneamente.<br/>
    Descubra quais nomes de <strong>personagem</strong> existem também como nomes de <strong>ator</strong> utilizando <strong>INTERSECT</strong>.`
  },
  {
    name: "Operação EXCEPT",
    short_name: "except",
    database_type: "tv_normalized",
    correct_query: "SELECT nome FROM personagem EXCEPT SELECT nome FROM ator;",
    initial_query: "",
    prompt: `O operador <code>EXCEPT</code> retorna registros que existem na primeira consulta, mas não na segunda.<br/>
    Obtenha os nomes de <strong>personagem</strong> que **não** constam como nomes na lista de <strong>ator</strong> utilizando <strong>EXCEPT</strong>.`
  },
  {
    name: "CTE Básica (WITH)",
    short_name: "cte_basic",
    database_type: "company",
    correct_query: "WITH cte_ti AS (SELECT * FROM funcionarios WHERE departamento_id = 1) SELECT nome, cargo FROM cte_ti;",
    initial_query: "",
    prompt: `As CTEs (Common Table Expressions) funcionam como tabelas temporárias definidas antes da query usando <code>WITH nome AS (SELECT...)</code>.<br/>
    Crie uma CTE chamada <strong>cte_ti</strong> com os funcionários do departamento 1, e selecione as colunas <strong>nome</strong> e <strong>cargo</strong> a partir desta CTE.`
  },
  {
    name: "CTE com Filtros e Agregações",
    short_name: "cte_aggregate",
    database_type: "company",
    correct_query: "WITH cte_salarios AS (SELECT departamento_id, AVG(salario) AS media FROM funcionarios GROUP BY departamento_id) SELECT d.nome, s.media FROM departamentos AS d INNER JOIN cte_salarios AS s ON d.id = s.departamento_id;",
    initial_query: "",
    prompt: `Você pode usar CTEs para agregar dados e em seguida juntá-los com outras tabelas físicas.<br/>
    Crie a CTE <strong>cte_salarios</strong> com a média salarial agrupada por departamento. Depois, faça um INNER JOIN com a tabela <strong>departamentos</strong> retornando o nome do departamento e a média salarial.`
  },
  {
    name: "CTE com Múltiplas Subtabelas",
    short_name: "cte_multiple",
    database_type: "company",
    correct_query: "WITH cte_ti AS (SELECT id, nome FROM funcionarios WHERE departamento_id = 1), cte_vendas AS (SELECT id, nome FROM funcionarios WHERE departamento_id = 2) SELECT nome FROM cte_ti UNION SELECT nome FROM cte_vendas;",
    initial_query: "",
    prompt: `Você pode definir múltiplas CTEs separando-as por vírgula logo após o comando inicial WITH.<br/>
    Crie as CTEs <strong>cte_ti</strong> (funcionários do dep. 1) e <strong>cte_vendas</strong> (do dep. 2). Una os nomes de ambas com o comando <code>UNION</code>.`
  },
  {
    name: "Window Function: ROW_NUMBER()",
    short_name: "row_number",
    database_type: "company",
    correct_query: "SELECT nome, salario, ROW_NUMBER() OVER (ORDER BY salario DESC) AS posicao FROM funcionarios;",
    initial_query: "",
    prompt: `As Window Functions realizam cálculos através de partições de linhas. <code>ROW_NUMBER() OVER (...)</code> gera um número sequencial único.<br/>
    Selecione o <strong>nome</strong>, o <strong>salario</strong> e crie uma coluna chamada <strong>posicao</strong> que classifique as linhas ordenando os salários de forma decrescente.`
  },
  {
    name: "Window Function: RANK()",
    short_name: "rank",
    database_type: "company",
    correct_query: "SELECT nome, departamento_id, salario, RANK() OVER (ORDER BY salario DESC) AS ranking FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>RANK()</code> atribui posições pulando números caso haja empates nas linhas consultadas.<br/>
    Selecione o **nome**, **departamento_id**, **salario** e crie uma coluna chamada <strong>ranking</strong> baseada nos salários do maior para o menor.`
  },
  {
    name: "Window Function: DENSE_RANK()",
    short_name: "dense_rank",
    database_type: "company",
    correct_query: "SELECT nome, departamento_id, salario, DENSE_RANK() OVER (ORDER BY salario DESC) AS ranking FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>DENSE_RANK()</code> classifica registros de forma sequencial sem pular números em caso de empates.<br/>
    Retorne o **nome**, **departamento_id**, **salario** e aplique <strong>DENSE_RANK()</strong> ordenado pelos maiores salários na coluna <strong>ranking</strong>.`
  },
  {
    name: "Window Function: NTILE()",
    short_name: "ntile",
    database_type: "company",
    correct_query: "SELECT nome, salario, NTILE(4) OVER (ORDER BY salario DESC) AS quartil FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>NTILE(n)</code> divide as linhas de forma ordenada em 'n' grupos aproximadamente iguais.<br/>
    Selecione o **nome** e **salario** e divida a empresa em 4 grupos de faixas salariais na coluna <strong>quartil</strong> (dos maiores salários para os menores).`
  },
  {
    name: "Window Function: LEAD()",
    short_name: "lead",
    database_type: "company",
    correct_query: "SELECT nome, salario, LEAD(salario) OVER (ORDER BY salario) AS salario_superior FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>LEAD(coluna)</code> busca o valor de uma coluna da linha posterior no resultado.<br/>
    Retorne o **nome**, **salario** e crie a coluna <strong>salario_superior</strong> exibindo o valor do salário imediatamente maior que o da linha corrente.`
  },
  {
    name: "Window Function: LAG()",
    short_name: "lag",
    database_type: "company",
    correct_query: "SELECT nome, salario, LAG(salario) OVER (ORDER BY salario) AS salario_inferior FROM funcionarios;",
    initial_query: "",
    prompt: `A função <code>LAG(coluna)</code> busca o valor de uma coluna da linha anterior no resultado.<br/>
    Retorne o **nome**, **salario** e crie a coluna <strong>salario_inferior</strong> exibindo o valor do salário imediatamente menor que o da linha corrente.`
  },
  {
    name: "OVER com PARTITION BY",
    short_name: "partition_by",
    database_type: "company",
    correct_query: "SELECT nome, departamento_id, salario, AVG(salario) OVER (PARTITION BY departamento_id) AS media_departamento FROM funcionarios;",
    initial_query: "",
    prompt: `Adicionar <code>PARTITION BY coluna</code> divide a janela em partições de grupos independentes para as operações de janela.<br/>
    Retorne o **nome**, **departamento_id**, **salario** e a **média salarial do departamento de cada funcionário** na coluna <strong>media_departamento</strong>.`
  },
  {
    name: "OVER com ORDER BY",
    short_name: "over_order_by",
    database_type: "store",
    correct_query: "SELECT id, preco, SUM(preco) OVER (ORDER BY id) AS acumulado FROM produtos;",
    initial_query: "",
    prompt: `Usar <code>ORDER BY</code> dentro de <code>OVER</code> permite fazer cálculos cumulativos como totais acumulados.<br/>
    Selecione o **id** e **preco** dos produtos e calcule a **soma acumulada** dos preços dos produtos ordenando por ID. Nomeie como <strong>acumulado</strong>.`
  },
  {
    name: "OVER com PARTITION e ORDER",
    short_name: "partition_order",
    database_type: "store",
    correct_query: "SELECT id, categoria, preco, SUM(preco) OVER (PARTITION BY categoria ORDER BY id) AS acumulado_categoria FROM produtos;",
    initial_query: "",
    prompt: `Podemos perfeitamente combinar tanto o PARTITION BY quanto o ORDER BY juntos dentro de uma Window Function.<br/>
    Selecione **id**, **categoria**, **preco** dos produtos e calcule o **preço acumulado por categoria** (particione por categoria e ordene por ID) em <strong>acumulado_categoria</strong>.`
  },
  {
    name: "Função SUM OVER",
    short_name: "sum_over",
    database_type: "store",
    correct_query: "SELECT id, preco, SUM(preco) OVER () AS total_geral FROM produtos;",
    initial_query: "",
    prompt: `Se omitirmos o conteúdo de OVER (<code>OVER ()</code>), a janela se torna o banco de dados inteiro para cálculo.<br/>
    Retorne **id**, **preco** e crie a coluna <strong>total_geral</strong> contendo a soma total dos preços de todos os produtos cadastrados.`
  },
  {
    name: "Função AVG OVER",
    short_name: "avg_over",
    database_type: "store",
    correct_query: "SELECT id, preco, AVG(preco) OVER () AS media_geral FROM produtos;",
    initial_query: "",
    prompt: `Use a função <code>AVG OVER ()</code> para exibir a média geral de valores ao lado de cada registro do banco.<br/>
    Selecione o **id**, o **preco** e exiba a média dos preços de todos os produtos na coluna <strong>media_geral</strong>.`
  },
  {
    name: "Função GROUP_CONCAT",
    short_name: "group_concat",
    database_type: "friends_of_pickles",
    correct_query: "SELECT especie, GROUP_CONCAT(nome) AS nomes FROM amigos_do_pickles GROUP BY especie;",
    initial_query: "",
    prompt: `A função agregadora <code>GROUP_CONCAT(coluna)</code> concatena todos os valores de texto de um grupo separados por vírgula.<br/>
    Selecione a **especie** e retorne os **nomes concatenados dos amigos** de cada grupo de espécie separados por vírgula na coluna <strong>nomes</strong>.`
  },
  {
    name: "Transações Básicas",
    short_name: "transactions",
    database_type: "family",
    correct_query: "BEGIN TRANSACTION; INSERT INTO membros_familia VALUES (4, 'Joca', 'masculino', 'humano', 10); COMMIT;",
    initial_query: "",
    prompt: `Transações encapsulam um grupo de comandos que devem rodar com sucesso juntos usando <code>BEGIN TRANSACTION;</code> e <code>COMMIT;</code>.<br/>
    Abra uma transação, insira o registro (4, 'Joca', 'masculino', 'humano', 10) na tabela <strong>membros_familia</strong> e efetive (salve) as alterações.`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { levels };
}
