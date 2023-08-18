module "redis" {
  source = "../../modules/{{data.name}}"

  name = "${var.product}-${var.environment}-${var.identifier}"

  product = var.product

  environment = var.environment

  kind = var.kind

  identifier = var.identifier
}

output "outputs" {
  value = module.{{data.name}}.outputs
  description = "Component output"
  sensitive = true
}
