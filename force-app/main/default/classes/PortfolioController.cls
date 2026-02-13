public with sharing class PortfolioController {
    
    // Busca os leads do Chatbot para a tabela
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads() {
        return [
            SELECT Id, Name, Company, Email, Phone, CreatedDate, Description 
            FROM Lead 
            WHERE Company = 'Lead Chatbot Portfolio' 
            ORDER BY CreatedDate DESC 
            LIMIT 10
        ];
    }

    // Conta o total de leads para o Card "Leads Captados"
    @AuraEnabled(cacheable=true)
    public static Integer getLeadCount() {
        return [SELECT Count() FROM Lead WHERE Company = 'Lead Chatbot Portfolio'];
    }
}