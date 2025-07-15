export enum ActionType {
  VIEW = "view",
  ADD = "add",
  EDIT = "edit",
}

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export enum DiagnosisType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DIFFERENTIAL = "differential",
  PROVISIONAL = "provisional",
}

export enum TestType {
  URINE_ANALYSIS = "urine_analysis",
  STOOL_TEST = "stool_test",
  BODY_FLUID_ANALYSIS = "body_fluid_analysis",
  CYTOLOGY = "cytology",
  IMMUNOLOGY = "immunology",
  MICROBIOLOGY = "microbiology",
  GENETIC_TESTING = "genetic_testing",
  IMAGING = "imaging",
  QUALITATIVE_TEST = "qualitative_test",
  QUANTITATIVE_TEST = "quantitative_test",
  MOLECULAR_BIOLOGY = "molecular_biology",
  IMMUNOFLUORESCENCE = "immunofluorescence",
  CULTURE = "culture",
}

export enum PermissionStatus {
  GRANTED = "granted",
  REVOKE = "revoke",
}

export enum ImageType {
  X_QUANG = "X_quang",
  CT = "CT",
  MRI = "MRI",
  PET = "PET",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum Role {
  DOCTOR = "doctor",
  PATIENT = "patient",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum VisitType {
  OUTPATIENT = "outpatient",
  INPATIENT = "inpatient",
  EMERGENCY = "emergency",
}
