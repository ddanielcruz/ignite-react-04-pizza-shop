import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(page.getByText('-5% em relação à ontem')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('150', { exact: true })).toBeVisible()
  await expect(page.getByText('2.5% relação ao mês passado')).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('8', { exact: true })).toBeVisible()
  await expect(page.getByText('-2% em relação ao mês passado')).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('R$ 200,00')).toBeVisible()
  await expect(page.getByText('+10% em relação ao mês passado')).toBeVisible()
})
