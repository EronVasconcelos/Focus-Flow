
import React from 'react';
import { Task, Habit, Resource, Goal } from './types';

export const IMAGES = {
  ALEX_AVATAR: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqYB0f1etzUcYIKIlDN5PREnJsOagcqodfTYjJT6n8g7EURYqz31wwpfeI_HoOyEA9_nFHt_ubxbp5ELGj3xtQE8wWVNBQK3x15EAzHNAPQ23LGxFlgSeuCuMoOCAi0jgaX7y8k22cXVgE4_T_tqGzdpm7lrZZUagnWAJS9m5Oomcpxflzqm1tKYB1hP_yOEUCjBPMn13Gf5NYkZ-6RkoQPDwSHeN126LE7ejSJvjwUxv3_hD3-8caeALilJnBZWi8nb5dV_CGbQs",
  SARAH_AVATAR: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIvoal2VM4YU0luOwv1ejkHkzMsNe6BND1XWQJOlq7ddvD6xV0NTcxUNF6WVWF1zIRFqYkJqxFk1uMGWKi-Rr1NVlHo-SVq-bOOfNth5pmENzhj9iGsLShmMgqnJPxEzhdUXIFqeqrTuPImBPnv6gCpUKX3LnSSOhrXY489dcZZH26zjGOw0wNsSdo-fSmTtB3If8WtTw87VUFIwpu9H_OtIC6SMPvaDE5gdN-jI3BM6qkYMmwnqsRbUr0o67mVrKYIFUThr-8Is0",
  MARIA_AVATAR: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWKMOdTHaGomiYcYPPod_fiNHB9KMNDqImaFQDx7JIhfNcaNFYPt1PbvSGfDAZGbiw9M4uy6_vI294BMziPip2SBYAJVLLwhMjCxifNnk3CN-lDEW0raRpO6vIliqpqAsp8cgy0Dt-PwtIzisL0-7V5gjzMEIq6KXwS0ulvB08rlItL6Q23yko5ZDKKwHuI9EoE_ooJ8cjSodW71piNZljNiJBylGFD4HHvVeN4sh4RejVwRuV-PcaRM7xw5udMyKf98wTxH4qfMY",
  LOGO: "https://lh3.googleusercontent.com/aida-public/AB6AXuClQckGQ-mOtggfQParaSuZNq8fLN32ZzFhBaAr1K4TiYOj9Bl1DGFFrj4MI6GQ0EtbrJxXCHbjOuw_n6wOc6oco3vnaVrdZ4hTJseaQETVUrPocb5QwqBVGmwTkjS8NEXQEatVdxgcUwXD7VMh_iPy2tnYX5-r8J8b4-C20lSXv98fTyUxtxKIuP91FaoR69uUMhoQpHNnXIVCmQQyih7RYjHzEPZwLnBllRNEf06FugQyjBJNA1mabx7nPK0zGRB6ERgwvjpZKOg",
  LOGIN_BG: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
};

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Relatório Mensal Financeiro', category: 'Trabalho', workspace: 'Escritório', tags: ['Financeiro', 'Urgente'], status: 'in-progress', priority: 'high', dueDate: 'Hoje', subtasks: '2/3 Subtarefas' },
  { id: '2', title: 'Revisão de Design do App', category: 'Trabalho', workspace: 'Escritório', tags: ['UX', 'Design'], status: 'pending', priority: 'medium', dueDate: 'Amanhã' },
  { id: '3', title: 'Consulta Dentista', category: 'Saúde', workspace: 'Pessoal', tags: ['Saúde', 'Médico'], status: 'pending', priority: 'low', dueDate: '12 Out' },
  { id: '4', title: 'Comprar presente de aniversário', category: 'Família', workspace: 'Casa', tags: ['Social', 'Compras'], status: 'in-progress', priority: 'medium', dueDate: '15 Out', subtasks: '1/3 Subtarefas' },
  { id: '5', title: 'Manutenção do Jardim', category: 'Casa', workspace: 'Casa', tags: ['Externo', 'Manutenção'], status: 'pending', priority: 'low', dueDate: 'Sábado' }
];

export const MOCK_HABITS: Habit[] = [
  { id: '1', title: 'Beber 2L de Água', category: 'Saúde', streak: 12, completedDays: [true, true, false, false, false, false, false] },
  { id: '2', title: 'Ler 30 Minutos', category: 'Pessoal', streak: 5, completedDays: [true, false, false, false, false, false, false] },
  { id: '3', title: 'Limpeza Expressa 15min', category: 'Casa', streak: 3, completedDays: [true, true, true, false, false, false, false] }
];

export const MOCK_RESOURCES: Resource[] = [
  { id: '1', title: 'Melhores Práticas de UX 2024', description: 'Artigo detalhado sobre tendências emergentes.', type: 'article', category: 'Trabalho', date: '22 Out' },
  { id: '2', title: 'Contrato de Aluguel', description: 'Cópia digitalizada do contrato da residência.', type: 'pdf', category: 'Casa', date: '01 Jan' }
];

export const MOCK_GOALS: Goal[] = [
  { id: '1', title: 'Maratona 2024', category: 'Saúde', progress: 45, deadline: '15 Dez 2024', steps: [{title: 'Check-up', completed: true}, {title: 'Tênis novo', completed: true}, {title: 'Treino 21km', completed: false}] },
  { id: '2', title: 'Reforma da Cozinha', category: 'Casa', progress: 20, deadline: '30 Nov 2024', steps: [{title: 'Orçamento', completed: true}, {title: 'Escolher pisos', completed: false}] }
];
