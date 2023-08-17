module "redis" {
  source = "../../modules/{{data.identifier}}"

  name = "${var.product}-${var.environment}-${var.identifier}"

  product = var.product

  environment = var.environment

  kind = var.kind

  identifier = var.identifier
}

output "outputs" {
  value = module.{{data.identifier}}.outputs
  description = "Component output"
  sensitive = true
}
