# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>


cd server && yarn add xlsx multer



[
  {
    "serialNumber": "1",
    "name": "মোঃ আব্দুল কাদের",
    "fatherName": "মোঃ আব্দুল গাফফার",
    "location": "ভাতশালা",
    "union": "Debhata",
    "company": "এস এম সোর্সিং",
    "role": "সিনিয়র মার্চেন্ডাইজার",
    "phone": "01912406634"
  }
]


Visit /admin-tools/import-members
       ↓
  No session token?
       ↓ YES
 → Redirect to /admin-tools/login
       ↓
  Enter Strapi admin credentials
  (same email/password as http://localhost:1337/admin)
       ↓
  Strapi validates → returns token
       ↓
  Token saved to sessionStorage
  (auto-expires when browser tab closes)
       ↓
  Redirected back to import page ✓
Pages:
URL	Description
http://localhost:3000/admin-tools/login	Login page
http://localhost:3000/admin-tools/import-members	Protected import tool (redirects to login if not authenticated)

