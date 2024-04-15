import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByRole('status')
  const toastType = await toast.getAttribute('data-type')
  await expect(toast).toBeVisible()
  expect(toastType).toBe('success')
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('wrongemail@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByRole('status')
  const toastType = await toast.getAttribute('data-type')
  await expect(toast).toBeVisible()
  expect(toastType).toBe('error')
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
