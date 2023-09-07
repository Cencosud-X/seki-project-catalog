# write your terraform code here
resource "null_resource" "hello" {
  provisioner "local-exec" {
    command = "echo 'Hello World! product=${var.product} environment=${var.environment} kind=${var.kind} identifier=${var.identifier}'"
  }
}

resource "null_resource" "var_example" {
  provisioner "local-exec" {
    command = "echo 'my_var1=${var.my_var1}'"
  }
}
