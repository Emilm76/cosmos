## При первом клонировании

1. Создать файл `.env` для подключения к БД

`DATABASE_URI="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"`

## Deploy

1. Перед деплоем обязательно запустить команды

```bash
npm run lint
npm run lint:types
```

Если есть ошибки - исправить их.

2. На клиенте сделать push в main ветку репозитория

3. На сервере:

```bash
./deploy.sh

# Или запустить команды вручную:
cd ./cosmos
git pull
npm ci
npm run build
npm pm2 reload all
```