
resource "aws_api_gateway_rest_api" "pdf2qa" {
  name = "pdf2qa-${var.ENV}"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_iam_role" "iam_for_api_gateway" {
  name = "iam_for_api_gateway"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "apigateway.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "AmazonAPIGatewayPushToCloudWatchLogs" {
  role       = aws_iam_role.iam_for_api_gateway.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_api_gateway_account" "this" {
  cloudwatch_role_arn = aws_iam_role.iam_for_api_gateway.arn
}


resource "aws_api_gateway_resource" "proxy" {
  parent_id   = aws_api_gateway_rest_api.pdf2qa.root_resource_id
  path_part   = "{proxy+}"
  rest_api_id = aws_api_gateway_rest_api.pdf2qa.id
}

resource "aws_api_gateway_method" "cors" {
    rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
    resource_id   = aws_api_gateway_resource.proxy.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "cors" {
    rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
    resource_id   = aws_api_gateway_resource.proxy.id
    http_method   = aws_api_gateway_method.cors.http_method
    status_code   = 200
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
        "method.response.header.Access-Control-Allow-Credentials" = true
    }
}

resource "aws_api_gateway_integration" "options_integration" {
    rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
    resource_id   = aws_api_gateway_resource.proxy.id
    http_method   = aws_api_gateway_method.cors.http_method
    type          = "MOCK"
    passthrough_behavior = "WHEN_NO_MATCH"
    request_templates = {
    "application/json" = jsonencode(
      {
        statusCode = 200
      }
    )
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
    rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
    resource_id   = aws_api_gateway_resource.proxy.id
    http_method   = aws_api_gateway_method.cors.http_method
    status_code   = aws_api_gateway_method_response.cors.status_code
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Accept, Authorization, Content-Type, X-CSRF-Token, X-API-Key, Set-Cookie'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,DELETE'",
        "method.response.header.Access-Control-Allow-Origin" = "'${var.WEB_DOMAIN}'"
        "method.response.header.Access-Control-Allow-Credentials" = "'true'"
    }
}

resource "aws_api_gateway_method" "post" {
  rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "get" {
  rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "GET"
  authorization = "NONE"
}

# resource "aws_api_gateway_method" "delete" {
#   rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
#   resource_id   = aws_api_gateway_resource.proxy.id
#   http_method   = "DELETE"
#   authorization = "NONE"
# }

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = aws_api_gateway_rest_api.pdf2qa.id
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.pdf2qa.body))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.pdf2qa.id
  stage_name    = var.ENV
}

resource "aws_api_gateway_usage_plan" "this" {
  name = "my_usage_plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.pdf2qa.id
    stage  = aws_api_gateway_stage.this.stage_name
  }
}

resource "aws_api_gateway_api_key" "this" {
  name = "my_api_key"
}

resource "aws_api_gateway_usage_plan_key" "main" {
  key_id        = aws_api_gateway_api_key.this.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.this.id
}

resource "aws_api_gateway_method_settings" "this" {
  rest_api_id = aws_api_gateway_rest_api.pdf2qa.id
  stage_name  = aws_api_gateway_stage.this.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled = true
    logging_level   = "INFO"
  }
}