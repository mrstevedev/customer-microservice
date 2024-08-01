# Node.js API

##### API Developed in

- Express.js
- Node.js
- Express Validator
- Typescript
- Prisma
- SQLite
- BDD
- Gherkin
- Jest-Cucumber

> To get started `cd` into
> `pmat-test`

`pnpm install`

`pnpm run dev:customer`

> Alternatively from running `dev:customer`,
> run the shell script command `sh run.sh` in the root to build&run the Docker container.

1. Send a POST request to http://localhost:4000/login
2. Send JSON body:
   `{ username: admin password: 123 } `
3. Copy the accessToken JWT value and set as an authorization bearer token when accessing POST/GET /customerlogin
   ex.) `bearer ${accessToken}`

####

> > Endpoints
> > `/login`
> > `/logout`
> > `/refresh`
> > `/customerinfo`
