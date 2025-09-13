Pedro Manzo Yokoo 556115
Guilherme Camasmie Laiber de Jesus 554894
Fernando Fernandes Prado


# 📱 App de Tarefas com Tema e Internacionalização

Este é um aplicativo de lista de tarefas feito em **React Native**, com suporte a:

* Tema claro/escuro
* Internacionalização (PT/EN)
* Frases motivacionais via **TanStack Query**

---

## 📂 Clonando o projeto no VS Code

1. Abra o VS Code
2. Abra o terminal integrado (\`Ctrl + \`\`)
3. Clone o repositório:

```bash
[git clone https://github.com/seu-usuario/seu-repositorio.git](https://github.com/Pedro-sugoy/cpMobile1.git)
```

4. Entre na pasta do projeto:

```bash
cd cpMobile1
```

5. Instale as dependências:

```bash
npm install
```

---

## 🚀 Rodando o projeto

1. Inicie o projeto com Expo:

```bash
npx expo start
```

2. Isso abrirá o **Metro Bundler** no navegador.
3. Você pode abrir o app em:

   * **Emulador Android/iOS**
   * **Expo Go** no celular (escaneando o QR Code)

⚠️ Observação: notificações push não funcionam no Expo Go para SDK >= 53.

---

## 🎨 Funcionalidades

* **Tema claro/escuro:**

  * Botão no header e na tela de configurações
  * Altera fundo e cores do texto dinamicamente

* **Internacionalização (PT/EN):**

  * Botão no header alterna idioma
  * Textos carregados dos arquivos `pt.json` e `eng.json`

* **Lista de tarefas:**

  * Adicionar, marcar como concluída e remover tarefas
  * Frases motivacionais carregadas de API externa

---

## 🛠 Estrutura do projeto

```
├─ /app
│   ├─ TelaTarefas.js
│   ├─ TelaConfiguracoes.js
│   └─ ...
├─ /src
│   ├─ /context
│   │   ├─ ThemeContext.js
│   │   └─ ThemeToggleButton.js
│   └─ /locales
│       ├─ pt.json
│       └─ eng.json
├─ App.js
├─ package.json
└─ README.md
```

---

## ⚙️ Comandos úteis

* Rodar app no Expo:

```bash
npx expo start
```

* Atualizar dependências:

```bash
npm install
```

---

