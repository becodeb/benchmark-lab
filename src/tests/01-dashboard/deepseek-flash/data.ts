import { Award, Target, Users, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Student } from './types'

export type KpiAccent = 'blue' | 'emerald' | 'amber' | 'violet'

export type Kpi = {
  id: string
  label: string
  value: string
  delta: number
  icon: LucideIcon
  accent: KpiAccent
}

export const kpis: Kpi[] = [
  { id: 'students', label: 'Estudiantes activos', value: '1.284', delta: 8.2, icon: Users, accent: 'blue' },
  { id: 'completion', label: 'Tasa de finalización', value: '92,4%', delta: 3.1, icon: Target, accent: 'emerald' },
  { id: 'average', label: 'Promedio general', value: '7,8', delta: -0.4, icon: Award, accent: 'amber' },
  { id: 'revenue', label: 'Ingresos del mes', value: '$48.230', delta: 12.5, icon: Wallet, accent: 'violet' },
]

export const enrollmentTrend = [
  { month: 'Ene', active: 1040, new: 62 },
  { month: 'Feb', active: 1085, new: 71 },
  { month: 'Mar', active: 1132, new: 84 },
  { month: 'Abr', active: 1168, new: 78 },
  { month: 'May', active: 1195, new: 69 },
  { month: 'Jun', active: 1204, new: 55 },
  { month: 'Jul', active: 1176, new: 38 },
  { month: 'Ago', active: 1211, new: 66 },
  { month: 'Sep', active: 1284, new: 92 },
]

export const courseDistribution = [
  { course: 'Matemática', students: 214 },
  { course: 'Lengua', students: 198 },
  { course: 'Historia', students: 176 },
  { course: 'Biología', students: 165 },
  { course: 'Física', students: 152 },
  { course: 'Programación', students: 148 },
  { course: 'Química', students: 131 },
  { course: 'Inglés', students: 118 },
]

export const statusDistribution = [
  { name: 'Activos', value: 968, color: '#3b82f6' },
  { name: 'Becados', value: 172, color: '#8b5cf6' },
  { name: 'Inactivos', value: 144, color: '#475569' },
]

export const students: Student[] = [
  { id: 'ST-1001', name: 'Valentina Ríos', email: 'valentina.rios@edu.ar', course: 'Matemática 4°A', status: 'active', progress: 87, grade: 8.9, lastActive: '2026-09-09' },
  { id: 'ST-1002', name: 'Mateo Fernández', email: 'mateo.fernandez@edu.ar', course: 'Lengua 3°B', status: 'active', progress: 74, grade: 7.6, lastActive: '2026-09-08' },
  { id: 'ST-1003', name: 'Sofía Gutiérrez', email: 'sofia.gutierrez@edu.ar', course: 'Historia 5°C', status: 'scholarship', progress: 93, grade: 9.4, lastActive: '2026-09-09' },
  { id: 'ST-1004', name: 'Santiago López', email: 'santiago.lopez@edu.ar', course: 'Física 6°A', status: 'active', progress: 61, grade: 6.8, lastActive: '2026-09-05' },
  { id: 'ST-1005', name: 'Camila Torres', email: 'camila.torres@edu.ar', course: 'Biología 4°B', status: 'inactive', progress: 22, grade: 4.5, lastActive: '2026-07-28' },
  { id: 'ST-1006', name: 'Benjamín Sosa', email: 'benjamin.sosa@edu.ar', course: 'Programación 6°B', status: 'active', progress: 95, grade: 9.1, lastActive: '2026-09-09' },
  { id: 'ST-1007', name: 'Martina Peralta', email: 'martina.peralta@edu.ar', course: 'Química 5°A', status: 'active', progress: 82, grade: 8.2, lastActive: '2026-09-07' },
  { id: 'ST-1008', name: 'Joaquín Medina', email: 'joaquin.medina@edu.ar', course: 'Geografía 4°C', status: 'inactive', progress: 18, grade: 5.1, lastActive: '2026-08-02' },
  { id: 'ST-1009', name: 'Isabella Ferrari', email: 'isabella.ferrari@edu.ar', course: 'Arte 2°A', status: 'scholarship', progress: 91, grade: 9.7, lastActive: '2026-09-09' },
  { id: 'ST-1010', name: 'Thiago Acosta', email: 'thiago.acosta@edu.ar', course: 'Matemática 4°A', status: 'active', progress: 68, grade: 7.1, lastActive: '2026-09-06' },
  { id: 'ST-1011', name: 'Lucía Benítez', email: 'lucia.benitez@edu.ar', course: 'Inglés 3°A', status: 'active', progress: 88, grade: 8.6, lastActive: '2026-09-08' },
  { id: 'ST-1012', name: 'Federico Ramírez', email: 'federico.ramirez@edu.ar', course: 'Física 6°A', status: 'scholarship', progress: 79, grade: 8.4, lastActive: '2026-09-04' },
  { id: 'ST-1013', name: 'Emma Cabrera', email: 'emma.cabrera@edu.ar', course: 'Lengua 3°B', status: 'active', progress: 72, grade: 7.4, lastActive: '2026-09-07' },
  { id: 'ST-1014', name: 'Tomás Villalba', email: 'tomas.villalba@edu.ar', course: 'Programación 6°B', status: 'active', progress: 90, grade: 8.8, lastActive: '2026-09-09' },
  { id: 'ST-1015', name: 'Julieta Navarro', email: 'julieta.navarro@edu.ar', course: 'Biología 4°B', status: 'inactive', progress: 31, grade: 5.6, lastActive: '2026-08-11' },
  { id: 'ST-1016', name: 'Bautista Quiroga', email: 'bautista.quiroga@edu.ar', course: 'Historia 5°C', status: 'active', progress: 64, grade: 6.9, lastActive: '2026-09-03' },
  { id: 'ST-1017', name: 'Delfina Aguirre', email: 'delfina.aguirre@edu.ar', course: 'Química 5°A', status: 'scholarship', progress: 97, grade: 9.8, lastActive: '2026-09-09' },
  { id: 'ST-1018', name: 'Lautaro Ojeda', email: 'lautaro.ojeda@edu.ar', course: 'Geografía 4°C', status: 'active', progress: 57, grade: 6.5, lastActive: '2026-09-05' },
  { id: 'ST-1019', name: 'Mía Domínguez', email: 'mia.dominguez@edu.ar', course: 'Arte 2°A', status: 'active', progress: 84, grade: 8.1, lastActive: '2026-09-08' },
  { id: 'ST-1020', name: 'Máximo Herrera', email: 'maximo.herrera@edu.ar', course: 'Matemática 4°A', status: 'inactive', progress: 12, grade: 3.8, lastActive: '2026-06-30' },
  { id: 'ST-1021', name: 'Catalina Molina', email: 'catalina.molina@edu.ar', course: 'Inglés 3°A', status: 'scholarship', progress: 89, grade: 9.2, lastActive: '2026-09-09' },
  { id: 'ST-1022', name: 'Nicolás Paredes', email: 'nicolas.paredes@edu.ar', course: 'Física 6°A', status: 'active', progress: 76, grade: 7.9, lastActive: '2026-09-06' },
  { id: 'ST-1023', name: 'Abril Coronel', email: 'abril.coronel@edu.ar', course: 'Lengua 3°B', status: 'active', progress: 81, grade: 8.3, lastActive: '2026-09-07' },
  { id: 'ST-1024', name: 'Facundo Lezcano', email: 'facundo.lezcano@edu.ar', course: 'Programación 6°B', status: 'inactive', progress: 27, grade: 4.9, lastActive: '2026-07-19' },
  { id: 'ST-1025', name: 'Zoe Villanueva', email: 'zoe.villanueva@edu.ar', course: 'Biología 4°B', status: 'active', progress: 92, grade: 8.7, lastActive: '2026-09-09' },
  { id: 'ST-1026', name: 'Ignacio Roldán', email: 'ignacio.roldan@edu.ar', course: 'Historia 5°C', status: 'scholarship', progress: 70, grade: 7.8, lastActive: '2026-09-05' },
  { id: 'ST-1027', name: 'Renata Escobar', email: 'renata.escobar@edu.ar', course: 'Química 5°A', status: 'active', progress: 66, grade: 7.2, lastActive: '2026-09-04' },
  { id: 'ST-1028', name: 'Lucas Godoy', email: 'lucas.godoy@edu.ar', course: 'Geografía 4°C', status: 'active', progress: 59, grade: 6.7, lastActive: '2026-09-02' },
  { id: 'ST-1029', name: 'Emilia Cáceres', email: 'emilia.caceres@edu.ar', course: 'Arte 2°A', status: 'active', progress: 85, grade: 8.5, lastActive: '2026-09-08' },
  { id: 'ST-1030', name: 'Dylan Figueroa', email: 'dylan.figueroa@edu.ar', course: 'Matemática 4°A', status: 'scholarship', progress: 78, grade: 8.0, lastActive: '2026-09-06' },
  { id: 'ST-1031', name: 'Paulina Sarmiento', email: 'paulina.sarmiento@edu.ar', course: 'Inglés 3°A', status: 'inactive', progress: 24, grade: 4.2, lastActive: '2026-08-16' },
  { id: 'ST-1032', name: 'Gonzalo Ibarra', email: 'gonzalo.ibarra@edu.ar', course: 'Física 6°A', status: 'active', progress: 73, grade: 7.5, lastActive: '2026-09-07' },
]
