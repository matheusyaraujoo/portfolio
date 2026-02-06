import os
from simple_salesforce import Salesforce
from dotenv import load_dotenv

load_dotenv()

def criar_lead_salesforce(nome, contato, resumo):
    """
    Cria Lead usando autenticação OAuth via External Client App.
    Isso resolve o erro 'SOAP API login disabled'.
    """
    try:
        sf = Salesforce(
            username=os.getenv("SF_USERNAME"),
            password=os.getenv("SF_PASSWORD"),
            security_token=os.getenv("SF_TOKEN"),
            consumer_key=os.getenv("SF_CONSUMER_KEY"),
            consumer_secret=os.getenv("SF_CONSUMER_SECRET"),
            domain='login' 
        )

        dados_lead = {
            'LastName': nome,
            'Company': 'Lead Chatbot Portfolio', 
            'Description': f"RESUMO DO AGENT:\n{resumo}\n\nCONTATO CAPTURADO: {contato}",
            'LeadSource': 'Web', 
            'Status': 'Open - Not Contacted'
        }

        sf.Lead.create(dados_lead)
        print(f"✅ SUCESSO! Lead '{nome}' criado no Salesforce via OAuth.")
        return True

    except Exception as e:
        print(f"❌ ERRO DE CONEXÃO: {e}")
        print("DICA: Se o erro for 'invalid_client_id', aguarde 5-10 minutos. O Salesforce demora para propagar chaves novas.")
        return False