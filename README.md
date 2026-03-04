<h1 align="center">
  Marketplace para troca de cartas
</h1>

## 💬 Descrição

O projeto é um marketplace para troca de cartas, onde os usuários podem se registrar, fazer login, adicionar cartas à sua conta e criar solicitações de troca. O objetivo é permitir que os usuários troquem suas cartas com outros usuários de forma fácil e segura.

Clique [aqui](https://mature-crowberry-3fc.notion.site/Teste-INMETA-Front-End-Pleno-22c926b5830d80c0bab4e93ac82f3db7) para acessar o desafio.

## Funcionalidades esperadas

- [x] Usuário deve poder se registrar
- [x] Usuário deve poder fazer login
- [x] O usuário pode adicionar cartas a sua própria conta
- [x] O usuário pode criar uma solicitação de troca
  - [x] Ele deve escolher quais cartas da sua conta que pretende oferecer
  - [x] Deve poder escolher entre todas as cartas registradas quais ele quer receber
- [x] O usuário deve poder deletar solicitações de troca que criou
- [x] Todos usuários e visitantes tem acesso a pagina inicial de marketplace mostrando as solicitações de troca abertas

Acompanhe o andamento de todos os itens por [aqui](https://github.com/users/zehguilherme/projects/14).

## Especificações técnicas

### Requisitos

- [x] A aplicação deve ser um **SPA**
  - [x] Vue 3 (preferencialmente)
  - React
- [x] Deve conter Typescript
- [x] Deve conter tratamento de erros
- [x] Deve conter validação de formulários
- [x] Deve conter gerenciamento de estado
  - [x] Pinia (Vue)
  - Zustand (React)

### Restrições

- [x] O projeto deve estar no GitHub
- [x] Não deve ser feito fork de nenhum outro projeto
- [x] Apenas o seu usuário deve realizar commits no projeto

## Extras

Nenhum desses requisitos é obrigatório, mas são desejados e podem ser um diferencial.

1. **Deploy:** você consegue realizar o deploy da sua aplicação?

   Utilizei a plataforma [Vercel](https://vercel.com/) que já possui internamente toda uma estrutura de CI/CD para garantir que o deploy ocorra sem problemas. A aplicação em produção pode ser acessada [aqui](https://teste-inmeta-cards-marketplace.vercel.app/).

2. **Cache:** você implementaria cache em alguma parte da aplicação?

## Ferramentas e tecnologias utilizadas

- [Vue](https://vuejs.org/) - Biblioteca usada para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Conjunto de pacotes que adiciona tipagem estática à linguagem JavaScript
- [Google Fonts](https://fonts.google.com/) - Biblioteca contendo diversas fontes
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilização
- [Axios](https://axios-http.com) - Biblioteca para fazer requisições HTTP
- [date-fns](https://date-fns.org) - Biblioteca para manipulação de datas
- [Pinia](https://pinia.vuejs.org) - Biblioteca para gerenciamento de estado
- [VeeValidate](https://vee-validate.logaretm.com) - Biblioteca para validação de formulários
- [Yup](https://www.npmjs.com/package/yup) - Biblioteca para construção de esquemas de validação e análise de valores

## Layout

O layout foi criado utilizando a inteligência artificial [Replit](https://replit.com), e a versão final do site gerado pela IA que foi usado como base para esse projeto pode ser acessada [aqui](https://cards-marketplace--zehguilherme.replit.app/).

_PS: Alguns pontos do design foram modificados para melhor atender as necessidades do projeto, mas a essência do design foi mantida._

## 🚀 Começando

Primeiro de tudo você precisa ter `node` e `yarn` (ou `npm`) instalados em sua máquina.

_Se você decidir usar o npm, não se esqueça de deletar `yarn.lock` nas pastas._

Então você pode clonar o repositório.

```code
  git clone https://github.com/zehguilherme/teste-inmeta-cards-marketplace
```

Inicie a aplicação

1. `yarn` ou `npm install`
2. `yarn dev` ou `npm run dev`

## 🤔 Como contribuir

1. Faça um fork do projeto;
2. Crie uma branch com a sua feature: `git checkout -b minha-nova-feature`;
3. Faça commit das suas alterações: `git commit -m 'feat: Adição de uma nova feature'`;
4. Faça push para o branch: `git push origin minha-nova-feature`;
5. Crie uma nova Pull Request;
6. Depois que o merge de sua Pull Request for concluída, você pode excluir sua branch.

---

Feito com 💟 por José Guilherme Paro Monteiro Tomaine 👋 [Fale comigo!](https://www.linkedin.com/in/josé-guilherme-paro-monteiro-tomaine/)
