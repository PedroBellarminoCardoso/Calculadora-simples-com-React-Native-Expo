# Calculadora Simples - React Native + Expo

Aplicativo de calculadora desenvolvido com **React Native**, **Expo** e a biblioteca de componentes **React Native Paper**, como exercício para praticar o uso de componentes, frameworks visuais e Hooks.

## Objetivo

Compreender o uso de componentes, frameworks visuais e Hooks em React Native, construindo primeiro a camada visual (display e botões) e depois a lógica das operações básicas.

## Funcionalidades

- Display com o valor atual e o histórico da operação em andamento
- Operações básicas: soma (`+`), subtração (`-`), multiplicação (`*`) e divisão (`/`)
- Encadeamento de operações (ex.: `2 + 3 * 4`, calculado da esquerda para a direita)
- Números decimais, com bloqueio de mais de um ponto no mesmo número
- Botão `C` para limpar tudo e `⌫` para apagar o último dígito
- Tratamento de divisão por zero (exibe `Erro`)
- Correção de imprecisão de ponto flutuante (ex.: `0.1 + 0.2` resulta em `0.3`)
- Tema escuro do Material Design 3

## Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Native Paper](https://reactnativepaper.com/): `PaperProvider`, `Button`, `Text`, `Surface`, `MD3DarkTheme`
- Hooks do React: `useState`

## Estrutura do projeto

```
calculadora/
├── App.js          # Interface e lógica da calculadora
├── app.json        # Configuração do Expo
├── package.json    # Dependências e scripts
└── README.md
```

## Como funciona

O estado da calculadora é controlado por quatro estados com `useState`:

| Estado          | Função                                                    |
| --------------- | --------------------------------------------------------- |
| `display`       | Texto exibido na tela                                     |
| `valorAnterior` | Primeiro operando, guardado ao escolher um operador       |
| `operador`      | Operação escolhida (`+`, `-`, `*` ou `/`)                 |
| `novoNumero`    | Indica se o próximo dígito inicia um novo número          |

Os botões são gerados a partir de uma matriz (`BOTOES`) percorrida com `map`, e cada toque chama a função `aoPressionar`, que direciona para digitar, escolher operador, calcular (`=`), limpar ou apagar.

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- Git

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/SEU_USUARIO/calculadora.git
   cd calculadora
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o projeto:

   ```bash
   npx expo start
   ```

4. Abra o app de uma destas formas:
   - Pressione `w` no terminal para abrir no **navegador**
   - Escaneie o QR code com o app **Expo Go** no celular (na mesma rede Wi-Fi)
   - Pressione `a` para abrir no **emulador Android**

> **Windows/PowerShell:** se aparecer o erro de execução de scripts desabilitada, use `npx.cmd` e `npm.cmd` no lugar de `npx` e `npm`, ou rode os comandos no Prompt de Comando ou no Git Bash.

### Criando o projeto do zero

Para reproduzir o projeto desde o início:

```bash
npx create-expo-app@latest calculadora --template blank
cd calculadora
npm install react-native-paper react-native-safe-area-context
npx expo install react-dom react-native-web @expo/metro-runtime
npx expo start
```

## Enunciado do exercício

Criar um app em React Native com Expo que seja uma calculadora simples:

1. Iniciar pela camada visual, inserindo os botões e o display onde serão exibidos os valores.
2. Fazer funcionar as operações básicas (`+`, `-`, `*`, `/`).
3. Usar os componentes do React Native Paper.
4. Publicar o projeto no GitHub como público e postar o link no AVA dentro do prazo.

## Referências

- [React Native Paper - Documentação](https://callstack.github.io/react-native-paper/)
- [Expo - Documentação](https://docs.expo.dev/)
- [React - Hooks](https://react.dev/reference/react/hooks)