interface EmailParams {
    email: string;
    name: string;
  }
  
  interface ItemParams {
    refp: string;
    namep: string;
    pu: string;
    qte: string;
    eq: string;
    pt: string;
  }
  
  interface EmailTemplate {
    to: EmailParams[];
    cc: EmailParams[];
    templateId: number;
    params?: {
      items: ItemParams[];
      preOrderID: string;
      createdAt: string;
      clientID: string;
      entreprise: string;
      user: string;
      comments: string;
      references: string;
      totalHT: string;
      tva: string;
      totalTTC: string;
    };
  }
  