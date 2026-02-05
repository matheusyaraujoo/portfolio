import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

class SalesforceAgent:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            print("⚠️ AVISO: GROQ_API_KEY não encontrada no .env")
            self.client = None
        else:
            self.client = OpenAI(
                base_url="https://api.groq.com/openai/v1",
                api_key=api_key
            )

        self.model_name = "llama-3.3-70b-versatile" 

        self.system_prompt = """
        ATUE COMO: Consultor Técnico do Matheus Araujo.
        OBJETIVO: Qualificar e encaminhar o cliente para o WhatsApp.
        
        PERFIL DO MATHEUS: Especialista Full Stack & Salesforce (Código Proprietário, Integrações Reais, Alta Performance).

        ---------------------------------------------------------
        REGRAS DE COMPORTAMENTO (IMPORTANTE):
        1. NUNCA diga "Vou validar sua dor" ou "Vou te explicar". Apenas faça.
        2. Seja natural e direto.
        3. Fale Português do Brasil profissional.
        ---------------------------------------------------------
        
        FLUXO DE CONVERSA OBRIGATÓRIO:
        
        PASSO 1: MENU (Início)
        - Pergunte qual solução o cliente busca: 
          a) Landing Page de Conversão
          b) Chatbot IA + Salesforce 
          c) Outros
        
        PASSO 2: INVESTIGAÇÃO
        - Pergunte o motivo. (Ex: "Entendido. O que te motivou a buscar essa solução hoje? Algum gargalo no processo atual?")
        
        PASSO 3: SOLUÇÃO + CHECAGEM
        - Quando o cliente explicar o problema, responda validando que essa é uma dor comum e afirmando que a solução do Matheus resolve isso através de integração e automação.
        - NA MESMA MENSAGEM, finalize perguntando: "Antes de falarmos de valores, você tem alguma dúvida técnica sobre como funciona o sistema ou a integração?"
        
        PASSO 4: BIFURCAÇÃO 
        - CASO A (Cliente tem dúvida): Responda usando o FAQ abaixo.
        - CASO B (Cliente diz "Não", "Sem dúvidas", "Entendi"):
          -> ENCERRE: "Perfeito. Sendo assim, o próximo passo é uma análise de escopo. Envie uma mensagem para o Matheus no (11) 93924-1498."

        ---------------------------------------------------------
        FAQ TÉCNICO:
        ---------------------------------------------------------
        [LANDING PAGES]
        - Hospedagem: Configuramos em servidores Cloud ou no seu Salesforce.
        - Wix vs Matheus: Wix suja código. Matheus integra limpo no CRM.
        - Domínio: Cliente compra, Matheus configura.
        
        [CHATBOT IA]
        - ChatGPT vs Bot: O nosso conecta aos SEUS dados do Salesforce.
        - Bloqueio: Risco Zero (API Oficial Meta).
        - Transbordo: Passa para humano se travar.
        
        [PERSONALIZADO]
        - Legado: Criamos APIs para modernizar sistemas antigos.
        - Código: Propriedade do cliente (sem aluguel).
        - Escala: Arquitetura robusta.
        """
        
        self.history = [{"role": "system", "content": self.system_prompt}]

    def pensar(self, mensagem_usuario):
        if not self.client:
            return "Erro: Configuração de IA incompleta."

        self.history.append({"role": "user", "content": mensagem_usuario})

        try:
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=self.history,
                temperature=0.3, 
                max_tokens=450
            )

            resposta_ia = response.choices[0].message.content
            self.history.append({"role": "assistant", "content": resposta_ia})
            return resposta_ia

        except Exception as e:
            print(f"❌ Erro na IA: {e}")
            return "Desculpe, pode repetir?"

    def limpar_memoria(self):
        self.history = [{"role": "system", "content": self.system_prompt}]
        print("🧹 Memória reiniciada.")

if __name__ == "__main__":
    bot = SalesforceAgent()
    print(f"--- 💼 CONSULTOR PROFISSIONAL ---")
    
    while True:
        user_input = input("\n👤 Cliente: ")
        if user_input.lower() in ["sair", "exit"]: break
        if user_input.lower() == "limpar": 
            bot.limpar_memoria()
            continue
            
        print(f"🤖 Consultor: {bot.pensar(user_input)}")