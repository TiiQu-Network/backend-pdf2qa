variable "ENV" {
  type      = string
  sensitive = true
}

variable "POSTGRES_PASSWORD" {
  default = "password"
}

variable "POSTGRES_USER" {
  default = "dev_user"
}

variable "POSTGRES_DB" {
  default = "pdf2qadev"
}

variable "REGION" {
  default = "eu-west-2"
}
