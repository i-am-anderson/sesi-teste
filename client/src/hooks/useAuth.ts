import {
  clearProfile,
  saveProfile,
  type StudentProfile,
} from "../services/studentStorage";
import { useStudentData } from "./useStudent";

function createMockProfile(email: string): StudentProfile {
  return {
    name: "João da Silva",
    email,
    registration: "2026-261026",
    company: "Metalúrgica São Paulo",
    jobTitle: "Técnico de Segurança do Trabalho",
    city: "São Paulo, SP",
    phone: "(11) 99876-5432",
    memberSince: new Date().toISOString(),
  };
}

export function useAuth() {
  const { profile } = useStudentData();

  return {
    student: profile,
    loggedIn: profile !== null,
    login: (email: string) => saveProfile(createMockProfile(email)),
    logout: clearProfile,
  };
}
