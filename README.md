This project is created with 

- Next.js 15
- [Beter Auth](https://github.com/better-auth/better-auth)
- [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- [ShadCN UI](https://github.com/shadcn-ui/ui)
- AWS SES (for sending emails)
- Stripe payment
- PostgreSQL

## Running the project:
npm run turbo

## Create Database tables:
```bash
npm run db:generate
npm run db:migrate
```

## Stripe payment webhook listener
Config your Stripe using:
```bash
stripe login
```

use stripe cli:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

without doing so the database would not be updated to reflect the changes of subscription details.

## Authentication
This project uses [Beter Auth](https://github.com/better-auth/better-auth) for authentication. You can sign up and login using email/password, Github/Google social logins.

## There is another API server to serve API for adding reviews 
review-api-server

## A custom web component/widget is developed for adding reviews on any website.

Check out review_widget