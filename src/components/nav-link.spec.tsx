import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should highlight the nav link when it is the current page link', () => {
    const wrapper = render(
      <>
        <NavLink to="/page-one">Page One</NavLink>
        <NavLink to="/page-two">Page Two</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/page-one']}>{children}</MemoryRouter>
        ),
      },
    )

    expect(wrapper.getByText('Page One')).toHaveAttribute(
      'data-current',
      'true',
    )

    expect(wrapper.getByText('Page Two')).toHaveAttribute(
      'data-current',
      'false',
    )
  })
})
