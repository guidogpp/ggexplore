# Development Environment Setup

## Local SSL Bypass for Development

When working on this project locally, you may encounter SSL-related errors due to self-signed certificates in the development environment. To bypass these errors, you can use the following command to start the development server:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev
```

### Important Notes

- **Do not use this setting in production.** This bypasses SSL certificate verification, which is a critical security feature.
- This setting is intended only for local development and proof-of-concept (POC) purposes.
- Ensure that this environment variable is not committed to version control or used in production environments.

### Why This is Necessary

The error occurs because the local development environment uses a self-signed certificate, which is not trusted by default. By setting `NODE_TLS_REJECT_UNAUTHORIZED=0`, you instruct Node.js to ignore certificate validation errors.

### Risks

- Disabling SSL verification makes your application vulnerable to man-in-the-middle (MITM) attacks.
- Use this setting only in a controlled local environment.

### Alternatives

If possible, configure your local environment to use a trusted certificate authority (CA) or add the self-signed certificate to your system's trusted certificates.