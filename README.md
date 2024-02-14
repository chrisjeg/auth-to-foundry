# 🔒 Auth to Foundry Action

This GitHub Action allows workflows to authenticate as a third-party application in order to retrieve an access token from a Palantir Foundry instance. It simplifies the process of handling authentication by encapsulating the API call to obtain the token, making it easier for other actions or steps in your workflow to interact with Foundry services.

## Prerequisites

- A Palantir Foundry account with access to client credentials (client ID and client secret). [See the docs](https://www.palantir.com/docs/foundry/platform-security-third-party/register-3pa/) for more information.

## Inputs

| Input          | Description                                                                                                  | Required |
|----------------|--------------------------------------------------------------------------------------------------------------|----------|
| `client-id`    | The client ID for the Palantir Foundry instance.                                                             | Yes      |
| `client-secret`| The client secret for the Palantir Foundry instance.                                                         | Yes      |
| `foundry-url`  | The URL of the Palantir Foundry instance.                                                                    | Yes      |
| `scope`        | Space delimited list of scopes for the token. Defaults to `api:read-data`.                                   | No       |

## Outputs

| Output          | Description                                              |
|-----------------|----------------------------------------------------------|
| `access-token`  | The access token for the Palantir Foundry instance.      |

## Usage

To use this action in your workflow, follow these steps:

1. Add a step that uses this action after any setup steps but before any step that requires authentication to Foundry.

```yaml
jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Get Foundry Access Token
        id: auth
        uses: chrisjeg/auth-to-foundry@v1
        with:
          client-id: ${{ secrets.FOUNDRY_CLIENT_ID }}
          client-secret: ${{ secrets.FOUNDRY_CLIENT_SECRET }}
          foundry-url: "my-foundry-instance.com"
          scope: "api:read-data"
      # Use the output from the `auth` step
      - name: Use Foundry Token
        run: |
          echo "Access Token: ${{ steps.auth.outputs.access-token }}"
```

2. Configure the required secrets (`FOUNDRY_CLIENT_ID` and `FOUNDRY_CLIENT_SECRET`) in your repository's settings.
3. Access the token by either:
   - Using it from the step output: `${{ steps.auth.outputs.access-token }}`
   - Using it from the environment variables: `${{ env.FOUNDRY_ACCESS_TOKEN }}`

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
