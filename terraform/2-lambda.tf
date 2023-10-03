resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "iam_for_lambda_attach_role" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_lambda_function" "processArticleFileAIPipeline" {
  s3_bucket     = "article-bucket-1"
  s3_key        = "my_deployment_package.zip"
  function_name = "processArticleFileAIPipeline-${var.ENV}"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "./dist/src/lambda/processArticleFileAIPipeline/index.handler"

  # source_code_hash = filebase64sha256("s3_key")

  runtime = "nodejs18.x"

  environment {
    variables = {
      PORT              = var.PORT
      ENV               = var.ENV
    }
  }
}