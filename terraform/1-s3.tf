resource "aws_s3_bucket" "article-bucket" {
  bucket = "article-bucket-1"

  tags = {
    Name        = "Article Bucket"
    Environment = "dev"
  }
}