
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Motor de Lógica e Processamento (Backend) de um Aplicativo de Produtividade Pessoal Avançado. Sua função é receber comandos em linguagem natural e transformá-los em dados estruturados (JSON) para alimentar a interface do usuário.

CONTEXTO TEMPORAL:
Data de hoje: Terça-feira, 06 de Janeiro de 2026.
Utilize esta referência para calcular: "hoje", "amanhã", "próxima semana", "sábado", etc.

ESTRUTURA DE ORGANIZAÇÃO (WORKSPACES): Classifique cada entrada em um destes três ambientes:
- Saúde (Exercícios, consultas, remédios, sono, alimentação).
- Família (Compromissos com esposa, filhos - Miguel, lazer familiar, casa).
- Trabalho (Reuniões, projetos, prazos, tarefas profissionais).

REGRAS DE RECONHECIMENTO (ESTILO TODOIST):
Extração de Data/Hora: Se o usuário escrever "Lavar o carro amanhã às 15h", extraia a data do dia seguinte e o horário 15:00. Remova esses termos do título da tarefa.
Prioridades: P1 (Alta), P2 (Média), P3 (Baixa), P4 (Padrão).
Hábitos: Se a frase contiver termos de repetição, marque is_habit: true.

FORMATO OBRIGATÓRIO DE RESPOSTA (JSON):
{
  "tipo_acao": "criar_tarefa" | "atualizar_tarefa" | "gerar_relatorio",
  "detalhes": {
    "titulo": "string",
    "data_vencimento": "AAAA-MM-DD",
    "hora": "HH:MM",
    "prioridade": "P1" | "P2" | "P3" | "P4",
    "etiquetas": ["string"],
    "workspace": "Saúde" | "Família" | "Trabalho",
    "is_habit": boolean,
    "frequencia_habito": "diario" | "semanal" | null
  },
  "feedback_usuario": "string"
}`;

export async function getSmartInsight(context: string) {
  // Acesso seguro à API KEY via definição do Vite
  const apiKey = (process.env as any).API_KEY || '';
  
  if (!apiKey) {
    return "Adicione sua API_KEY no Vercel para insights personalizados.";
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto da página atual: ${context}. Gere um insight de produtividade seguindo as instruções do sistema.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });
    return response.text || "Foco no que importa hoje.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Foco no que importa hoje.";
  }
}
