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


resource "aws_lambda_function" "uploadFileToS3ArticleBucket" {
  s3_bucket     = ""
  s3_key        = ""
  s3_object_version = ""
  function_name = "uploadFileToS3ArticleBucket-${var.ENV}"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "exports.uploadFileToS3ArticleBucket"

  source_code_hash = filebase64sha256("s3_key")

  runtime = "nodejs18.x"

  environment {
    variables = {
      PORT              = var.PORT
      ENV               = var.ENV
    }
  }
}