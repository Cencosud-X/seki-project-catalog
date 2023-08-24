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
