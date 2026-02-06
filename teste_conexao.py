from simple_salesforce import Salesforce

print("--- TESTE DE CONEXÃO DIRETA (SEM .ENV) ---")

try:
    # ⚠️ SUBSTITUA ABAIXO PELOS SEUS DADOS REAIS (Copie e cole do Bloco de Notas)
    sf = Salesforce(
        username='araujomatheusdevfs@gmail.com', 
        password='SUA_SENHA_DO_SALESFORCE',
        security_token='SEU_TOKEN_DE_SEGURANCA', # Aquele código estranho que chega no email
        consumer_key='COLE_AQUI_A_CHAVE_DO_CONSUMIDOR', # Consumer Key
        consumer_secret='COLE_AQUI_O_SEGREDO_DO_CONSUMIDOR', # Consumer Secret
        domain='login' 
    )

    print("\n✅ SUCESSO! A CONEXÃO FUNCIONOU!")
    print("Isso prova que suas chaves estão certas e o Salesforce está configurado corretamente.")
    print("O problema é que o arquivo .env não está sendo lido pelo Python.")
    
    # Teste final: Criar um Lead
    sf.Lead.create({
        'LastName': 'Teste Definitivo',
        'Company': 'Lead Chatbot Portfolio',
        'Email': 'teste@funciona.com',
        'LeadSource': 'Web'
    })
    print("✅ Lead criado com sucesso! Pode verificar no Dashboard.")

except Exception as e:
    print("\n❌ AINDA DEU ERRO:")
    print(e)