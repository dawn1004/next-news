This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/aticles](http://localhost:3000/api/aticles).`.

### Available Endpoints:

```http
GET /api/articles/f/<slug>
```


```http
GET /api/articles
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | `string` | **Required**. current page |
| `pageSize` | `string` | **Required**. size per page |
| `search` | `string` | **Required**. search keyword |


```http
GET /api/articles/<id>
```

```http
GET /api/articles/f/<slug>
```

```http
POST /api/articles
```
| Body | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. articles title |
| `origSizeImgUrl` | `string` | **Required**. original size image |
| `thumbSizeImgUrl` | `string` | **Required**. thumbnail size image |
| `body` | `string` | **Required**. body or content of the article |
| `author` | `string` | **Required**. Authors name |


```http
PUT /api/articles/<id>
```

| Body | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | articles title |
| `body` | `string` | body or content of the article |
| `author` | `string` | Authors name |


```http
DELETE /api/articles/<id>
```



The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


Happy coding 😊
