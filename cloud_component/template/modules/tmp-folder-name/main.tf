# write your terraform code here
resource "null_resource" "default" {
  provisioner "local-exec" {
    command = "echo 'Hello World! product=${var.product} environment=${var.environment} kind=${var.kind} identifier=${var.identifier}'"
  }
}
