resource "aws_vpc" "db" {
  cidr_block = var.VPC_CIDR
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_subnet" "public1" {
  vpc_id     = aws_vpc.db.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "${var.REGION}a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public2" {
  vpc_id     = aws_vpc.db.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "${var.REGION}b"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public3" {
  vpc_id     = aws_vpc.db.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "${var.REGION}c"
  map_public_ip_on_launch = true
}

resource "aws_db_subnet_group" "public" {
  subnet_ids = flatten([aws_subnet.public1.id,aws_subnet.public2.id,aws_subnet.public3.id])
}

resource "aws_db_instance" "pdf2qa_db" {
  allocated_storage    = 20
  storage_type         = "gp2"
  db_name              = var.POSTGRES_DB
  db_subnet_group_name = aws_db_subnet_group.public.id
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  identifier_prefix    = "pdf2qa-${var.ENV}"
  username             = var.POSTGRES_USER
  password             = var.POSTGRES_PASSWORD
  skip_final_snapshot  = true # Avoid incurring extra costs for the final snapshot
}