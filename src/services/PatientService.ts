import { Patient } from '../types/Patient';

interface PaginatedResponse<T> {
  data: T[];
  lastDoc: any;
  hasMore: boolean;
}

export class PatientService {
  private static readonly COLLECTION_NAME = 'patients';
  private static readonly PAGE_SIZE = 20;

  static async getPatients(
    lastDoc?: any,
    searchTerm?: string
  ): Promise<PaginatedResponse<Patient>> {
    try {
      let query = `SELECT * FROM ${this.COLLECTION_NAME}`;
      const params: any[] = [];
      
      if (searchTerm) {
        query += ` WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
        const searchPattern = `%${searchTerm}%`;
        params.push(searchPattern, searchPattern, searchPattern);
      }
      
      query += ` ORDER BY createdAt DESC`;
      
      if (lastDoc) {
        query += ` WHERE createdAt < ?`;
        params.push(lastDoc.createdAt);
      }
      
      query += ` LIMIT ${this.PAGE_SIZE + 1}`;

      const mockPatients: Patient[] = this.generateMockData(lastDoc ? 10 : 20);
      
      const hasMore = mockPatients.length > this.PAGE_SIZE;
      const data = hasMore ? mockPatients.slice(0, -1) : mockPatients;
      const newLastDoc = data.length > 0 ? data[data.length - 1] : null;

      return {
        data,
        lastDoc: newLastDoc,
        hasMore,
      };
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      throw new Error('Falha ao carregar pacientes');
    }
  }

  static async searchPatients(searchTerm: string): Promise<Patient[]> {
    try {
      const response = await this.getPatients(undefined, searchTerm);
      return response.data;
    } catch (error) {
      console.error('Erro ao pesquisar pacientes:', error);
      throw new Error('Falha ao pesquisar pacientes');
    }
  }

  static async getPatientById(id: string): Promise<Patient | null> {
    try {
      const mockPatients = this.generateMockData(50);
      return mockPatients.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      throw new Error('Falha ao carregar paciente');
    }
  }

  private static generateMockData(count: number, startIndex: number = 0): Patient[] {
    const names = [
      'Ana Silva', 'João Santos', 'Maria Oliveira', 'Pedro Costa', 'Carla Ferreira',
      'Lucas Almeida', 'Juliana Lima', 'Rafael Pereira', 'Amanda Souza', 'Diego Martins',
      'Bruna Rodrigues', 'Felipe Barbosa', 'Camila Nascimento', 'Rodrigo Cardoso', 'Larissa Torres',
      'Gabriel Araujo', 'Fernanda Dias', 'Thiago Ribeiro', 'Vanessa Castro', 'Bruno Moura'
    ];

    const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília'];
    const states = ['SP', 'RJ', 'MG', 'BA', 'DF'];

    return Array.from({ length: count }, (_, index) => {
      const nameIndex = (startIndex + index) % names.length;
      const name = names[nameIndex];
      const id = `patient_${startIndex + index + 1}`;
      
      return {
        id,
        name,
        email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
        phone: `(11) 9${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        birthDate: new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        cpf: `${Math.floor(Math.random() * 900 + 100)}.${Math.floor(Math.random() * 900 + 100)}.${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}`,
        address: {
          street: `Rua ${name.split(' ')[1]}`,
          number: String(Math.floor(Math.random() * 999) + 1),
          city: cities[Math.floor(Math.random() * cities.length)],
          state: states[Math.floor(Math.random() * states.length)],
          zipCode: `${Math.floor(Math.random() * 90000 + 10000)}-${Math.floor(Math.random() * 900 + 100)}`,
        },
        createdAt: new Date(Date.now() - (startIndex + index) * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        lastAppointment: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString() : undefined,
        nextAppointment: Math.random() > 0.5 ? new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString() : undefined,
        status: Math.random() > 0.1 ? 'active' : 'inactive',
        allergies: Math.random() > 0.7 ? ['Penicilina', 'Látex'] : undefined,
        medicalHistory: Math.random() > 0.5 ? 'Histórico de hipertensão' : undefined,
      };
    });
  }
} 