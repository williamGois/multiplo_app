# Múltiplo Sorriso - App Mobile

Aplicativo React Native com Expo para gestão de clínica odontológica.

## 🚀 Características

- **Telas de Login e Cadastro Modernas**: Com animações fluidas e design impactante
- **Ícone de Dente Animado**: SVG customizado com animações suaves
- **Componentes Reutilizáveis**: Input e botões animados
- **Gradientes e Efeitos Visuais**: Background com gradiente e elementos flutuantes
- **Fontes Personalizadas**: Poppins para uma tipografia moderna
- **Validação de Formulários**: Validação em tempo real com feedback visual

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem estática
- **React Native Reanimated** para animações performáticas
- **Expo Linear Gradient** para gradientes
- **Expo Blur** para efeitos de desfoque
- **React Native SVG** para ícones vetoriais
- **Expo Google Fonts** (Poppins)
- **Material Icons** para ícones

## 📱 Funcionalidades

### Tela de Login
- Animação de entrada sequencial
- Ícone de dente com animação contínua
- Inputs com animação de foco
- Validação em tempo real
- Elementos flutuantes decorativos
- Gradiente de fundo animado

### Tela de Cadastro
- Formulário completo para registro
- Validação de senhas
- Animações suaves de transição
- Design consistente com a tela de login

### Componentes Animados
- **ToothIcon**: Ícone SVG de dente com animações de pulsação e rotação
- **AnimatedInput**: Input com label flutuante e validação visual
- **AnimatedButton**: Botão com efeitos de pressão e gradiente

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app no seu dispositivo móvel

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd multiplo_app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Escaneie o QR code com o Expo Go app ou execute em um emulador:
```bash
# Para Android
npm run android

# Para iOS (apenas no macOS)
npm run ios

# Para Web
npm run web
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ToothIcon.tsx   # Ícone de dente animado
│   ├── AnimatedInput.tsx # Input com animações
│   └── AnimatedButton.tsx # Botão animado
├── screens/            # Telas da aplicação
│   ├── LoginScreen.tsx # Tela de login
│   └── RegisterScreen.tsx # Tela de cadastro
├── assets/             # Recursos estáticos
├── types/              # Definições de tipos
└── utils/              # Utilitários
```

## 🎨 Design System

### Cores
- **Primary**: `#3B82F6` (Azul)
- **Secondary**: `#10B981` (Verde)
- **Background Gradient**: `#667eea` → `#764ba2` → `#f093fb`
- **Text**: `#FFFFFF` (Branco)
- **Error**: `#EF4444` (Vermelho)

### Tipografia
- **Família**: Poppins
- **Pesos**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Animações
- **Duração**: 200ms - 2000ms
- **Easing**: Spring, Ease, Sine
- **Tipos**: Scale, Translate, Rotate, Opacity

## 🔧 Configurações

### Babel
Configurado para suportar React Native Reanimated com plugin específico.

### Metro
Configurado para suportar arquivos SVG.

### Fontes
Carregamento automático das fontes Poppins via Expo Google Fonts.

## 📝 Próximos Passos

- [ ] Implementar tela principal da aplicação
- [ ] Adicionar navegação com React Navigation
- [ ] Integrar com backend/API
- [ ] Implementar autenticação real
- [ ] Adicionar mais telas da gestão odontológica
- [ ] Implementar notificações push
- [ ] Adicionar testes unitários

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ para revolucionar a gestão odontológica. 