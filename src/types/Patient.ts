export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalHistory?: string;
  allergies?: string[];
  createdAt: string;
  updatedAt: string;
  lastAppointment?: string;
  nextAppointment?: string;
  status: 'active' | 'inactive';
} 