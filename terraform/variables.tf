variable "ENV" {
  type      = string
  sensitive = true
}

variable "POSTGRES_PASSWORD" {
  default = "adm"
}

variable "POSTGRES_USER" {
  default = "adm"
}

variable "POSTGRES_DB" {
  default = "adm"
}

variable "VPC_CIDR" {
  default = "10.0.0.0/16"
}

variable "REGION" {
  default = "eu-west-2"
}
