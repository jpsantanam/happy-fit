### 3.3.6 Processo 6 – Compartilhamento de Receitas

_O processo de compartilhamento de receitas proposto visa criar uma plataforma onde os usuários possam compartilhar suas próprias receitas e interagir com as receitas já publicadas. Uma oportunidade de melhoria para esse processo seria a incorporação de um algoritmo de recomendação, capaz de sugerir receitas relevantes de acordo com os interesses individuais de cada usuário. Isso tornaria a experiência de descoberta de novas receitas mais personalizada e atraente para os usuários._

![PROCESSO 6](../images/receitas-final.png "Modelo BPMN do Processo 6.")


#### Detalhamento das atividades

#### Criar Receita:

_**Criar Receita :** O usuário clica no botão pra criar sua receita._

#### Cadastro de Receita:

_**Nome da receita:** O usuário digita o nome da receita no campo de texto._

_**Ingredientes:** O usuário digita os ingredientes da receita na área de texto, separando-os por vírgula ou ponto e vírgula._

_**Modo de preparo:** O usuário digita o modo de preparo da receita na área de texto, dividindo-o em etapas._

_**Rendimento:** O usuário digita o rendimento da receita na área de texto, informando a quantidade de porções._

_**Categoria:** O usuário seleciona uma ou mais categorias para a receita, utilizando a opção de seleção múltipla._

_**Imagem:** O usuário carrega uma imagem da receita, clicando no botão "Escolher imagem"._

_**Pré-visualização da Receita:** O aplicativo apresenta uma pré-visualização da receita para o usuário, permitindo que ele revise os dados antes de publicar._

**Publicação da Receita:**

_**Confirmação:** O usuário confirma a publicação da receita clicando no botão "Publicar"._

_**Armazenamento:** A receita é armazenada no banco de dados do aplicativo._


#### Interagir com receita:

_**Visualização da Receita:** O usuário navega até a receita desejada e visualiza seus detalhes, incluindo nome, ingredientes, modo de preparo, rendimento, categoria e imagem._

_**Favoritar:** Adiciona a receita à lista de favoritos do usuário_


**Atividade 1: Criar Receita**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              |  ---           | ---               |
| Criar Receita | Botão   |                |          default         |

| **Comandos** |  **Destino**                                | **Tipo** |
| ---          | ---                                         | ---      |
| Criar Receita    | Direciona o usuario ao cadastro de receita       | default  |

**Atividade 2: Cadastro de Receita**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              |  ---           | ---               |
| nome da receita | Caixa de Texto   |  Não pode estar em branco, mínimo de 10 caracteres      |        (default)           |
| ingredientes    | Seleçao múltipla   |       Pelo menos um ingrediente deve ser selecionado     |       (default)               |
| modo de preparo | Área de texto    |  Não pode estar em branco, mínimo de 10 caracteres   |          (default)         |
| rendimento      | Número | Deve ser maior q zero  |        (default)           |
| categoria       | Caixa de Texto |   Não pode estar em branco, maximo de 20 caracteres             |          (default)         |
| imagem          | Imagem           |  Formatos permitidos: JPG, PNG, máximo 5MB  |        (default)           |

| **Comandos**         |  **Destino**                            | **Tipo** |
| ---                  | ---                                     | ---      |
| Adicionar receita    | inicia o processo de cadastro de receita| default  |
| Cancelar             | cancela a publicação da receita         | default  |
| Publicar             | publica a receita no feed               | default  |


**Atividade 3: Interagir com receita**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              |  ---           | ---               |
| Favoritar | Botão   |                |          default         |

| **Comandos** |  **Destino**                                | **Tipo** |
| ---          | ---                                         | ---      |
| Favoritar    | adiciona receita a lista de favoritos       | default  |
