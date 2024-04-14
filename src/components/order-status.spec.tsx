import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('OrderStatus', () => {
  it('should display the correct text based on the order status', () => {
    const wrapper = render(<OrderStatus status="pending" />)
    // wrapper.debug()

    const statusText = wrapper.getByText('Pendente')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeVisible()
    expect(badgeElement).toHaveClass('bg-slate-400')
  })
})
