import { test } from 'vitest'
import { render } from '@testing-library/react'
import Content from '../Content'

test('home', () => {
  const {debug} = render(<Content />)
  debug()
})
