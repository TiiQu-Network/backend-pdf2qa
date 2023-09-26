resource "aws_api_gateway_integration" "uploadFileToS3ArticleBucket_post" {
  rest_api_id = aws_api_gateway_rest_api.pdf2qa.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.uploadFileToS3ArticleBucket.invoke_arn
}

resource "aws_lambda_permission" "post" {
  statement_id_prefix = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.uploadFileToS3ArticleBucket.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.pdf2qa.execution_arn}/*/${aws_api_gateway_method.post.http_method}/*"
}

