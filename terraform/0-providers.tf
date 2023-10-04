terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_iam_user" "admin_user" {
  name = "backend-user-terraform-${var.ENV}"
}

resource "aws_iam_group" "admin" {
  name = "admin-backend"
}

resource "aws_iam_user_group_membership" "admin" {
  user = aws_iam_user.admin_user.name

  groups = [
    aws_iam_group.admin.name,
  ]
}

resource "aws_iam_group_policy_attachment" "IAMFullAccess" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
}

resource "aws_iam_group_policy_attachment" "AmazonAPIGatewayAdministrator" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator"
}

resource "aws_iam_group_policy_attachment" "AmazonEC2ContainerRegistryFullAccess" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

resource "aws_iam_group_policy_attachment" "AWSLambda_FullAccess" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambda_FullAccess"
}

resource "aws_iam_group_policy_attachment" "AmazonS3FullAccess" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}


resource "aws_iam_group_policy_attachment" "AWSBillingConductorReadOnlyAccess" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/AWSBillingConductorReadOnlyAccess"
}

resource "aws_iam_group_policy_attachment" "AmazonAPIGatewayPushToCloudWatchLogs" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_iam_group_policy_attachment" "CloudWatchLogsReadOnlyAccess" {
  group       = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsReadOnlyAccess"
}
