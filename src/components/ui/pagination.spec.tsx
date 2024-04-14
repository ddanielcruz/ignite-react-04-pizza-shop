import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Pagination } from './pagination'

describe('Pagination', () => {
  it('should display the right amount of pages and results', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={() => {}}
      />,
    )

    expect(wrapper.getByText('Total de 200 registro(s)')).toBeInTheDocument()
    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const onPageChangeSpy = vi.fn()
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const onPageChangeSpy = vi.fn()
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const onPageChangeSpy = vi.fn()
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const onPageChangeSpy = vi.fn()
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(19)
  })
})
