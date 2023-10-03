resource "aws_api_gateway_integration" "processArticleFileAIPipeline_post" {
  rest_api_id = aws_api_gateway_rest_api.pdf2qa.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.processArticleFileAIPipeline.invoke_arn
}

resource "aws_lambda_permission" "post" {
  statement_id_prefix = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.processArticleFileAIPipeline.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.pdf2qa.execution_arn}/*/${aws_api_gateway_method.post.http_method}/*"
}

data "aws_lambda_function" "ping" {
  function_name = "ping"
}

resource "aws_api_gateway_integration" "ping" {
  rest_api_id = aws_api_gateway_rest_api.pdf2qa.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.post.http_method
  integration_http_method = "GET"
  type                    = "AWS_PROXY"
  uri                     = data.aws_lambda_function.ping.invoke_arn
}

resource "aws_lambda_permission" "get" {
  statement_id_prefix = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.ping.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.pdf2qa.execution_arn}/*/${aws_api_gateway_method.get.http_method}/*"
}
