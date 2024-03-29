module "{{data.name}}" {
  source = "../../modules/{{data.name}}"

  product = var.product
  environment = var.environment
  kind = var.kind
  identifier = var.identifier

  # example variable
  my_var1 = var.my_var1
}

output "outputs" {
  value = module.{{data.name}}.outputs
  description = "Component output"
  sensitive = true
}
