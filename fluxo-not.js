flowchart TD
%% Nodes
    A("fa:fa-comment-dots Coleta do histórico de mensagens do chat")
    B("fa:fa-cogs Envia histórico para a API OpenAI para processamento")
    C{"Resposta encontrada?"}
    D["fa:fa-file-alt Retorna dados da documentação + cliente com automação"]
    E["fa:fa-times-circle Retorna: 'Hoje não existe a automação. Deseja criar uma nova? Envie mais detalhes.'"]
    F("fa:fa-reply Retorna a resposta gerada diretamente no Cliq")

%% Edge connections between nodes
    A --> B --> C
    C -->|Sim| D --> F
    C -->|Não| E --> F

%% Individual node styling
    style A color:#FFFFFF, fill:#4CAF50, stroke:#388E3C
    style B color:#FFFFFF, fill:#2196F3, stroke:#1976D2
    style C color:#FFFFFF, fill:#FFC107, stroke:#FFA000
    style D color:#FFFFFF, fill:#00BCD4, stroke:#0097A7
    style E color:#FFFFFF, fill:#F44336, stroke:#D32F2F
    style F color:#FFFFFF, fill:#9C27B0, stroke:#7B1FA2
