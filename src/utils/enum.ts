export enum ActionType {
  VIEW = "view",
  ADD = "add",
  EDIT = "edit",
}

export enum AppointmentStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  CANCELLED = "Cancelled",
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
  GRANTED = "Granted",
  REVOKE = "Revoke",
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
  ADMIN = "admin",
}

export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum VisitType {
  OUTPATIENT = "outpatient",
  INPATIENT = "inpatient",
  EMERGENCY = "emergency",
}
