resource "aws_s3_bucket" "bucket" {
  bucket = "article-bucket"
  acl    = "private"

  tags = {
    Name        = "Article Bucket"
    Environment = "dev"
  }
}