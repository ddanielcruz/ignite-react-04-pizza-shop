import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('123812641264')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByRole('status')
  const toastType = await toast.getAttribute('data-type')
  await expect(toast).toBeVisible()
  expect(toastType).toBe('success')
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Invalid Name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('123812641264')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByRole('status')
  const toastType = await toast.getAttribute('data-type')
  await expect(toast).toBeVisible()
  expect(toastType).toBe('error')
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
