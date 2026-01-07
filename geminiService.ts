
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Motor de Lógica e Processamento (Backend) de um Aplicativo de Produtividade Pessoal Avançado. Sua função é receber comandos em linguagem natural e transformá-los em dados estruturados (JSON) para alimentar a interface do usuário.

CONTEXTO TEMPORAL:
Data de hoje: Terça-feira, 06 de Janeiro de 2026.
Utilize esta referência para calcular: "hoje", "amanhã", "próxima semana", "sábado", etc.

ESTRUTURA DE ORGANIZAÇÃO (WORKSPACES): Classifique cada entrada em um destes três ambientes:
- Saúde (Exercícios, consultas, remédios, sono, alimentação).
- Família (Compromissos com esposa, filhos - Miguel, lazer familiar, casa).
- Trabalho (Reuniões, projetos, prazos, tarefas profissionais).

REGRAS DE RECONHECIMENTO:
Extração de Data/Hora: Extraia datas e horários específicos de comandos como "amanhã às 15h".
Prioridades: P1 (Urgente), P2 (Alta), P3 (Média), P4 (Baixa).
Hábitos: Identifique se a entrada é uma tarefa recorrente.

FEEDBACK: No campo 'feedback_usuario', escreva uma frase motivadora e curta em português, resumindo o que você entendeu ou dando uma dica de produtividade baseada no contexto.`;

export async function getSmartInsight(context: string) {
  const apiKey = (process.env as any).API_KEY || '';
  
  if (!apiKey) {
    return { feedback_usuario: "Adicione sua API_KEY para insights personalizados." };
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto da página atual: ${context}. Gere um insight de produtividade.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_acao: {
              type: Type.STRING,
              description: "O tipo de ação detectada: criar_tarefa, atualizar_tarefa ou gerar_relatorio.",
            },
            detalhes: {
              type: Type.OBJECT,
              properties: {
                titulo: { type: Type.STRING },
                data_vencimento: { type: Type.STRING },
                hora: { type: Type.STRING },
                prioridade: { type: Type.STRING },
                workspace: { type: Type.STRING },
                is_habit: { type: Type.BOOLEAN },
              },
              required: ["titulo"]
            },
            feedback_usuario: {
              type: Type.STRING,
              description: "Mensagem amigável para exibir no banner de insights.",
            },
          },
          required: ["feedback_usuario", "tipo_acao"],
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { feedback_usuario: "Foco no que importa hoje. Vamos progredir?" };
  }
}
