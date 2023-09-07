# {{data.name}}

Module template for {{data.name}}

## Development

Terraform init
```
npx nx run {{data.name}}:init
```

Terraform plan using test variables
```
npx nx run {{data.name}}:plan
```

Terraform apply using test variables
```
npx nx run {{data.name}}:test
```

Clean up working directory
```
npx nx run {{data.name}}:clean
```

## Deployment

To pass variables to Terraform at runtime, create a secret with name `TERRAFORM_VARS_FOR_{{{uppercase data.name}}}_B64`
and pass a base 64 json as its value.
For example, this secret
```
"TERRAFORM_VARS_FOR_{{{uppercase data.name}}}_B64": "ewogICAgIm15X3ZhcjEiOiAidGVzdF92YWx1ZSIsCiAgICAibXlfc2VjcmV0X3Rva2VuIjogInRlc3Rfc2VjcmV0Igp9Cgo"
```

will generate this Terraform variable file:
```
{
  "my_var1": "test_value",
  "my_secret_token": "test_secret"
}
```
