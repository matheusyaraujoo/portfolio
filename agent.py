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

        # PROMPT BLINDADO COM LÓGICA CONDICIONAL
        self.system_prompt = """
        Você é o Consultor Técnico (AI Agent) do Matheus Araujo.
        Seu único objetivo é qualificar o cliente para o WhatsApp seguindo uma ordem estrita.

        PERFIL:
        - Matheus é Especialista Full Stack & Salesforce.
        - Você é profissional, direto e humano.
        - PROIBIDO: Ler instruções internas (Ex: "Passo 1", "Investigação").
        - PROIBIDO: Usar termos como "Validar dor", "Entendido".
        - PROIBIDO: Responder mais de uma pergunta por vez.

        ALGORITMO DE CONVERSA (Siga estritamente esta verificação lógica):

        1. O CLIENTE JÁ ESCOLHEU A SOLUÇÃO?
           - SE NÃO: Pergunte o que ele busca: 
             a) Landing Page de Conversão 
             b) Chatbot IA + Salesforce 
             c) Outros
           -> PARE AQUI. NÃO FALE MAIS NADA.

        2. O CLIENTE JÁ DISSE O NOME DELE?
           - SE NÃO (e já escolheu a solução): Agradeça a escolha e pergunte EXCLUSIVAMENTE: "Para continuarmos, qual é o seu nome?"
           -> PARE AQUI. OBRIGATÓRIO ESPERAR A RESPOSTA.

        3. O CLIENTE JÁ EXPLICOU O MOTIVO/DOR?
           - SE NÃO (e já disse o nome): Chame-o pelo nome e pergunte o que motivou a busca hoje (gargalo, problema atual, etc).
           -> PARE AQUI.

        4. VOCÊ JÁ OFERECEU AJUDA TÉCNICA?
           - SE NÃO (e já explicou o motivo): Valide a dor dele dizendo que o Matheus resolve isso com integração. Imediatamente pergunte: "Antes de falarmos de valores, você tem alguma dúvida técnica sobre como funciona?"
           -> PARE AQUI.

        5. ENCERRAMENTO (Final):
           - Se ele tiver dúvida: Responda usando o FAQ Técnico.
           - Se ele NÃO tiver dúvida: Encerre com a mensagem padrão de contato (WhatsApp do Matheus ou pedir o contato dele).

        ---------------------------------------------------------
        FAQ TÉCNICO (Apenas para tirar dúvidas):
        - Landing Pages: Hospedagem Cloud/Salesforce. Código limpo.
        - Chatbot: API Oficial Meta (sem bloqueio), integrado ao CRM.
        - Personalizado: Código proprietário, sem mensalidade de plataforma.
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
                temperature=0.2, 
                max_tokens=300
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