# Tutorial

## Initial Command

เมื่อไม่มี folder `node_modules`

```shell
npm install
```

เพื่อเช็ค package จากไฟล์ package.json ที่ "devDependencies" เพื่อให้ node install ตัว playwright

## Run Command

*Testing*

```shell
npx playwright test --headed
```

*Debug Mode*

```shell
npx playwright test --debug
```

*Report*

```shell
npx playwright show-report
```

## Run with Environment or Locale

*Environment*

```shell
TEST_ENV=qa npx playwright test --headed
```

*Locale*

```shell
TEST_LANG=en npx playwright test --headed
```