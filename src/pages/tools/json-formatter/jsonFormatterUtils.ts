
export const formatJsonString = (input: string): string => {
  if (!input.trim()) throw new Error('Por favor, insira um JSON para formatar.');
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
};

export const minifyJsonString = (input: string): string => {
  if (!input.trim()) throw new Error('Por favor, insira um JSON para minificar.');
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
};

export const validateJsonString = (input: string): { valid: boolean; message: string } => {
  if (!input.trim()) throw new Error('Por favor, insira um JSON para validar.');
  try {
    JSON.parse(input);
    return { valid: true, message: 'JSON válido! ✅' };
  } catch (error) {
    return { valid: false, message: `JSON inválido: ${error instanceof Error ? error.message : 'Formato incorreto'}` };
  }
};

export const getSampleJson = (): string => `{
  "name": "Exemplo",
  "version": "1.0.0",
  "description": "JSON de exemplo",
  "features": ["formatação","validação","minificação"],
  "metadata": {"author": "Toolbox","created": "2024"}
}`;
